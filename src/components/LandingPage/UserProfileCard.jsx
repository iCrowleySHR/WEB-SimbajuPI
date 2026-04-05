export default function UserProfileCard({ icon, title, description, borderColor, textColor }) {
  return (
    <div
      className={`
        group relative text-center
        bg-white rounded-3xl
        p-7 pt-9
        border-t-[3px] ${borderColor}
        shadow-md shadow-gray-200/40
        hover:shadow-2xl hover:-translate-y-2
        transition-all duration-500
        overflow-hidden
        flex flex-col
        justify-between
        min-h-[280px]
      `}
    >
      {/* Corner decoration */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full
                    bg-gradient-to-br from-transparent to-gray-100/30
                    group-hover:to-gray-200/40 transition-colors duration-500"
      />

      <div>
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 relative">
          <div className={`${textColor.includes("blue") ? "bg-blue-50" : textColor.includes("green") ? "bg-green-50" : textColor.includes("purple") ? "bg-purple-50" : "bg-orange-50"} w-full h-full rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:shadow-lg transition-all duration-500`}>
            <i className={`${icon} ${textColor} text-2xl transition-transform duration-300 group-hover:scale-110`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-800 text-lg mb-2 relative">
          {title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-[2px] bg-gray-200 mx-auto mb-3 rounded-full group-hover:w-14 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500" />

        {/* Description */}
        <p className="text-gray-500 leading-relaxed text-[14px] relative">
          {description}
        </p>
      </div>
    </div>
  );
}
