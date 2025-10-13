import SchedulingDetailsComponent from "../../../../components/SchedulingDetailsComponent";
import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useSchedulingDetail } from "../../../../hook/useSchedulingDetails";

export default function SchedulingDetails() {
  const { id } = useParams(); 
  const { scheduling, error, message, refetch } = useSchedulingDetail(id);
  
  return (  
    <>
      <Title title="Detalhes do Agendamento" subtitle="Veja todas as informações do agendamento." back="true" />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-gray-500 text-center mt-4">{message}</p>}

      {scheduling && <SchedulingDetailsComponent scheduling={scheduling} />}

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
