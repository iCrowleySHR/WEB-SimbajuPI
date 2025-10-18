import DetailField from "../DetailsField/DetailField";
import { maskCpf, maskTelephone } from "../../utils/mask";
import UserDetailsComponent from "../UserDetailsComponent";
import LocationDetailsComponent from "../LocateDetailsComponent";
import StatusDetailsComponent from "../StatusDetailsComponent";
import formatDate from "../../utils/formatDate";

export default function BeneficiaryDetailsComponent({ beneficiary }) {
  const locate = beneficiary?.location;
  const status = beneficiary?.status;
  const user = beneficiary?.user;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

      {user && (
        <div className="md:col-span-2">
          <UserDetailsComponent user={user} />
        </div>
      )}

      <DetailField label="ID" value={beneficiary.id} />
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
  );
}
