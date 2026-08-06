import DetailField from "../DetailsField/DetailField";
import { maskCpf, maskTelephone } from "../../utils/mask";
import UserDetailsComponent from "../UserDetailsComponent";
import LocationDetailsComponent from "../LocateDetailsComponent";
import StatusDetailsComponent from "../StatusDetailsComponent";
import formatDate from "../../utils/formatDate";
import CollapsibleSection from "../CollapsibleSection";
import UbsDetailsComponent from "../UbsDetailsComponent";

export default function BeneficiaryDetailsComponent({ beneficiary, showDetails = false }) {
  const locate = beneficiary?.location;
  const status = beneficiary?.status;
  const user   = beneficiary?.user;
  const ubs   = beneficiary?.ubs;

  return (
    <CollapsibleSection title="Detalhes do Beneficiário" accent="purple" defaultOpen={showDetails}>
      <div className="flex flex-col gap-4">

        {user && <UserDetailsComponent user={user} showDetails={true} />}
        {ubs && <UbsDetailsComponent ubs={ubs} showDetails={true} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DetailField label="Nome do Responsável"      value={beneficiary.nameResponsible} />
          <DetailField label="CPF"                      value={maskCpf(beneficiary.cpf)} />
          <DetailField label="Email do Responsável"     value={beneficiary.emailResponsible} />
          <DetailField label="Telefone"                 value={maskTelephone(beneficiary.telephone)} />
          <DetailField label="Telefone do Responsável"  value={maskTelephone(beneficiary.telephoneResponsible)} />
          <DetailField label="Data de Nascimento"       value={formatDate(beneficiary.birthDate)} />
          <DetailField label="Tipo de Benefício"        value={beneficiary.typeBenefit} />
          <DetailField label="Prazo de Prescrição"      value={formatDate(beneficiary.prescriptionTimeDays)} />
          <DetailField label="Quantidade de Prescrição" value={beneficiary.prescriptionQuantity} />
          <DetailField label="Período Mínimo de Agendamento" value={formatDate(beneficiary.minimumSchedulingPeriod)} />
          <DetailField label="Criado em"                value={formatDate(beneficiary.created_at)} />
          <DetailField label="Atualizado em"            value={formatDate(beneficiary.updated_at)} />
          <DetailField label="Apagado em"               value={beneficiary.deleted_at ? formatDate(beneficiary.deleted_at) : "Não"} />
        </div>

        {locate && <LocationDetailsComponent locate={locate} />}
        {status && <StatusDetailsComponent status={status} />}

      </div>
    </CollapsibleSection>
  );
}