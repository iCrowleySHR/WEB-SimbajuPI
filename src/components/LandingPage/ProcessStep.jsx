export default function ProcessStep({ icon, title, items, color }) {
  return (
    <div
      className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cabeçalho */}
      <div className="flex items-center mb-5">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 ${color} bg-opacity-10`}
        >
          <i className={`${icon} ${color} text-2xl`}></i>
        </div>
        <h3 className={`text-2xl font-semibold ${color}`}>{title}</h3>
      </div>

      {/* Lista de itens */}
      <ul className="space-y-3 text-gray-700">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition-colors cursor-pointer"
          >
            <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
