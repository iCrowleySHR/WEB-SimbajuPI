import { Link } from "react-router-dom";

export default function DynamicTable({ data = [], columns = [], actions }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nenhum dado disponível
      </div>
    );
  }

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => {
      if (acc && acc[key] !== undefined && acc[key] !== null) {
        return acc[key];
      }
      return undefined;
    }, obj);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-4 space-y-2">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">{col.label}:</span>
                <span className="text-gray-800 text-right">
                  {getNestedValue(row, col.accessor) ?? "-"}
                </span>
              </div>
            ))}
          </div>

          {actions && (
            <div className="border-t px-4 py-2 flex flex-wrap gap-2 justify-end">
              {actions.map((action, i) => {
                const commonClasses =
                  "text-blue-600 text-sm font-medium hover:underline transition";

                if (action.onClick) {
                  return (
                    <button
                      key={i}
                      onClick={() => action.onClick(row)}
                      className={commonClasses}
                    >
                      {action.label}
                    </button>
                  );
                } else {
                  return (
                    <Link
                      key={i}
                      to={action.getPath(row)}
                      className={commonClasses}
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
