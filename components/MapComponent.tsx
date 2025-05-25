'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';

type Bar = {
  _id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export default function MapComponent({ bars }: { bars: Bar[] }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const center = useMemo(() => ({ lat: bars[0]?.lat || 39.5, lng: bars[0]?.lng || -98.35 }), [bars]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      zoom={4}
      center={center}
      mapContainerClassName="w-full h-[500px] rounded-lg shadow"
    >
      {bars.map((bar) => (
        <Marker key={bar._id} position={{ lat: bar.lat, lng: bar.lng }} title={bar.name} />
      ))}
    </GoogleMap>
  );
}

