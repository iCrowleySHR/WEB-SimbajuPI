import { Link } from "react-router-dom";

export default function DynamicTable({ data = [], columns = [], actions }) {
  // if (!data || data.length === 0) {
  //   return (
  //     <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg shadow-sm">
  //       Nenhum dado disponível
  //     </div>
  //   );
  // }

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => {
      if (acc && acc[key] !== undefined && acc[key] !== null) {
        return acc[key];
      }
      return "-";
    }, obj);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Conteúdo da linha */}
          <div className="p-5 space-y-3">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex justify-between text-sm">
                <span className="font-medium text-gray-500">{col.label}:</span>
                <span className="text-gray-800 font-semibold truncate text-right">
                  {getNestedValue(row, col.accessor)}
                </span>
              </div>
            ))}
          </div>

          {/* Ações */}
          {actions && (
            <div className="border-t border-gray-100 py-3 px-4 flex flex-wrap gap-2 justify-end">
              {actions.map((action, i) => {
                const baseClasses =
                  "text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline transition";
                if (action.onClick) {
                  return (
                    <button
                      key={i}
                      onClick={() => action.onClick(row)}
                      className={baseClasses}
                    >
                      {action.label}
                    </button>
                  );
                } else {
                  return (
                    <Link
                      key={i}
                      to={action.getPath(row)}
                      className={baseClasses}
                    >
                      {action.label}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
