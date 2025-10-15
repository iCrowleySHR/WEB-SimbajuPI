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
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">
                Ações
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (

            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                >
                  {getNestedValue(row, col.accessor) ?? "-"}
                </td>
              ))}

              {actions && (
                <td className="px-6 py-4 text-sm font-semibold space-x-2">
                  {actions.map((action, i) => {
                    if (action.onClick) {
                      return (
                        <button
                          key={i}
                          onClick={() => action.onClick(row)}
                          className="text-blue-600 hover:underline"
                        >
                          {action.label}
                        </button>
                      );
                    } else {
                      return (
                        <Link
                          key={i}
                          to={action.getPath(row)}
                          className="text-blue-600 hover:underline"
                        >
                          {action.label}
                        </Link>
                      );
                    }
                  })}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
