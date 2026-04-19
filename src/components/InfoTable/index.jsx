export default function InfoTable({ rows = [] }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.filter(r => r.value !== undefined && r.value !== null && r.value !== "").map((row, i) => (
          <tr
            key={i}
            className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-5 py-3 text-gray-400 font-medium w-48 whitespace-nowrap">
              {row.label}
            </td>
            <td className="px-5 py-3 text-gray-800">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}