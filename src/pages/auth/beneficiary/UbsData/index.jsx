import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useBeneficiaryDetail } from "../../../../hook/useBeneficiaryDetails";
import BeneficiaryDetailsComponent from "../../../../components/BeneficiaryDetailsComponent";

import { useUser } from "../../../../contexts/UserContext";
import Alert from "../../../../components/Alert";
import ActionPanelBeneficiaryDetails from "../../../../components/ActionPanelBeneficiaryDetails";
import UbsDetailsComponent from "../../../../components/UbsDetailsComponent";

export default function UbsData() {
  const { id } = useParams();
  const { beneficiary, error, message } = useBeneficiaryDetail(id);

  return (
    <>
      <Title
        title="Detalhes da UBS Responsável"
        subtitle="Veja todas as informações da sua UBS Responsável."
        back="true"
      />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      {beneficiary?.ubs && (
        <UbsDetailsComponent
          user={beneficiary.ubs}
          showDetails={true}
        />
      )}
    </>
  );
}
