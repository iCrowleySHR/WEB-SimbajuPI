import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import BeneficiaryInfo from "../../../../components/BeneficiaryInfo";
import Alert from "../../../../components/Alert";
import { useBeneficiarySecretaryStatus } from "../../../../hook/useBeneficiarySecretaryStatus";
import SecretaryStatusForm from "../../../../components/SecretaryStatusForm";
import UploadDocumentsForm from "../../../../components/UploadDocumentsForm";
import StatusDetailsComponent from "../../../../components/StatusDetailsComponent";

export default function BeneficiaryStatus() {
    const { id } = useParams();

    const {
        beneficiary,
        error,
        errorFile,
        errorUpdate,
        message,
        messageFile,
        messageUpdate,
        secretaryStatus,
        setSecretaryStatus,
        observationSecretary,
        setObservationSecretary,
        files,
        handleFileChange,
        handleUpdateStatus,
        handleUploadFiles
    } = useBeneficiarySecretaryStatus(id);

    return (
        <>
            <Title
                title="Status do beneficiário"
                subtitle="Veja e altere o status do beneficiário, e veja o status da UBS para tomar sua decisão"
                back={true}
            />

            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            {beneficiary && <BeneficiaryInfo beneficiary={beneficiary} />}

            {beneficiary && (
                <>
                    <StatusDetailsComponent status={beneficiary.status} />
                    <div className="mt-5">
                        <SecretaryStatusForm
                            secretaryStatus={secretaryStatus}
                            setSecretaryStatus={setSecretaryStatus}
                            observationSecretary={observationSecretary}
                            setObservationSecretary={setObservationSecretary}
                            handleStatusUpdate={handleUpdateStatus}
                            messageStatus={messageUpdate || errorUpdate}
                        />
                    </div>

                    <UploadDocumentsForm
                        files={files}
                        handleFileChange={handleFileChange}
                        handleUploadFiles={handleUploadFiles}
                        messageStatus={messageFile || errorFile}
                    />
                </>
            )}

        </>
    );
}
