import { NextResponse } from 'next/server';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';

// 🔍 Zod schema for validation
const BarSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  description: z.string().optional(),
  tables: z.number().min(1).max(50),
  amenities: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('playpoolnation');
    const bars = await db.collection('bars').find({}).toArray();

    const cleaned = bars.map((bar: any) => ({
      ...bar,
      _id: bar._id.toString(),
    }));

    return NextResponse.json(cleaned);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch bars' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // ✅ Validate incoming data
    const parsed = BarSchema.parse(data);

    const client = await clientPromise;
    const db = client.db('playpoolnation');
    const result = await db.collection('bars').insertOne(parsed);

    return NextResponse.json({
      message: 'Bar submitted successfully',
      id: result.insertedId,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    }

    console.error('POST error:', err);
    return NextResponse.json({ error: 'Failed to submit bar' }, { status: 500 });
  }
}





