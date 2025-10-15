export default function DetailField({ label, value, colSpan = 1, icon }) {
  return (
    <div className={`${colSpan > 1 ? "col-span-2" : ""} flex items-center space-x-3 p-3 bg-white rounded-lg`}>
      {icon && <div className="text-gray-400">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
        <p className="text-base text-gray-900 font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}