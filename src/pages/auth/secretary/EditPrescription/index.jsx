import PrescriptionForm from "../../../../components/PrescriptionForm";
import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useBeneficiaryWithPrescription } from "../../../../hook/useEditPrescription";

export default function EditPrescription() {
    const { id } = useParams();
    const {
        beneficiary,
        typeBenefit,
        setTypeBenefit,
        prescriptionTimeDays,
        setPrescriptionTimeDays,
        prescriptionQuantity,
        setPrescriptionQuantity,
        message,
        updatePrescription,
    } = useBeneficiaryWithPrescription(id);

    return (
        <>
            <Title
                title="Editar Prescrição"
                subtitle="Edite a prescrição do beneficiário selecionado."
                back={true}
            />

            {beneficiary && (
                <PrescriptionForm
                    key={beneficiary?.id}
                    typeBenefit={typeBenefit}
                    setTypeBenefit={setTypeBenefit}
                    prescriptionTimeDays={prescriptionTimeDays}
                    setPrescriptionTimeDays={setPrescriptionTimeDays}
                    prescriptionQuantity={prescriptionQuantity}
                    setPrescriptionQuantity={setPrescriptionQuantity}
                    handlePrescriptionUpdate={updatePrescription}
                    messagePrescription={message}
                />
            )}
        </>
    );
}
