import DetailField from "../DetailsField/DetailField";
import { maskCpf, maskTelephone } from "../../utils/mask";
import UserDetailsComponent from "../UserDetailsComponent";
import LocationDetailsComponent from "../LocateDetailsComponent";
import StatusDetailsComponent from "../StatusDetailsComponent";

export default function BeneficiaryDetailsComponent({ beneficiary }) {
  const locate = beneficiary?.location;
  const status = beneficiary?.status;
  const user = beneficiary?.user;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <DetailField label="ID" value={beneficiary.id} />
      <DetailField label="Nome do Responsável" value={beneficiary.nameResponsible} />
      <DetailField label="CPF" value={maskCpf(beneficiary.cpf)} />
      <DetailField label="Email do Responsável" value={beneficiary.emailResponsible} />
      <DetailField label="Telefone" value={maskTelephone(beneficiary.telephone)} />
      <DetailField label="Telefone do Responsável" value={maskTelephone(beneficiary.telephoneResponsible)} />
      <DetailField
        label="Data de Nascimento"
        value={new Date(beneficiary.birthDate).toLocaleDateString("pt-BR")}
      />
      <DetailField label="Tipo de Benefício" value={beneficiary.typeBenefit} />
      <DetailField label="Prazo de Prescrição (Dias)" value={beneficiary.prescriptionTimeDays} />
      <DetailField label="Quantidade de Prescrição" value={beneficiary.prescriptionQuantity} />
      <DetailField label="Período Mínimo de Agendamento" value={beneficiary.minimumSchedulingPeriod} />
      <DetailField
        label="Criado em"
        value={new Date(beneficiary.created_at).toLocaleDateString("pt-BR")}
      />
      <DetailField
        label="Atualizado em"
        value={new Date(beneficiary.updated_at).toLocaleDateString("pt-BR")}
      />
      <DetailField
        label="Apagado em"
        value={beneficiary.deleted_at ? new Date(beneficiary.deleted_at).toLocaleDateString("pt-BR") : "Não"}
      />
      {user && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Detalhes de Usuário do Beneficirio</h2>
          <UserDetailsComponent user={user} />
        </div>
      )}

      {locate && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Detalhes de Localização</h2>
          <LocationDetailsComponent locate={locate} />
        </div>
      )}

      {status && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Detalhes de Status</h2>
          <StatusDetailsComponent status={status} />
        </div>
      )}
    </div>
  );
}
