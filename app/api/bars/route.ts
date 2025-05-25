import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('playpoolnation');
    const bar = await db
      .collection('bars')
      .findOne({ _id: new ObjectId(params.id) });

    if (!bar) {
      return NextResponse.json({ error: 'Bar not found' }, { status: 404 });
    }

    return NextResponse.json({ ...bar, _id: bar._id.toString() });
  } catch (error: unknown) {
    console.error('GET bar by ID error:', error);
    return NextResponse.json({ error: 'Failed to fetch bar' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('playpoolnation');

    const result = await db
      .collection('bars')
      .updateOne(
        { _id: new ObjectId(params.id) },
        { $set: data }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Bar not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bar updated' });
  } catch (error: unknown) {
    console.error('PUT bar error:', error);
    return NextResponse.json({ error: 'Failed to update bar' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('playpoolnation');

    const result = await db
      .collection('bars')
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Bar not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bar deleted' });
  } catch (error: unknown) {
    console.error('DELETE bar error:', error);
    return NextResponse.json({ error: 'Failed to delete bar' }, { status: 500 });
  }
}






