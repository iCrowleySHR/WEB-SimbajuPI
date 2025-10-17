import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import Alert from "../../../../components/Alert";
import { useSchedulingDetail } from "../../../../hook/useSchedulingDetails";
import SchedulingDetailsComponent from "../../../../components/SchedulingDetailsComponent";
import { useCancelScheduling } from "../../../../hook/useCancelScheduling";

export default function CancelScheduling() {
    const { id } = useParams();
    const { scheduling, error: detailError, message: detailMessage, refetch } = useSchedulingDetail(id);
    const { handleCancel, error: cancelError, message: cancelMessage } = useCancelScheduling(id, refetch);

    return (
        <>
            <Title
                title="Cancelar Agendamento"
                subtitle="Cancele o agendamento selecionado"
                back={true}
            />
            <section className="mt-5 font-medium text-lg">
                Deseja cancelar esse agendamento?
            </section>

            <button
                onClick={handleCancel}
                className="px-6 mb-9 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors mt-3"
            >
                Confirmar
            </button>

            {detailMessage && <Alert type="success" message={detailMessage} />}
            {detailError && <Alert type="error" message={detailError} />}
            {cancelMessage && <Alert type="success" message={cancelMessage} />}
            {cancelError && <Alert type="error" message={cancelError} />}

            {scheduling && <SchedulingDetailsComponent scheduling={scheduling} />}

        </>
    );
}
