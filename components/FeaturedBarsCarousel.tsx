export default function FeaturedBarsCarousel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3].map(num => (
        <div key={num} className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg">Bar #{num}</h3>
          <p>Awesome pool bar description here.</p>
        </div>
      ))}
    </div>
  );
}
