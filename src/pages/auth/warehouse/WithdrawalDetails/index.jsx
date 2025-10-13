import WithdrawalDetailsComponent from "../../../../components/WithdrawalDetailsComponent"; 
import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useWithdrawalDetails } from "../../../../hook/useWithdrawalDetails";

export default function WithdrawalDetails() {
  const { id } = useParams(); 
  const { withdrawal, error, message, refetch } = useWithdrawalDetails(id);

  return (
    <>
      <Title
        title="Detalhes da Retirada"
        subtitle="Veja todas as informações da retirada."
        back="true"
      />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-gray-500 text-center mt-4">{message}</p>}

      {withdrawal && <WithdrawalDetailsComponent withdrawal={withdrawal} />}

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
