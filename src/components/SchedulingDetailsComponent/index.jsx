import BeneficiaryDetailsComponent from "../BeneficiaryDetailsComponent";
import DetailField from "../DetailsField/DetailField";
import LocationDetailsComponent from "../LocateDetailsComponent";
import StatusDetailsComponent from "../StatusDetailsComponent";
import UserDetailsComponent from "../UserDetailsComponent";


export default function SchedulingDetailsComponent({ scheduling }) {
  const { beneficiary, userWarehouse } = scheduling;

  const locate = beneficiary?.location;
  const status = beneficiary?.status;
  const user = beneficiary?.user;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Detalhes do Agendamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <DetailField label="ID" value={scheduling.id} />
          <DetailField
            label="Data e Hora"
            value={new Date(scheduling.dateTime).toLocaleString("pt-BR")}
          />
          <DetailField label="Status" value={scheduling.schedulingStatus} />
          <DetailField
            label="Criado em"
            value={new Date(scheduling.created_at).toLocaleDateString("pt-BR")}
          />
          <DetailField
            label="Atualizado em"
            value={new Date(scheduling.updated_at).toLocaleDateString("pt-BR")}
          />
          <DetailField
            label="Apagado em"
            value={
              scheduling.deleted_at
                ? new Date(scheduling.deleted_at).toLocaleDateString("pt-BR")
                : "Não"
            }
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
