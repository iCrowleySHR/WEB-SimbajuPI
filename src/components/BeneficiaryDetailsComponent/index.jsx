import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DetailField from "../DetailsField/DetailField";
import { maskCpf, maskTelephone } from "../../utils/mask";
import UserDetailsComponent from "../UserDetailsComponent";
import LocationDetailsComponent from "../LocateDetailsComponent";
import StatusDetailsComponent from "../StatusDetailsComponent";
import formatDate from "../../utils/formatDate";

export default function BeneficiaryDetailsComponent({ beneficiary, showDetails = false }) {
  const locate = beneficiary?.location;
  const status = beneficiary?.status;
  const user = beneficiary?.user;
  
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
            <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">Detalhes do Beneficiário</span>
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
            {user && (
              <div className="md:col-span-2">
                <UserDetailsComponent user={user} showDetails={true} />
              </div>
            )}

            <DetailField label="Nome do Responsável" value={beneficiary.nameResponsible} />
            <DetailField label="CPF" value={maskCpf(beneficiary.cpf)} />
            <DetailField label="Email do Responsável" value={beneficiary.emailResponsible} />
            <DetailField label="Telefone" value={maskTelephone(beneficiary.telephone)} />
            <DetailField label="Telefone do Responsável" value={maskTelephone(beneficiary.telephoneResponsible)} />

            <DetailField
              label="Data de Nascimento"
              value={formatDate(beneficiary.birthDate)}
            />

            <DetailField label="Tipo de Benefício" value={beneficiary.typeBenefit} />
            <DetailField label="Prazo de Prescrição" value={formatDate(beneficiary.prescriptionTimeDays)} />
            <DetailField label="Quantidade de Prescrição" value={beneficiary.prescriptionQuantity} />
            <DetailField label="Período Mínimo de Agendamento" value={formatDate(beneficiary.minimumSchedulingPeriod)} />

            <DetailField
              label="Criado em"
              value={formatDate(beneficiary.created_at)}
            />
            <DetailField
              label="Atualizado em"
              value={formatDate(beneficiary.updated_at)}
            />
            <DetailField
              label="Apagado em"
              value={beneficiary.deleted_at ? formatDate(beneficiary.deleted_at) : "Não"}
            />

            {locate && (
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold mb-3">Detalhes de Localização</h2>
                <LocationDetailsComponent locate={locate} />
              </div>
            )}

            {status && (
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold mb-3">Detalhes de Status</h2>
                <StatusDetailsComponent status={status} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}