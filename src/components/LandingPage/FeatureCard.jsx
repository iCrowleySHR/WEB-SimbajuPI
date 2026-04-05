const iconColorMap = {
  "bg-blue-600": "from-blue-500 to-blue-600",
  "bg-green-600": "from-green-500 to-emerald-600",
  "bg-purple-600": "from-purple-500 to-violet-600",
};

export default function FeatureCard({
  icon,
  title,
  description,
  bgColor = "bg-white",
  iconBg = "bg-blue-600",
}) {
  const gradient = iconColorMap[iconBg] || "from-blue-500 to-blue-600";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl px-7 pt-9 pb-8
        shadow-md shadow-gray-200/60
        border border-gray-100/80
        ${bgColor}
        h-full
        hover:shadow-2xl hover:shadow-gray-300/40 hover:-translate-y-1.5
        transition-all duration-500
      `}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04]
                   transition-opacity duration-500
                   bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-300" />

      {/* Corner decoration */}
      <div
        className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full
                    bg-gradient-to-br from-blue-50/60 to-transparent
                    group-hover:from-blue-100/50 transition-colors duration-500" />

      {/* Icon */}
      <div className="relative mb-5 text-center">
        <div
          className={`
            inline-flex items-center justify-center
            w-16 h-16 rounded-2xl
            bg-gradient-to-br ${gradient}
            shadow-lg group-hover:shadow-xl
            group-hover:scale-110
            group-hover:rotate-6
            transition-all duration-300
          `}
        >
          <i className={`${icon} text-white text-xl`} />
        </div>
      </div>

      {/* Title */}
      <div className="relative flex items-center gap-3 mb-3">
        <div className="w-10 h-[2px] bg-gradient-to-r from-blue-400 to-transparent rounded-full" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-400">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="relative text-gray-500 text-[15px] leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-[3px] rounded-full
                    bg-gradient-to-r from-indigo-500 to-blue-500
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-500 origin-left" />
    </div>
  );
}
