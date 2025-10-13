
export default function SearchInputBeneficiary({ value, onChange, placeholder = "Pesquisar..." }) {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
