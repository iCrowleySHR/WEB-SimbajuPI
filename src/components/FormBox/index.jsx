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
    if (onSubmit) onSubmit(e);
  };

  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-blue-200",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-green-200",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-red-200",
    yellow: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 shadow-yellow-200",
  };

  const inputClass =
    "w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:shadow-sm transition-all duration-200";

  const renderField = (field, index) => {
    const fieldClass = `mb-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200`;

    switch (field.type) {
      case "select":
        return (
          <div key={index} className={fieldClass}>
            <label className="block text-gray-800 font-semibold mb-3 text-sm">{field.label}</label>
            <select
              value={field.value}
              onChange={field.onChange}
              className={`${inputClass} focus:ring-${color}-400`}
              required={field.required !== false}
            >
              <option value="" disabled>{field.placeholder || "Selecione"}</option>
              {field.options.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "textarea":
        return (
          <div key={index} className={fieldClass}>
            <label className="block text-gray-800 font-semibold mb-3 text-sm">{field.label}</label>
            <textarea
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder || ""}
              className={`${inputClass} focus:ring-${color}-400 resize-none h-32`}
              required={field.required !== false}
            />
          </div>
        );

      case "file":
        return (
          <div key={index} className={fieldClass}>
            <label className="block text-gray-800 font-semibold mb-3 text-sm">{field.label}</label>
            <input
              type="file"
              onChange={field.onChange}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-colors"
              multiple={field.multiple || false}
              required={field.required !== false}
            />
          </div>
        );

      default:
        return (
          <div key={index} className={fieldClass}>
            <label className="block text-gray-800 font-semibold mb-3 text-sm">{field.label}</label>
            <input
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder || ""}
              className={`${inputClass} focus:ring-${color}-400`}
              required={field.required !== false}
              min={field.min}
            />
          </div>
        );
    }
  };

  const renderInfoBox = () => {
    if (!infoBox) return null;
    return (
      <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-2xl border border-gray-100 shadow-sm mt-6">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
          <i className="fas fa-lightbulb text-yellow-500 mr-3"></i>
          {infoBox.title}
        </h4>
        <ul className="text-gray-600 space-y-2">
          {infoBox.items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
      <div className="text-center mb-8">
        {icon && <i className={`${icon} text-4xl text-${color}-600 mb-4`}></i>}
        <h2 className="text-3xl font-bold text-gray-900">{type}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-gray-300 to-transparent mx-auto mt-4 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        {fields.map(renderField)}

        {message && (
          <div className="mt-4">
            <Alert type={message.type} message={message.text || message} />
          </div>
        )}

        {renderInfoBox()}

        <button
          type="submit"
          className={`w-full ${colorClasses[color]} text-white p-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 mt-8`}
        >
          <i className="fas fa-paper-plane mr-2"></i>
          {type}
        </button>
      </form>
    </div>
  );
}