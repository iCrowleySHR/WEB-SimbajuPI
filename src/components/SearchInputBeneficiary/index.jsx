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
    <div className="flex justify-center mb-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className={`w-4 h-4 transition-colors ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>

        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-200 placeholder-gray-400
            ${value ? 'border-blue-300' : 'border-gray-300'}
          `}
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}