export default function FeatureCard({
  icon,
  title,
  description,
  bgColor = "bg-white",
  iconBg = "bg-blue-600",
}) {
  return (
    <div
      className={`
        relative group overflow-hidden rounded-2xl p-8 shadow-md hover:shadow-xl
        transition-all duration-300 transform hover:-translate-y-1
        ${bgColor}
      `}
    >
      {/* Efeito decorativo de gradiente ao passar o mouse */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400"></div>

      {/* Ícone */}
      <div
        className={`
          ${iconBg} w-14 h-14 rounded-2xl flex items-center justify-center 
          mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform duration-300
        `}
      >
        <i className={`${icon} text-white text-2xl`}></i>
      </div>

      {/* Título */}
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
        {title}
      </h3>

      {/* Descrição */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>

      {/* Linha decorativa animada */}
      <div
        className="mt-4 w-0 group-hover:w-16 h-[3px] mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
      ></div>
    </div>
  );
}
