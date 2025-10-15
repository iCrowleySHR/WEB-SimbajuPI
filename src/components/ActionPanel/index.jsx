export default function ActionPanel({ title = "Ações", actions = [] }) {
  return (
    <section className="mt-8 mb-10">
      {/* Título */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="h-0.5 w-20 bg-blue-600 mx-auto rounded-full mt-2"></div>
      </div>

      {/* Painel de ações */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`
                group flex flex-col items-center justify-center gap-2
                p-4 rounded-xl border border-gray-100
                bg-gradient-to-br from-gray-50 to-white
                shadow-sm hover:shadow-md hover:-translate-y-0.5
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-${action.color}-400
              `}
            >
              <div
                className={`
                  bg-${action.color}-100 text-${action.color}-600
                  p-3 rounded-xl shadow-inner
                  group-hover:bg-${action.color}-200
                  group-hover:scale-105 transition-transform duration-200
                `}
              >
                <i className={`${action.icon} text-lg`}></i>
              </div>
              <span
                className={`
                  text-sm font-medium text-gray-700
                  group-hover:text-${action.color}-700 transition-colors
                `}
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
