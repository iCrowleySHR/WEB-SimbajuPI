import { Link } from "react-router-dom";
import translate from "../../utils/translate";

export default function SchedulingCancelCard({ item, user }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-sm text-gray-400">Agendamento</p>
          <p className="text-base font-semibold text-gray-900">
            #{item.id} - {item.beneficiaryName}
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 font-medium">
          {item.schedulingStatus}
        </span>
      </div>

      {/* Info */}
      <div className="mt-4 grid gap-2 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-500">CPF:</span>{" "}
          {item.cpf}
        </p>

        <p>
          <span className="font-medium text-gray-500">Data e Hora:</span>{" "}
          {item.dateTime}
        </p>
      </div>

      {/* Ações */}
      <div className="mt-5 flex gap-3 flex-wrap">
        <Link
          to={`/${translate(user?.role).toLowerCase()}/agendamento/detalhes/${item.id}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition flex items-center gap-2"
        >
          <i className="fas fa-eye text-xs" />
          Ver detalhes
        </Link>

        <Link
          to={`/${translate(user?.role).toLowerCase()}/agendamento/cancelar/${item.id}`}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition flex items-center gap-2"
        >
          <i className="fas fa-times-circle text-xs" />
          Cancelar
        </Link>
      </div>
    </div>
  );
}