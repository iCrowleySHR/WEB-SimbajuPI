import { Search } from "lucide-react";

export default function SearchInputBeneficiary({ value, onChange, placeholder = "Pesquisar..." }) {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-full max-w-md">
        {/* Ícone de pesquisa */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            border border-gray-300 rounded-lg px-10 py-2 w-full
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 transition-all duration-200
            placeholder-gray-400
          "
        />
      </div>
    </div>
  );
}
