import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import BeneficiaryInfo from "../../../../components/BeneficiaryInfo";
import Alert from "../../../../components/Alert";
import UploadDocumentsForm from "../../../../components/UploadDocumentsForm";
import StatusDetailsComponent from "../../../../components/StatusDetailsComponent";
import { useBeneficiaryUbsStatus } from "../../../../hook/useBeneficiaryUbsStatus";
import UbsStatusForm from "../../../../components/UbsStatusForm";

export default function BeneficiaryStatusUbs() {
    const { id } = useParams();

    const {
        beneficiary,
        error,
        errorFile,
        errorUpdate,
        message,
        messageFile,
        messageUpdate,
        ubsStatus,
        setUbsStatus,
        observationUbs,
        setObservationUbs,
        files,
        handleFileChange,
        handleUpdateStatus,
        handleUploadFiles
    } = useBeneficiaryUbsStatus(id);

    return (
        <>
            <Title
                title="Status do beneficiário"
                subtitle="Veja e altere o status do beneficiário, com base no seu status, a secretária toma sua ação."
                back={true}
            />

            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            {beneficiary && <BeneficiaryInfo beneficiary={beneficiary} />}

            {beneficiary && (
                <>
                    <StatusDetailsComponent status={beneficiary.status} />
                    <div className="mt-5">
                        <UbsStatusForm
                            ubsStatus={ubsStatus}
                            setUbsStatus={setUbsStatus}
                            observationUbs={observationUbs}
                            setObservationUbs={setObservationUbs}
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
