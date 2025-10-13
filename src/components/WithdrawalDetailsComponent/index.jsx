import DetailField from "../DetailsField/DetailField";
import BeneficiaryDetailsComponent from "../BeneficiaryDetailsComponent";
import UserDetailsComponent from "../UserDetailsComponent";
import SchedulingDetailsComponent from "../SchedulingDetailsComponent";

export default function WithdrawalDetailsComponent({ withdrawal }) {
  const { scheduling, userWarehouse } = withdrawal;
  const beneficiary = scheduling?.beneficiary;

  return (
    <div className="space-y-6">
      {/* Dados da Retirada */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Detalhes da Retirada</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <DetailField label="ID" value={withdrawal.id} />
          <DetailField
            label="Data e Hora da Retirada"
            value={new Date(withdrawal.dateTime).toLocaleString("pt-BR")}
          />
          <DetailField label="Marca" value={withdrawal.brand} />
          <DetailField label="Tipo de Fralda" value={withdrawal.typeDiaper} />
          <DetailField label="Quantidade de Fraldas" value={withdrawal.quantityDiapers} />
          <DetailField label="Quantidade de Pacotes" value={withdrawal.quantityPackage} />
          <DetailField
            label="Criado em"
            value={new Date(withdrawal.created_at).toLocaleDateString("pt-BR")}
          />
          <DetailField
            label="Atualizado em"
            value={new Date(withdrawal.updated_at).toLocaleDateString("pt-BR")}
          />
          <DetailField
            label="Apagado em"
            value={
              withdrawal.deleted_at
                ? new Date(withdrawal.deleted_at).toLocaleDateString("pt-BR")
                : "Não"
            }
          />
          <DetailField
            label="Responsável pela Retirada"
            value={withdrawal.responsibleWithdrawal || "-"}
          />
        </div>
      </div>

      {/* Usuário do Almoxarifado */}
      {userWarehouse && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Responsável do Almoxarifado pela entrega</h2>
          <UserDetailsComponent user={userWarehouse} />
        </div>
      )}

      {/* Agendamento */}
      {scheduling && (
        <div>
          <SchedulingDetailsComponent scheduling={scheduling} />
        </div>
      )}


    </div>
  );
}
