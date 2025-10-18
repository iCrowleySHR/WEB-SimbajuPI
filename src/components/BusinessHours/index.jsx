export default function BusinessHours({ data = [], onSelectDay }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Horários de Funcionamento
      </h2>

      <div className="flex flex-wrap gap-3 justify-center">
        {data.map(({ id, dayWeek, openTime, closeTime, isActive }) => (
          <div
            key={id}
            onClick={() => onSelectDay && onSelectDay(id)}
            className={`cursor-pointer flex flex-col justify-center items-center p-3 rounded-lg transition-colors w-28 sm:w-32 md:w-36 ${
              isActive
                ? "bg-green-100 text-green-800 font-semibold"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <span className="font-medium">{dayWeek}</span>
            {isActive && (
              <span className="text-sm text-center">
                {openTime} - {closeTime} <span className="ml-1">(Aberto)</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
