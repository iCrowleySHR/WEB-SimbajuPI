export default function TypeBenefitFilter({ types = [], currentType, onChange }) {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-3 py-1 rounded-lg transition ${
            currentType === type
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}