import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useBeneficiaryDetail } from "../../../../hook/useBeneficiaryDetails";
import { useUbsDetails } from "../../../../hook/useUbsDetails";
import { useUser } from "../../../../contexts/UserContext";
import Alert from "../../../../components/Alert";
import UbsDetailsComponent from "../../../../components/UbsDetailsComponent";

export default function UbsData() {
  const { user } = useUser();
  const { id } = useParams();

  const isSecretary = user?.role === "secretary";

  const beneficiaryDetails = useBeneficiaryDetail();

  const ubsDetails = useUbsDetails(
    isSecretary ? id : null
  );

  const beneficiary = beneficiaryDetails.beneficiary;

  const hasUbsAccess =
    beneficiary?.typeBenefit?.toLowerCase() === "administrativo";

  const ubs = isSecretary
    ? ubsDetails.ubs
    : hasUbsAccess
      ? beneficiary?.ubs
      : null;

  const error = isSecretary
    ? ubsDetails.error
    : !hasUbsAccess && beneficiary
      ? "Seu tipo de benefício não possui UBS responsável."
      : beneficiaryDetails.error;

  const message = isSecretary
    ? ubsDetails.message
    : beneficiaryDetails.message;

  return (
    <>
      <Title
        title="Detalhes da UBS Responsável"
        subtitle="Veja todas as informações da sua UBS Responsável."
        back={true}
      />

      {message && (
        <Alert 
          type="success" 
          message={message} 
        />
      )}

      {error && (
        <Alert 
          type="error" 
          message={error} 
        />
      )}

      {ubs && (
        <UbsDetailsComponent
          ubs={ubs}
          showDetails={true}
        />
      )}
    </>
  );
}