import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import Alert from "../../../../components/Alert";
import translate from "../../../../utils/translate";
import { useUser } from "../../../../contexts/UserContext";
import useCancebleListScheduling from "../../../../hook/useCancebleScheduling";

export default function CancebleListScheduling() {
  const { schedulings, error, message, refetch } = useCancebleListScheduling();
  const { user } = useUser()
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Nome", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Data e Hora", accessor: "dateTime" },
    { label: "Status", accessor: "schedulingStatus" },
  ];

  return (
    <>
      <Title
        title="Cancelar agendameto"
        subtitle="Veja seu agendamento e cancele quando quiser."
        back="true"
      />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      <div className="mt-4">
        <DynamicTable
          data={schedulings}
          columns={columns}
          actions={[
            {
              label: "Cancelar",
              getPath: (row) => `/${translate(user.role).toLowerCase()}/agendamento/cancelar/${row.id}`,
            },]}
        />
      </div>

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
