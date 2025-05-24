export default function SearchBarComponent() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <input
        type="text"
        placeholder="Enter city or zip code"
        className="border rounded-lg p-3 w-full sm:w-2/3"
      />
      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
        Search Bars
      </button>
    </div>
  );
}
