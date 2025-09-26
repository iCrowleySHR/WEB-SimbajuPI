import { PatientRow } from "../PatientRow";


export function PatientTable({ patients, onStatusChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nome</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">CPF</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status Atual</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {patients.map((p) => (
            <PatientRow
              key={p.cpf}
              patient={p}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
