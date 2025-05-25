import clientPromise from '../../lib/mongodb';

type Bar = {
  _id: string;
  name: string;
  address: string;
  description: string;
  tables: number;
  amenities: string[];
  imageUrl: string;
};

async function getBars(): Promise<Bar[]> {
  const client = await clientPromise;
  const db = client.db('playpoolnation');
  const bars = await db.collection<Bar>('bars').find({}).toArray();
  return bars;
}


export default async function BarsPage() {
  const bars = await getBars();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Bars with Pool Tables</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bars.map((bar) => (
          <div key={bar._id} className="border rounded-lg p-4 shadow-md bg-white">
            <img src={bar.imageUrl} alt={bar.name} className="w-full h-40 object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold">{bar.name}</h2>
            <p className="text-gray-600">{bar.address}</p>
            <p className="text-sm my-2">{bar.description}</p>
            <p><strong>Pool Tables:</strong> {bar.tables}</p>
            <p><strong>Amenities:</strong> {bar.amenities.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


