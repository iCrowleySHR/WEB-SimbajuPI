import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DetailField from "../DetailsField/DetailField";
import { maskCep } from "../../utils/mask";
import formatDate from "../../utils/formatDate";

export default function LocationDetailsComponent({ locate, showDetails = false }) {
  const [isOpen, setIsOpen] = useState(showDetails);

  if (!locate) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header com botão */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">Mostrar detalhes</span>
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
              {isOpen ? "visível" : "oculto"}
            </span>
          </div>
          
          <button 
            className="p-1.5 hover:bg-white rounded-lg transition-colors"
            aria-label={isOpen ? "Recolher detalhes" : "Expandir detalhes"}
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo expansível */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
        `}
      >
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailField label="CEP" value={maskCep(locate.cep)} />
            <DetailField label="Rua" value={`${locate.streetName}, ${locate.numberHouse}`} />
            <DetailField label="Bairro" value={locate.neighborhood} />
            <DetailField label="Cidade" value={locate.city} />
            <DetailField label="Criado em" value={formatDate(locate.created_at)} />
            <DetailField label="Atualizado em" value={formatDate(locate.updated_at)} />
            <DetailField
              label="Apagado em"
              value={locate.deleted_at ? formatDate(locate.deleted_at) : "Não"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}