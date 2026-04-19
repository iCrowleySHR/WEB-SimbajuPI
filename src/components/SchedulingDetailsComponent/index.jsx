import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BeneficiaryDetailsComponent from "../BeneficiaryDetailsComponent";
import DetailField from "../DetailsField/DetailField";
import UserDetailsComponent from "../UserDetailsComponent";
import formatDate from "../../utils/formatDate";

export default function SchedulingDetailsComponent({ scheduling, showDetails = false }) {
  const { beneficiary, userWarehouse } = scheduling;
  const [isOpen, setIsOpen] = useState(showDetails);


  const fields = [
    { label: "ID", value: scheduling.id },
    { label: "Data e Hora", value: formatDate(scheduling.dateTime) },
    { label: "Status", value: scheduling.schedulingStatus },
    { label: "Criado em", value: formatDate(scheduling.created_at) },
    { label: "Atualizado em", value: formatDate(scheduling.updated_at) },
    {
      label: "Apagado em",
      value: scheduling.deleted_at ? formatDate(scheduling.deleted_at) : "Não",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header clicável */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">
              Detalhes do Agendamento
            </span>

            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
              {isOpen ? "visível" : "oculto"}
            </span>
          </div>

          <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo expansível */}
      {isOpen && (
        <div className="p-4">
          <div className="space-y-6">

            {/* Dados do agendamento */}
            <div>
              <h2 className="text-lg font-semibold mb-3">
                Detalhes do Agendamento
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {fields.map((field, index) => (
                  <DetailField
                    key={index}
                    label={field.label}
                    value={field.value}
                  />
                ))}
              </div>
            </div>

            {/* Responsável almoxarifado */}
            {userWarehouse && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  Responsável do Almoxarifado
                </h2>

                <UserDetailsComponent user={userWarehouse} />
              </div>
            )}

            {/* Beneficiário */}
            {beneficiary && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  Detalhes do Beneficiário
                </h2>

                <BeneficiaryDetailsComponent beneficiary={beneficiary} />
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}