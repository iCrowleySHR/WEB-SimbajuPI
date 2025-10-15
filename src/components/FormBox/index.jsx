import React from "react";
import Alert from "../Alert";

export default function FormBox({ 
  type, 
  icon, 
  color = "blue", 
  fields = [], 
  message, 
  onSubmit, 
  infoBox 
}) {
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

  const infoBoxColors = {
    blue: { bg: "bg-blue-50", title: "text-blue-800", text: "text-blue-700" },
    green: { bg: "bg-green-50", title: "text-green-800", text: "text-green-700" },
    red: { bg: "bg-red-50", title: "text-red-800", text: "text-red-700" },
    yellow: { bg: "bg-yellow-50", title: "text-yellow-800", text: "text-yellow-700" },
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";

  const renderField = (field, index) => {
    if (field.type === "select") {
      return (
        <div key={index}>
          <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
          <select
            value={field.value}
            onChange={field.onChange}
            className={inputClass}
          >
            <option value="" disabled>{field.placeholder || "Selecione"}</option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

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
          min={field.min}
        />
      </div>
    );
  };

  const renderInfoBox = () => {
    if (!infoBox) return null;
    const colors = infoBoxColors[color];
    return (
      <div className={`${colors.bg} p-4 rounded-lg mt-4`}>
        <h4 className={`font-semibold ${colors.title} mb-2`}>
          <i className="fas fa-info-circle mr-2"></i>
          {infoBox.title}
        </h4>
        <ul className={`text-sm ${colors.text} space-y-1`}>
          {infoBox.items.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        {icon && <i className={`${icon} text-2xl mr-3 text-gray-700`}></i>}
        <h2 className="text-xl font-semibold text-gray-800">{type}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(renderField)}

        {message && <Alert type={message.type} message={message.text} />}

        {renderInfoBox()}

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
