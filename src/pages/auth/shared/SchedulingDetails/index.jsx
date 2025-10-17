import SchedulingDetailsComponent from "../../../../components/SchedulingDetailsComponent";
import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useSchedulingDetail } from "../../../../hook/useSchedulingDetails";
import Alert from "../../../../components/Alert";
import ActionPanelWarehouseSchedulingDetails from "../../../../components/ActionPanelWarehouseSchedulingDetails";
import { useUser } from "../../../../contexts/UserContext";

export default function SchedulingDetails() {
  const { id } = useParams();
  const { user } = useUser()
  const { scheduling, error, message, refetch } = useSchedulingDetail(id);

  return (
    <>
      <Title title="Detalhes do Agendamento" subtitle="Veja todas as informações do agendamento." back="true" />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      {scheduling && (
        <>
          {user?.role === "warehouse" && scheduling?.schedulingStatus === "Agendado" && (
            <ActionPanelWarehouseSchedulingDetails
              scheduling={scheduling}
              refetch={refetch}
            />
          )}
          <SchedulingDetailsComponent scheduling={scheduling} />
        </>
      )}

      <div className="text-center mt-6">
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Atualizar
        </button>
      </div>
    </>
  );
}
