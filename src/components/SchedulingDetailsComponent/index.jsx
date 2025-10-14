import BeneficiaryDetailsComponent from "../BeneficiaryDetailsComponent";
import DetailField from "../DetailsField/DetailField";
import LocationDetailsComponent from "../LocateDetailsComponent";
import StatusDetailsComponent from "../StatusDetailsComponent";
import UserDetailsComponent from "../UserDetailsComponent";
import formatDate from "../../utils/formatDate";

export default function SchedulingDetailsComponent({ scheduling }) {
  const { beneficiary, userWarehouse } = scheduling;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Detalhes do Agendamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <DetailField label="ID" value={scheduling.id} />
          <DetailField label="Data e Hora" value={formatDate(scheduling.dateTime)} />
          <DetailField label="Status" value={scheduling.schedulingStatus} />
          <DetailField label="Criado em" value={formatDate(scheduling.created_at)} />
          <DetailField label="Atualizado em" value={formatDate(scheduling.updated_at)} />
          <DetailField
            label="Apagado em"
            value={scheduling.deleted_at ? formatDate(scheduling.deleted_at) : "Não"}
          />
        </div>
      </div>

      {userWarehouse && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Responsável do Almoxarifado</h2>
          <UserDetailsComponent user={userWarehouse} />
        </div>
      )}

      {beneficiary && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Detalhes do Beneficiário</h2>
          <BeneficiaryDetailsComponent beneficiary={beneficiary} />
        </div>
      )}
    </div>
  );
}
