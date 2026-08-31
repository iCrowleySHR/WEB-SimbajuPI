export default function StatusFilter({
  statuses = [],
  currentStatus,
  onChange
}) {
  return (
    <div className="w-full flex flex-wrap gap-2 justify-center mb-4 px-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`
            px-3 sm:px-4
            py-2
            rounded-lg
            text-sm sm:text-base
            font-medium
            transition-all
            duration-200
            whitespace-nowrap
            ${
              currentStatus === status
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

