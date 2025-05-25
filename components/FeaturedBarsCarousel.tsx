type Bar = {
  _id: string;
  name: string;
  address: string;
  description?: string;
  lat: number;
  lng: number;
  tables?: number;
  amenities?: string[];
  imageUrl?: string;
};

export default function FeaturedBarsCarousel({ bars }: { bars: Bar[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {bars.map((bar) => (
        <div key={bar._id} className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2">{bar.name}</h3>
          <p className="text-gray-600">{bar.address}</p>
        </div>
      ))}
    </div>
  );
}

