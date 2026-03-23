import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchInputBeneficiary({ 
  value, 
  onChange, 
  placeholder = "Pesquisar..." 
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-full max-w-2xl">
        {/* Ícone de busca */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search 
            className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} 
          />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-14 pr-12 py-3 border-2 rounded-xl shadow-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-300 placeholder-gray-400 text-gray-700
            ${value ? 'border-blue-300' : 'border-gray-300'}
          `}
        />

        {/* Botão de limpar */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            type="button"
            aria-label="Limpar pesquisa"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}