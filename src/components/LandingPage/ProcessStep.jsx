export default function ProcessStep({ icon, title, items, color }) {
  const isBlue = color === "text-blue-600";

  const accentClasses = isBlue
    ? { badgeBg: "bg-blue-100 text-blue-700 border-blue-300", bullet: "text-blue-500", cardHover: "hover:shadow-blue-200/40", hoverBg: "hover:bg-blue-50/60" }
    : { badgeBg: "bg-red-100 text-red-700 border-red-300", bullet: "text-red-500", cardHover: "hover:shadow-red-200/40", hoverBg: "hover:bg-red-50/60" };

  return (
    <div
      className={`
        group relative overflow-hidden
        bg-white rounded-3xl p-8
        border-2 ${isBlue ? "border-blue-200/40" : "border-red-200/40"}
        hover:${isBlue ? "border-blue-300/70" : "border-red-300/70"}
        shadow-md hover:shadow-xl hover:${isBlue ? "shadow-blue-100/50" : "shadow-red-100/50"}
        hover:-translate-y-1
        transition-all duration-500
      `}
    >
      {/* Top header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`
            w-13 h-13 rounded-2xl flex items-center justify-center
            transition-all duration-300
            group-hover:scale-110 group-hover:rotate-6
            ${isBlue ? "bg-blue-50 group-hover:bg-blue-100" : "bg-red-50 group-hover:bg-red-100"}
          `}
        >
          <i className={`${icon} ${color} text-xl`} />
        </div>
        <span className={`text-xl font-bold ${color} leading-tight`}>{title}</span>
      </div>

      {/* Divider */}
      <div className={`ml-0 mb-5 h-[2px] rounded-full bg-gradient-to-r ${isBlue ? "from-blue-200/60" : "from-red-200/60"} to-transparent`} />

      {/* List */}
      <ul className="space-y-3 text-gray-700">
        {items.map((item, index) => (
          <li
            key={index}
            className={`
              flex items-start gap-3
              px-4 py-3 rounded-xl
              bg-gray-50/80 ${accentClasses.hoverBg}
              border border-transparent hover:border-gray-200/70
              transition-all duration-300
              cursor-default
            `}
          >
            {/* Numbered bullet */}
            <span
              className={`
                flex-shrink-0 inline-flex items-center justify-center
                w-7 h-7 rounded-lg text-xs font-bold
                border ${accentClasses.badgeBg}
                mt-[1px]
              `}
            >
              {index + 1}
            </span>
            <span className="text-[15px] leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
