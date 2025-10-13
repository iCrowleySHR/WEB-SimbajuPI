import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useBeneficiaryDetail } from "../../../../hook/useBeneficiaryDetails";
import BeneficiaryDetailsComponent from "../../../../components/BeneficiaryDetailsComponent";

export default function BeneficiaryDetails() {
  const { id } = useParams();
  const { beneficiary, error, message, refetch } = useBeneficiaryDetail(id);

  return (
    <>
      <Title title="Detalhes do Beneficiário" subtitle="Veja todas as informações do beneficiário." back="true" />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-gray-500 text-center mt-4">{message}</p>}

      {beneficiary && <BeneficiaryDetailsComponent beneficiary={beneficiary} />}

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
