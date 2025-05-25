import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('playpoolnation');
    const data = await req.json();

    const result = await db.collection('bars').insertOne(data);

    return NextResponse.json({
      message: 'Bar submitted',
      id: result.insertedId,
    });
  } catch (err) {
    console.error('Error submitting bar:', err);
    return NextResponse.json(
      { error: 'Failed to submit bar' },
      { status: 500 }
    );
  }
}

