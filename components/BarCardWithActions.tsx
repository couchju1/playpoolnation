// ✅ components/BarCardWithActions.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type Bar = {
  _id: string;
  name: string;
  address: string;
  description?: string;
  tables?: number;
  amenities?: string[];
  imageUrl?: string;
};

export default function BarCardWithActions({ bar }: { bar: Bar }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${bar.name}"?`)) return;

    setIsDeleting(true);

    const res = await fetch(`/api/bars/${bar._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Bar deleted successfully.');
      router.refresh();
    } else {
      alert('Failed to delete bar.');
    }

    setIsDeleting(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
      <Image
        src={bar.imageUrl || '/placeholder.jpg'}
        alt={bar.name}
        width={400}
        height={160}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="text-xl font-semibold">{bar.name}</h2>
      <p className="text-gray-600">{bar.address}</p>
      <p className="text-sm my-2">{bar.description || 'No description available.'}</p>
      <p><strong>Pool Tables:</strong> {bar.tables ?? 'N/A'}</p>
      <p><strong>Amenities:</strong> {bar.amenities?.join(', ') || 'None listed'}</p>
      <div className="mt-4 flex gap-2">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
        {/* Future: Add Edit Button */}
      </div>
    </div>
  );
}
