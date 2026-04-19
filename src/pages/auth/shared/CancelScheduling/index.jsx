import Title from "../../../../components/Title";
import { Link, useParams } from "react-router-dom";
import Alert from "../../../../components/Alert";
import { useSchedulingDetail } from "../../../../hook/useSchedulingDetails";
import SchedulingDetailsComponent from "../../../../components/SchedulingDetailsComponent";
import { useCancelScheduling } from "../../../../hook/useCancelScheduling";

export default function CancelScheduling() {
  const { id } = useParams();
  const {
    scheduling,
    error: detailError,
    message: detailMessage,
    refetch,
  } = useSchedulingDetail(id);

  const {
    handleCancel,
    error: cancelError,
    message: cancelMessage,
  } = useCancelScheduling(id, refetch);

  return (
    <>
      <Title
        title="Cancelar Agendamento"
        subtitle="Cancele o agendamento selecionado"
        back={true}
      />

      {detailMessage && <Alert type="success" message={detailMessage} />}
      {detailError && <Alert type="error" message={detailError} />}
      {cancelMessage && <Alert type="success" message={cancelMessage} />}
      {cancelError && <Alert type="error" message={cancelError} />}

      {scheduling && (
        <div className="mt-6">
          <SchedulingDetailsComponent scheduling={scheduling} showDetails={true} />
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-red-400 text-base" />
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold text-gray-900 leading-tight">
              Cancelar este agendamento?
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Essa ação irá cancelar o agendamento selecionado. O beneficiário não poderá mais realizar a retirada nesta data.
            </p>

            <div className="flex items-center gap-3 mt-5 flex-wrap">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 active:scale-[0.99] text-white text-sm font-medium rounded-lg transition-all duration-150 flex items-center gap-2"
              >
                <i className="fas fa-times-circle text-xs" />
                Confirmar cancelamento
              </button>

              <Link
                to={`/almoxarifado/agendamento/detalhes/${id}`}
                className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 active:scale-[0.99] text-gray-600 text-sm font-medium rounded-lg border border-gray-200 transition-all duration-150 flex items-center gap-2"
              >
                <i className="fas fa-calendar-alt text-xs" />
                Ver detalhes completos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}