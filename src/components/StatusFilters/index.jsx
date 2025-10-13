export default function StatusFilter({ statuses = [], currentStatus, onChange }) {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-3 py-1 rounded-lg transition ${
            currentStatus === status
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
