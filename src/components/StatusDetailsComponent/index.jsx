import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DetailField from "../DetailsField/DetailField";

export default function StatusDetailsComponent({ status, showDetails = false }) {
  const [isOpen, setIsOpen] = useState(showDetails);
  
  if (!status) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header clicável */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-yellow-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">Detalhes do Status</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailField label="Status UBS" value={status.ubsStatus} />
            <DetailField
              label="Observação UBS"
              value={status.observationUbs}
            />
            <DetailField
              label="Documento UBS"
              value={
                status.documentationStatusUbs ? (
                  <a href={status.documentationStatusUbs} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    Visualizar
                  </a>
                ) : (
                  "Não disponível"
                )
              }
            />
            <DetailField label="Status Secretaria" value={status.secretaryStatus} />
            <DetailField
              label="Observação Secretaria"
              value={status.observationSecretary}
            />
            <DetailField
              label="Documento Secretaria"
              value={
                status.documentationStatusSecretary ? (
                  <a href={status.documentationStatusSecretary} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    Visualizar
                  </a>
                ) : (
                  "Não disponível"
                )
              }
            />
            <DetailField
              label="Última Verificação"
              value={new Date(status.lastCheck).toLocaleDateString("pt-BR")}
            />
            <DetailField
              label="Criado em"
              value={new Date(status.created_at).toLocaleDateString("pt-BR")}
            />
            <DetailField
              label="Atualizado em"
              value={new Date(status.updated_at).toLocaleDateString("pt-BR")}
            />
            <DetailField
              label="Apagado em"
              value={status.deleted_at ? new Date(status.deleted_at).toLocaleDateString("pt-BR") : "Não"}
            />
          </div>
        </div>
      )}
    </div>
  );
}