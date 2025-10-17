export default function BusinessHours({ data = [], onSelectDay }) {
  return (
    <div className=" bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Horários de Funcionamento
      </h2>

      <ul className="divide-y divide-gray-200">
        {data.map(({ id, dayWeek, openTime, closeTime, isActive }) => (
          <li
            key={id}
            onClick={() => onSelectDay && onSelectDay(id)}
            className={`cursor-pointer flex justify-between items-center py-2 px-3 rounded-lg transition-colors ${
              isActive
                ? "bg-green-100 text-green-800 font-semibold"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <span>{dayWeek}</span>
            <span>
              {openTime} - {closeTime}
              {isActive && <span className="ml-1">(Aberto)</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
