export default function StatsCard({ title, value, iconClass, iconColor, extra }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold" style={{ color: iconColor }}>{value}</p>
          {extra && <p className="text-xs text-gray-500">{extra}</p>}
        </div>
        <i className={`${iconClass} text-3xl`} style={{ color: iconColor }}></i>
      </div>
    </div>
  );
}