export default function SearchBarHome({
  value,
  onChange,
  onClear,
  placeholder = "Pesquisar...",
  className = "",
  showResultCount = false,
  resultCount = 0
}) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="relative">
        {/* Ícone */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fas fa-search text-gray-400"></i>
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent bg-white shadow-sm transition"
        />

        {/* Botão limpar */}
        {value && (
          <button
            onClick={onClear}
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center 
                       text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {/* Contador opcional */}
      {showResultCount && value && (
        <div className="mt-2 text-sm text-gray-600">
          {resultCount} resultados encontrados
        </div>
      )}
    </div>
  );
}