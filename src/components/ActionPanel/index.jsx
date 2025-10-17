export default function ActionPanel({ title = "Ações", actions = [] }) {
  return (
    <section className="mt-10 mb-12">
      {/* Título */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="mt-2 h-1.5 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
      </div>

      {/* Painel de ações */}
      <div className="bg-gray-50 border border-gray-100 rounded-3xl shadow-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`
                group flex flex-col items-center justify-center gap-3
                p-5 rounded-2xl border border-transparent
                bg-white hover:bg-gradient-to-br hover:from-${action.color}-50 hover:to-${action.color}-100
                shadow-md hover:shadow-xl transform hover:-translate-y-1
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-3 focus:ring-${action.color}-300
              `}
            >
              <div
                className={`
                  bg-${action.color}-200 text-${action.color}-700
                  p-4 rounded-2xl
                  group-hover:bg-${action.color}-300
                  group-hover:scale-110 transition-transform duration-300
                `}
              >
                <i className={`${action.icon} text-xl`}></i>
              </div>
              <span
                className={`
                  text-sm font-medium text-gray-800
                  group-hover:text-${action.color}-800 transition-colors duration-300
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
