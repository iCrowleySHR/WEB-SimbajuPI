export default function StatsCard({ title, value, iconClass, iconColor, extra }) {
  return (
    <div
      className="
        bg-gradient-to-br from-white to-gray-50
        rounded-2xl border border-gray-200
        shadow-sm hover:shadow-md
        p-5 transition-all duration-300
      "
    >
      <div className="flex items-center justify-between">
        {/* Texto */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500 tracking-wide mb-1">
            {title}
          </p>
          <p
            className="text-3xl font-bold leading-tight"
            style={{ color: iconColor }}
          >
            {value}
          </p>
          {extra && (
            <p className="text-xs text-gray-400 font-medium mt-1">{extra}</p>
          )}
        </div>

        {/* Ícone */}
        <div
          className={`
            flex items-center justify-center
            p-3 rounded-xl shadow-inner
            bg-[${iconColor}]/10
            transition-transform duration-300
            hover:scale-110
          `}
        >
          <i
            className={`${iconClass} text-2xl`}
            style={{ color: iconColor }}
          ></i>
        </div>
      </div>
    </div>
  );
}
