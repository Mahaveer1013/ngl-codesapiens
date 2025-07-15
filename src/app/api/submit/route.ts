import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import clientPromise from '@/lib/db';
import { getClientIp } from 'request-ip';

// Simple sanitization function
function sanitize(input: string) {
    return input.replace(/[<>]/g, '');
}

export async function POST(request: NextRequest) {
    let { message } = await request.json();
    message = sanitize(message.trim());
    if (!message) {
        return NextResponse.json({ message: 'Suggestion cannot be empty.' }, { status: 400 });
    }
    const clientIp = getClientIp(request as any);
    const token = request.cookies.get('userToken')?.value ||
        require('crypto').randomBytes(16).toString('hex');

    try {
        const client = await clientPromise;
        const db = client.db();

        // Duplicate prevention
        const duplicate = await db.collection('suggestions').findOne({ message, userToken: token });
        if (duplicate) {
            return NextResponse.json({ message: 'You have already submitted this suggestion.' }, { status: 409 });
        }

        const suggestion = {
            message,
            userToken: token,
            ipAddress: clientIp,
            createdAt: new Date(),
        };

        const result = await db.collection('suggestions').insertOne(suggestion);

        const response = NextResponse.json({
            message: 'Suggestion submitted successfully',
            suggestion: {
                _id: result.insertedId,
                ...suggestion,
            },
        });

        // Set cookie if not already set (lasts 1 year)
        if (!request.cookies.get('userToken')) {
            response.cookies.set('userToken', token, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 365, // 1 year
            });
        }

        return response;
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
