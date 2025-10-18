import { useState, useEffect } from "react";

export default function AutocompleteField({ field, value, onChange, color }) {
  const [search, setSearch] = useState(field.initialLabel || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const selectedOption = field.options.find(opt => opt.value === value);
    if (selectedOption) {
      setSearch(selectedOption.label);
    }
  }, [value, field.options]);

  const filteredOptions = field.options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase()) ||
    (opt.extra && opt.extra.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (opt) => {
    setSearch(opt.label);
    setShowSuggestions(false);
    onChange(opt.value);
  };

  return (
    <div className="relative mb-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <label className="block text-gray-800 font-semibold mb-3 text-sm">{field.label}</label>
      <input
        type="text"
        placeholder={field.placeholder || ""}
        value={search}
        onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
        onFocus={() => setShowSuggestions(true)}
        className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-${color}-400 focus:outline-none`}
      />
      {showSuggestions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.length > 0 ? filteredOptions.map((opt, i) => (
            <li key={i} onClick={() => handleSelect(opt)} className="p-3 cursor-pointer hover:bg-blue-50 transition-colors">
              <span className="font-medium text-gray-800">{opt.label}</span>
              {opt.extra && <span className="block text-sm text-gray-500">{opt.extra}</span>}
            </li>
          )) : (
            <li className="p-3 text-gray-500 text-sm">Nenhum resultado encontrado</li>
          )}
        </ul>
      )}
    </div>
  );
}
