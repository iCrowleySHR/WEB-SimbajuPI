import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CollapsibleSection({
  title,
  accent = "blue",
  defaultOpen = false,
  children,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const accentColors = {
    blue: {
      bar: "bg-blue-500",
      icon: "bg-blue-50 text-blue-600",
      active: "bg-blue-50/50",
    },

    green: {
      bar: "bg-green-500",
      icon: "bg-green-50 text-green-600",
      active: "bg-green-50/50",
    },

    purple: {
      bar: "bg-purple-500",
      icon: "bg-purple-50 text-purple-600",
      active: "bg-purple-50/50",
    },

    yellow: {
      bar: "bg-yellow-500",
      icon: "bg-yellow-50 text-yellow-600",
      active: "bg-yellow-50/50",
    },
  };

  const theme =
    accentColors[accent] || accentColors.blue;

  return (
    <section
      className="
        bg-white

        border
        border-gray-200

        rounded-2xl

        overflow-hidden

        shadow-sm
      "
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`
          w-full

          min-h-14

          px-4
          sm:px-5
          py-3

          flex
          items-center
          justify-between
          gap-3

          text-left

          transition-colors
          duration-150

          ${
            isOpen
              ? theme.active
              : "hover:bg-gray-50 active:bg-gray-100"
          }

          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-inset
        `}
      >
        {/* Esquerda */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Accent */}
          <span
            className={`
              shrink-0

              w-1
              h-8

              rounded-full

              ${theme.bar}
            `}
          />

          {/* Título */}
          <div className="min-w-0">
            <p
              className="
                text-sm
                sm:text-base

                font-semibold

                text-gray-800

                truncate
              "
            >
              {title}
            </p>

            <p
              className="
                text-xs
                text-gray-400

                mt-0.5

                hidden
                sm:block
              "
            >
              {isOpen
                ? "Clique para recolher"
                : "Clique para visualizar"}
            </p>
          </div>
        </div>

        {/* Direita */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`
              hidden
              sm:inline-flex

              items-center
              justify-center

              px-2.5
              py-1

              rounded-full

              text-[11px]
              font-medium

              ${
                isOpen
                  ? `${theme.icon} `
                  : "bg-gray-100 text-gray-400"
              }
            `}
          >
            {isOpen ? "Aberto" : "Fechado"}
          </span>

          <span
            className="
              flex
              items-center
              justify-center

              w-9
              h-9

              rounded-full

              bg-gray-100
            "
          >
            <ChevronDown
              className={`
                w-5
                h-5

                text-gray-500

                transition-transform
                duration-200

                ${isOpen ? "rotate-180" : ""}
              `}
            />
          </span>
        </div>
      </button>

      {/* Conteúdo */}
      {isOpen && (
        <div
          className="
            border-t
            border-gray-100
          "
        >
          <div
            className="
              p-4
              sm:p-5
            "
          >
            {children}
          </div>
        </div>
      )}
    </section>
  );
}