import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('userToken')?.value;

    if (!token) {
        return NextResponse.json([], { status: 200 });
    }

    try {
        const client = await clientPromise;
        const db = client.db();
        const suggestions = await db
            .collection('suggestions')
            .find({ userToken: token })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(suggestions);
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
