import { Link } from "react-router-dom";

export default function DynamicTable({
  data = [],
  columns = [],
  actions,
}) {
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => {
      if (acc && acc[key] !== undefined && acc[key] !== null) {
        return acc[key];
      }

      return "-";
    }, obj);
  };

  if (!data.length) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center

          min-h-40
          p-6

          bg-white
          border
          border-dashed
          border-gray-300

          rounded-2xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-center

            w-12
            h-12

            mb-3

            rounded-full
            bg-gray-100
            text-gray-400
          "
        >
          <i
            className="fas fa-inbox text-lg"
            aria-hidden="true"
          />
        </div>

        <p className="text-sm font-medium text-gray-600">
          Nenhum dado disponível
        </p>

        <p className="text-xs text-gray-400 mt-1 text-center">
          Não encontramos registros para exibir.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3

        gap-4
        lg:gap-5
      "
    >
      {data.map((row, rowIndex) => (
        <article
          key={rowIndex}
          className="
            group

            bg-white

            border
            border-gray-200

            rounded-2xl

            overflow-hidden

            shadow-sm

            hover:shadow-lg
            hover:border-gray-300

            transition-all
            duration-200

            active:scale-[0.99]
          "
        >
          {/* Conteúdo */}
          <div
            className="
              p-4
              sm:p-5

              space-y-3
            "
          >
            {columns.map((col, colIndex) => {
              const value = getNestedValue(
                row,
                col.accessor
              );

              const isFirst = colIndex === 0;

              return (
                <div
                  key={colIndex}
                  className={`
                    flex
                    items-start
                    justify-between
                    gap-4

                    ${
                      isFirst
                        ? "pb-3 border-b border-gray-100"
                        : ""
                    }
                  `}
                >
                  <div className="min-w-0">
                    <p
                      className={`
                        ${
                          isFirst
                            ? "text-xs uppercase tracking-wide"
                            : "text-sm"
                        }

                        font-medium
                        text-gray-400
                      `}
                    >
                      {col.label}
                    </p>
                  </div>

                  <p
                    title={String(value)}
                    className={`
                      min-w-0
                      max-w-[65%]

                      text-right

                      break-words

                      ${
                        isFirst
                          ? "text-base font-bold text-gray-800"
                          : "text-sm font-semibold text-gray-700"
                      }
                    `}
                  >
                    {value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Ações */}
          {actions?.length > 0 && (
            <div
              className="
                border-t
                border-gray-100

                bg-gray-50/70

                p-3

                flex
                flex-wrap
                justify-end
                gap-2
              "
            >
              {actions.map((action, i) => {
                const isDanger =
                  action.variant === "danger";

                const baseClasses = `
                  inline-flex
                  items-center
                  justify-center
                  gap-2

                  min-h-10
                  px-3

                  rounded-lg

                  text-sm
                  font-medium

                  transition-all

                  active:scale-95

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-1

                  ${
                    isDanger
                      ? `
                        text-red-600
                        bg-red-50
                        hover:bg-red-100
                      `
                      : `
                        text-blue-600
                        bg-blue-50
                        hover:bg-blue-100
                      `
                  }
                `;

                if (action.onClick) {
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() =>
                        action.onClick(row)
                      }
                      className={baseClasses}
                    >
                      {action.icon && (
                        <i
                          className={action.icon}
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {action.label}
                      </span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={i}
                    to={action.getPath(row)}
                    className={baseClasses}
                  >
                    {action.icon && (
                      <i
                        className={action.icon}
                        aria-hidden="true"
                      />
                    )}

                    <span>
                      {action.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}