export default function ActionPanel({ title = "Ações", actions = [] }) {
  const colorMap = {
    blue: {
      button: "hover:border-blue-200 hover:bg-blue-50 focus:ring-blue-300",
      iconBox: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    },
    green: {
      button: "hover:border-green-200 hover:bg-green-50 focus:ring-green-300",
      iconBox: "bg-green-50 text-green-600 group-hover:bg-green-100",
    },
    red: {
      button: "hover:border-red-200 hover:bg-red-50 focus:ring-red-300",
      iconBox: "bg-red-50 text-red-600 group-hover:bg-red-100",
    },
    yellow: {
      button: "hover:border-yellow-200 hover:bg-yellow-50 focus:ring-yellow-300",
      iconBox: "bg-yellow-50 text-yellow-700 group-hover:bg-yellow-100",
    },
    purple: {
      button: "hover:border-purple-200 hover:bg-purple-50 focus:ring-purple-300",
      iconBox: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    },
    gray: {
      button: "hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-300",
      iconBox: "bg-gray-100 text-gray-600 group-hover:bg-gray-200",
    },
  };

  return (
    <section className="mt-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Selecione alguma das ações abaixo para acessar as funcionalidades relacionadas.
          </p>
        </div>

        <div className="hidden sm:block w-20 h-1 rounded-full bg-gray-100" />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const color = colorMap[action.color] || colorMap.gray;

          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`
                group relative overflow-hidden
                flex flex-col items-start justify-between
                p-5 rounded-2xl border border-gray-200 bg-white
                shadow-sm hover:shadow-md
                transition-all duration-200
                active:scale-[0.98]
                focus:outline-none focus:ring-2
                ${color.button}
              `}
            >
              {/* detalhe decorativo */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gray-100 opacity-40 group-hover:opacity-60 transition" />

              {/* Icon */}
              <div
                className={`
                  relative z-10 w-12 h-12 rounded-xl
                  flex items-center justify-center
                  border border-white shadow-sm
                  transition
                  ${color.iconBox}
                `}
              >
                <i className={`${action.icon} text-lg`} />
              </div>

              {/* Label */}
              <div className="relative z-10 mt-4 text-left">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">
                  {action.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Clique para acessar
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}