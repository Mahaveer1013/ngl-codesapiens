import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/db';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const suggestions = await db
            .collection('suggestions')
            .find()
            .sort({ createdAt: -1 })
            .limit(20)
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
