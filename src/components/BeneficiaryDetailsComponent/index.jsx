import DetailField from "../DetailsField/DetailField";
import { maskCpf, maskTelephone } from "../../utils/mask"; 

export default function BeneficiaryDetailsComponent({ beneficiary }) {
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
    </div>
  );
}
