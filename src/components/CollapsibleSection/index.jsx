import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CollapsibleSection({ title, accent = "blue", defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const accentColors = {
    blue:   "bg-blue-500",
    green:  "bg-green-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <span className={`w-1 h-4 rounded-full ${accentColors[accent] ?? accentColors.blue}`} />
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {isOpen ? "visível" : "oculto"}
          </span>
        </div>
        {isOpen
          ? <ChevronUp className="w-4 h-4 text-gray-400" />
          : <ChevronDown className="w-4 h-4 text-gray-400" />
        }
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}