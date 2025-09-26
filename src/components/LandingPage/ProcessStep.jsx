export default function ProcessStep({ icon, title, items, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className={`text-lg font-semibold ${color} mb-3`}>
        <i className={`${icon} mr-2`}></i>{title}
      </h3>
      <ul className="space-y-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <i className="fas fa-check text-green-500 mr-2 mt-1"></i>{item}
          </li>
        ))}
      </ul>
    </div>
  );
}
