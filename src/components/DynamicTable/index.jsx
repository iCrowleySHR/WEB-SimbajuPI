import { Link } from "react-router-dom";

export default function DynamicTable({ data = [], columns, actions }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nenhum dado disponível
      </div>
    );
  }

  const headers = columns || Object.keys(data[0]);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 border-b">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-sm font-semibold text-gray-700">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                >
                  {row[header]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm text-blue-600 font-semibold space-x-2">
                  {actions.map((action, i) => (
                    <Link
                      key={i}
                      to={action.getPath(row)}
                      className="hover:underline"
                    >
                      {action.label}
                    </Link>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
