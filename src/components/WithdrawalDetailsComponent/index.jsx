import DetailField from "../DetailsField/DetailField";
import UserDetailsComponent from "../UserDetailsComponent";
import SchedulingDetailsComponent from "../SchedulingDetailsComponent";
import formatDate from "../../utils/formatDate";

export default function WithdrawalDetailsComponent({ withdrawal }) {
  const { scheduling, userWarehouse } = withdrawal;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Detalhes da Retirada</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <DetailField label="ID" value={withdrawal.id} />
          <DetailField
            label="Data e Hora da Retirada"
            value={formatDate(withdrawal.dateTime)}
          />
          <DetailField label="Marca" value={withdrawal.brand} />
          <DetailField label="Tipo de Fralda" value={withdrawal.typeDiaper} />
          <DetailField label="Quantidade de Fraldas" value={withdrawal.quantityDiapers} />
          <DetailField label="Quantidade de Pacotes" value={withdrawal.quantityPackage} />
          <DetailField label="Criado em" value={formatDate(withdrawal.created_at)} />
          <DetailField label="Atualizado em" value={formatDate(withdrawal.updated_at)} />
          <DetailField
            label="Apagado em"
            value={withdrawal.deleted_at ? formatDate(withdrawal.deleted_at) : "Não"}
          />
          <DetailField
            label="Responsável pela Retirada"
            value={withdrawal.responsibleWithdrawal || "-"}
          />
        </div>
      </div>

      {userWarehouse && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Responsável do Almoxarifado pela Entrega
          </h2>
          <UserDetailsComponent user={userWarehouse} />
        </div>
      )}

      {scheduling && (
        <div>
          <SchedulingDetailsComponent scheduling={scheduling} />
        </div>
      )}
    </div>
  );
}
