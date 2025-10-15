import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useBeneficiaryDetail } from "../../../../hook/useBeneficiaryDetails";
import BeneficiaryDetailsComponent from "../../../../components/BeneficiaryDetailsComponent";

import { useUser } from "../../../../contexts/UserContext"; 
import ActionPanelSecretaryBeneficiaryDetails from "../../../../components/ActionPanelSecretaryBeneficiaryDetails";

export default function BeneficiaryDetails() {
  const { id } = useParams();
  const { beneficiary, error, message, refetch } = useBeneficiaryDetail(id);
  const { user } = useUser(); 

  return (
    <>
      <Title
        title="Detalhes do Beneficiário"
        subtitle="Veja todas as informações do beneficiário."
        back="true"
      />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-gray-500 text-center mt-4">{message}</p>}

      {beneficiary && (
        <>
          {user?.role === "secretary" && (
            <ActionPanelSecretaryBeneficiaryDetails
              beneficiary={beneficiary}
              refetch={refetch}
            />
          )}

          <BeneficiaryDetailsComponent beneficiary={beneficiary} />
        </>
      )}
    </>
  );
}
