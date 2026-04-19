import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

export default function DetailField({ label, value, colSpan = 1, icon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`
        ${colSpan > 1 ? "col-span-2" : ""}
        flex items-center justify-between gap-4 p-4
        bg-gradient-to-br from-gray-50 to-white
        border border-gray-200
        rounded-2xl shadow-sm hover:shadow-md
        transition-all duration-300
      `}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {icon && (
          <div className="text-blue-500 text-xl flex-shrink-0 bg-blue-50 p-2 rounded-xl shadow-inner">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 tracking-wide mb-1">
            {label}
          </p>
          <p className="text-base font-semibold text-gray-800 truncate">
            {value || "-"}
          </p>
        </div>
      </div>

      {value && (
        <button
          onClick={handleCopy}
          className={`
            flex-shrink-0
            p-1.5 rounded-lg border border-transparent
            hover:bg-blue-50 active:bg-blue-100
            text-gray-500 hover:text-blue-600
            transition-all duration-200
          `}
          title="Copiar valor"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Clipboard className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}
