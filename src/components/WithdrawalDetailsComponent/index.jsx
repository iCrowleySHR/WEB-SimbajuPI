import BeneficiaryDetailsComponent from "../BeneficiaryDetailsComponent";
import UserDetailsComponent from "../UserDetailsComponent";
import DetailField from "../DetailsField/DetailField";
import formatDate from "../../utils/formatDate";
import CollapsibleSection from "../CollapsibleSection";

export default function SchedulingDetailsComponent({ scheduling, showDetails = false }) {
  const { beneficiary, userWarehouse } = scheduling;

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
    <CollapsibleSection
      title="Detalhes do Agendamento"
      accent="blue"
      defaultOpen={showDetails}
    >
      <div className="flex flex-col gap-6">

        {/* Dados principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, i) => (
            <DetailField key={i} label={field.label} value={field.value} />
          ))}
        </div>

        {/* Responsável */}
        {userWarehouse && (
          <UserDetailsComponent user={userWarehouse} showDetails />
        )}

        {/* Beneficiário */}
        {beneficiary && (
          <BeneficiaryDetailsComponent beneficiary={beneficiary} />
        )}

      </div>
    </CollapsibleSection>
  );
}