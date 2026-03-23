import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DetailField from "../DetailsField/DetailField";
import UserDetailsComponent from "../UserDetailsComponent";
import SchedulingDetailsComponent from "../SchedulingDetailsComponent";
import formatDate from "../../utils/formatDate";

export default function WithdrawalDetailsComponent({ withdrawal, showDetails = false }) {
  const { scheduling, userWarehouse } = withdrawal;
  const [isOpen, setIsOpen] = useState(showDetails);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header clicável */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">Detalhes da Retirada</span>
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
            <div>
              <h2 className="text-lg font-semibold mb-3">Detalhes da Retirada</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <DetailField label="ID" value={withdrawal.id} />
                <DetailField
                  label="Data e Hora da Retirada"
                  value={formatDate(withdrawal.dateTime)}
                />
                <DetailField label="Marca" value={withdrawal.brand} />
                <DetailField label="Tipo de Fralda" value={withdrawal.typeDiaper} />
                <DetailField label="Quantidade de Fraldas" value={withdrawal.quantityDiapers} />
                <DetailField label="Quantidade de Pacotes" value={withdrawal.quantityPackage} />
                <DetailField label="Criado em" value={formatDate(withdrawal.created_at)} />
                <DetailField label="Atualizado em" value={formatDate(withdrawal.updated_at)} />
                <DetailField
                  label="Apagado em"
                  value={withdrawal.deleted_at ? formatDate(withdrawal.deleted_at) : "Não"}
                />
                <DetailField
                  label="Responsável pela Retirada"
                  value={withdrawal.responsibleWithdrawal || "-"}
                />
              </div>
            </div>

            {userWarehouse && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  Responsável do Almoxarifado pela Entrega
                </h2>
                <UserDetailsComponent user={userWarehouse} />
              </div>
            )}

            {scheduling && (
              <div>
                <SchedulingDetailsComponent scheduling={scheduling} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}