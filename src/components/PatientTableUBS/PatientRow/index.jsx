export function PatientRow({ patient, onStatusChange }) {
  return (
    <tr>
      <td className="px-4 py-3">{patient.name}</td>
      <td className="px-4 py-3">{patient.cpf}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            patient.status === "ativo"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </span>
      </td>
      <td className="px-4 py-3">
        <select
          value={patient.status}
          onChange={(e) => onStatusChange(patient.cpf, e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          <option value="ativo">Ativo</option>
          <option value="mudou">Mudou de Município</option>
          <option value="faleceu">Faleceu</option>
          <option value="outro">Outro Motivo</option>
        </select>
      </td>
    </tr>
  );
}
