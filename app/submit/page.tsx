'use client';

import { useState } from 'react';

type BarForm = {
  name: string;
  address: string;
  description: string;
  tables: number;
  amenities: string[];
  imageUrl: string;
};

export default function SubmitBarPage() {
  const [form, setForm] = useState<BarForm>({
    name: '',
    address: '',
    description: '',
    tables: 1,
    amenities: [],
    imageUrl: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenityToggle = (amenity: string) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/bars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('Bar submitted successfully!');
      setForm({
        name: '',
        address: '',
        description: '',
        tables: 1,
        amenities: [],
        imageUrl: '',
      });
    } else {
      setMessage('Error submitting bar.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit a Bar</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Bar Name" className="w-full p-2 border rounded" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input type="number" name="tables" value={form.tables} onChange={handleChange} placeholder="# of Pool Tables" className="w-full p-2 border rounded" />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />

        <div>
          <label className="block font-semibold">Amenities:</label>
          {['Darts', 'Food', 'Drinks', 'Tournaments'].map(a => (
            <label key={a} className="inline-block mr-4">
              <input type="checkbox" checked={form.amenities.includes(a)} onChange={() => handleAmenityToggle(a)} /> {a}
            </label>
          ))}
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
