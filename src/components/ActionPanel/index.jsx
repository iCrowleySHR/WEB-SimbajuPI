export default function ActionPanel({ title = "Ações", actions = [] }) {
  return (
    <div className="mt-8 mb-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        {title}
      </h2>

      <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-6"></div>

      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`group flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white shadow-sm hover:shadow-md border hover:border-${action.color}-300 transition-all duration-200`}
            >
              <div
                className={`bg-${action.color}-100 text-${action.color}-600 p-3 rounded-full group-hover:scale-110 transition-transform`}
              >
                <i className={`${action.icon} text-xl`}></i>
              </div>
              <span
                className={`text-sm font-semibold text-gray-800 group-hover:text-${action.color}-700`}
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
