import Alert from "../Alert";
import AutocompleteField from "../AutoComplete";

export default function FormBox({
  type,
  icon,
  color = "blue",
  fields = [],
  sections = [],
  message,
  onSubmit,
  infoBox,
  subtitle,
  extraButton
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  const colorConfig = {
    blue: {
      btn: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400/30",
      icon: "bg-blue-50 text-blue-500",
      focus: "focus:ring-blue-400/20 focus:border-blue-400",
      accent: "border-l-blue-400",
      bullet: "bg-blue-400",
      section: "text-blue-500",
    },
    green: {
      btn: "bg-green-500 hover:bg-green-600 focus:ring-green-400/30",
      icon: "bg-green-50 text-green-500",
      focus: "focus:ring-green-400/20 focus:border-green-400",
      accent: "border-l-green-400",
      bullet: "bg-green-400",
      section: "text-green-500",
    },
    red: {
      btn: "bg-red-500 hover:bg-red-600 focus:ring-red-400/30",
      icon: "bg-red-50 text-red-500",
      focus: "focus:ring-red-400/20 focus:border-red-400",
      accent: "border-l-red-400",
      bullet: "bg-red-400",
      section: "text-red-500",
    },
    yellow: {
      btn: "bg-amber-400 hover:bg-amber-500 focus:ring-amber-400/30",
      icon: "bg-amber-50 text-amber-500",
      focus: "focus:ring-amber-400/20 focus:border-amber-400",
      accent: "border-l-amber-400",
      bullet: "bg-amber-400",
      section: "text-amber-500",
    },
  };

  const theme = colorConfig[color] || colorConfig.blue;

  const baseInput = `
    w-full px-3.5 py-2.5 text-base text-gray-800
    bg-gray-50 border border-gray-200 rounded-lg
    outline-none transition-all duration-150
    focus:ring-2 focus:bg-white
    placeholder:text-gray-400
    ${theme.focus}
  `;

  const renderField = (field, index) => {
    if (field.type === "checkbox") {
      return (
        <div key={index} className="mb-3">
          <label className="flex items-center gap-3 cursor-pointer group px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 hover:border-gray-300 transition-all">
            <input
              type="checkbox"
              checked={field.checked}
              onChange={field.onChange}
              className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
            />
            <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors">
              {field.label}
            </span>
          </label>
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={index} className="mb-3">
          <FieldLabel label={field.label} required={field.required} />
          <select
            value={field.value}
            onChange={field.onChange}
            className={`${baseInput} appearance-none cursor-pointer`}
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
        <div key={index} className="mb-3">
          <AutocompleteField
            field={field}
            value={field.value}
            onChange={field.onChange}
            color={color}
          />
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={index} className="mb-3">
          <FieldLabel label={field.label} required={field.required} />
          <textarea
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder || ""}
            className={`${baseInput} resize-none h-24 leading-relaxed`}
            required={field.required !== false}
          />
        </div>
      );
    }

    if (field.type === "file") {
      return (
        <div key={index} className="mb-3">
          <FieldLabel label={field.label} required={field.required} />
          <input
            type="file"
            onChange={field.onChange}
            multiple={field.multiple || false}
            required={field.required !== false}
            className="
              w-full text-base text-gray-500 cursor-pointer
              file:mr-3 file:py-2 file:px-3.5
              file:rounded-md file:border file:border-gray-200
              file:text-sm file:font-medium
              file:bg-white file:text-gray-600
              hover:file:bg-gray-50
              file:transition-colors file:cursor-pointer
            "
          />
        </div>
      );
    }

    return (
      <div key={index} className="mb-3">
        <FieldLabel label={field.label} required={field.required} />
        <input
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          placeholder={field.placeholder || ""}
          className={baseInput}
          required={field.required !== false}
          min={field.min}
        />
      </div>
    );
  };

  const resolvedSections =
    sections.length > 0
      ? sections
      : fields.length > 0
        ? [{ fields }]
        : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        {icon && (
          <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${theme.icon}`}>
            <i className={`${icon} text-lg`}></i>
          </span>
        )}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">{type}</h2>
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {resolvedSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? "mt-5" : ""}>

            {/* Título da seção */}
            {section.title && (
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm font-semibold uppercase tracking-wider ${theme.section}`}>
                  {section.title}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            )}

            {/* Descrição opcional da seção */}
            {section.description && (
              <p className="text-sm text-gray-400 mb-3 -mt-1">{section.description}</p>
            )}

            {section.fields.map(renderField)}
          </div>
        ))}

        {message && (
          <div className="pt-1 pb-2">
            <Alert type={message.type} message={message.text || message} />
          </div>
        )}

        {infoBox && (
          <div className={`mt-4 mb-1 px-4 py-3.5 rounded-lg bg-gray-50 border-l-2 ${theme.accent} border border-gray-100`}>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              {infoBox.title}
            </h4>
            <ul className="space-y-1.5">
              {infoBox.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-500 leading-relaxed">
                  <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${theme.bullet}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {extraButton && (
          <button
            type="button"
            onClick={extraButton.onClick}
            className={`
      w-full mt-3 py-3 px-4 rounded-lg
      text-base font-medium, cursor-pointer
      flex items-center  gap-2
      transition-all duration-150
      border-s-2, underline
      focus:outline-none focus:ring-4
      active:scale-[0.99]
      ${extraButton.className}
    `}
          >
            <i className={extraButton.icon || "fas fa-sync-alt text-sm"} />
            {extraButton.text}
          </button>
        )}

        <button
          type="submit"
          className={`
    w-full mt-5 py-3 px-4 rounded-lg
    text-white text-base font-medium
    flex items-center justify-center gap-2
    transition-all duration-150, cursor-pointer
    focus:outline-none focus:ring-4
    active:scale-[0.99]
    ${theme.btn}
  `}
        >
          <i className="fas fa-paper-plane text-sm" />
          {type}
        </button>
      </form>
    </div>
  );
}

function FieldLabel({ label, required }) {
  return (
    <label className="block text-sm font-medium text-gray-500 mb-1.5 tracking-wide">
      {label}
      {required !== false && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}