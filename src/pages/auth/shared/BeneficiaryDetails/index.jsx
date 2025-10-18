import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useBeneficiaryDetail } from "../../../../hook/useBeneficiaryDetails";
import BeneficiaryDetailsComponent from "../../../../components/BeneficiaryDetailsComponent";

import { useUser } from "../../../../contexts/UserContext";
import ActionPanelSecretaryBeneficiaryDetails from "../../../../components/ActionPanelSecretaryBeneficiaryDetails";
import Alert from "../../../../components/Alert";
import ActionPanelUbsBeneficiaryDetails from "../../../../components/ActionPanelUbsBeneficiaryDetails";
import ActionPanelWarehouseBeneficiaryDetails from "../../../../components/ActionPanelWarehouseBeneficiaryDetails";

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

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      {beneficiary && (
        <>
          {user?.role === "secretary" && (
            <ActionPanelSecretaryBeneficiaryDetails
              beneficiary={beneficiary}
              refetch={refetch}
            />
          )}
          {user?.role === "ubs" && (
            <ActionPanelUbsBeneficiaryDetails
              beneficiary={beneficiary}
              refetch={refetch}
            />
          )}

          {user?.role === "warehouse" && (
            <ActionPanelWarehouseBeneficiaryDetails
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
