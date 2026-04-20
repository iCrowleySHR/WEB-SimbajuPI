
import Alert from "../../../../components/Alert";
import { useUser } from "../../../../contexts/UserContext";
import useCancebleListScheduling from "../../../../hook/useCancebleScheduling";
import SchedulingCancelCard from "../../../../components/SchedulingCancelCard";
import Title from "../../../../components/Title";

export default function CancebleListScheduling() {
  const { schedulings, error, message } =
    useCancebleListScheduling();
  const { user } = useUser();

  return (
    <>
      <Title
        title="Cancelar Agendamento"
        subtitle="Selecione um agendamento para visualizar ou cancelar"
        back={true}
      />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      <div className="mt-6 grid gap-4">
        {schedulings?.length > 0 ? (
          schedulings.map((item) => (
            <SchedulingCancelCard
              key={item.id}
              item={item}
              user={user}
            />
          ))
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
            Nenhum agendamento disponível para cancelamento
          </div>
        )}
      </div>
    </>
  );
}