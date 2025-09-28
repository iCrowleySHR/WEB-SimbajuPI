import Alert from "../Alert";

export default function FormBox({ type, icon, color = "blue", fields = [], message, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-400",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-400",
    yellow: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300",
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        {icon && <i className={`${icon} text-2xl mr-3 text-gray-700`}></i>}
        <h2 className="text-xl font-semibold text-gray-800">{type}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, index) => {
          if (field.type === "select") {
            return (
              <div key={index}>
                <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className={inputClass}
                >
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <div key={index}>
                <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={field.placeholder || ""}
                  className={inputClass}
                  required={field.required !== false}
                />
              </div>
            );
          }
        })}

        {message && <Alert type={message.type} message={message.text} />}

        <button
          type="submit"
          className={`w-full ${colorClasses[color]} text-white p-4 rounded-xl font-semibold transition-colors`}
        >
          {type}
        </button>
      </form>
    </div>
  );
}
