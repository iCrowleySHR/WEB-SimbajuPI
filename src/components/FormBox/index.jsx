import { useState } from "react";
import Alert from "../Alert";
import AutocompleteField from "../AutoComplete";

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
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/50",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-500/50",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-500/50",
    yellow: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400/50",
  };

  const inputClass = 
    "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:shadow-sm transition-all duration-200 text-sm";

  const renderField = (field, index) => {
    const fieldClass = "mb-4";

    // ✅ Campo de checkbox
    if (field.type === "checkbox") {
      return (
        <div key={index} className={fieldClass}>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={field.checked}
                onChange={field.onChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400 transition-colors"
              />
            </div>
            <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors">
              {field.label}
            </span>
          </label>
        </div>
      );
    }

    // ✅ Campo select normal
    if (field.type === "select") {
      return (
        <div key={index} className={fieldClass}>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            {field.label}
            {field.required !== false && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            value={field.value}
            onChange={field.onChange}
            className={`${inputClass} appearance-none bg-white focus:ring-${color}-400`}
            required={field.required !== false}
          >
            <option value="" disabled>
              {field.placeholder || "Selecione uma opção"}
            </option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === "autocomplete") {
      return (
        <div key={index} className={fieldClass}>
          <AutocompleteField 
            field={field} 
            value={field.value} 
            onChange={field.onChange} 
            color={color} 
          />
        </div>
      );
    }

    // ✅ Campo textarea
    if (field.type === "textarea") {
      return (
        <div key={index} className={fieldClass}>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            {field.label}
            {field.required !== false && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder || ""}
            className={`${inputClass} focus:ring-${color}-400 resize-none h-24`}
            required={field.required !== false}
          />
        </div>
      );
    }

    // ✅ Campo file
    if (field.type === "file") {
      return (
        <div key={index} className={fieldClass}>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            {field.label}
            {field.required !== false && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={field.onChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-colors cursor-pointer"
              multiple={field.multiple || false}
              required={field.required !== false}
            />
          </div>
        </div>
      );
    }

    // ✅ Campo padrão (input normal)
    return (
      <div key={index} className={fieldClass}>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {field.label}
          {field.required !== false && <span className="text-red-500 ml-1">*</span>}
        </label>
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
  };

  const renderInfoBox = () => {
    if (!infoBox) return null;
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
        <h4 className="font-medium text-gray-800 text-sm mb-3 flex items-center">
          <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
          </svg>
          {infoBox.title}
        </h4>
        <ul className="text-gray-600 space-y-2 text-sm">
          {infoBox.items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-blue-500 mr-2 text-xs">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-8">
      <div className="flex items-center mb-6">
        {icon && (
          <span className={`p-2 rounded-lg bg-${color}-50 mr-3`}>
            <i className={`${icon} text-lg text-${color}-600`}></i>
          </span>
        )}
        <h2 className="text-xl font-semibold text-gray-900">{type}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1">
        {fields.map(renderField)}

        {message && (
          <div className="mt-3">
            <Alert type={message.type} message={message.text || message} />
          </div>
        )}

        {renderInfoBox()}

        <button
          type="submit"
          className={`w-full ${colorClasses[color]} text-white py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-md focus:ring-4 mt-6`}
        >
          <i className="fas fa-paper-plane mr-2 text-sm"></i>
          {type}
        </button>
      </form>
    </div>
  );
}