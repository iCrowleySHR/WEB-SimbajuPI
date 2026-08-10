import PrescriptionForm from "../../../../components/PrescriptionForm";
import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import useAllUbs from "../../../../hook/useAllUbs";
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
        ubsId,
        setUbsId,
        message,
        updatePrescription,
    } = useBeneficiaryWithPrescription(id);

    const {
        ubsUsers,
        error
    } = useAllUbs(1, "", true);

    return (
        <>
            <Title
                title="Editar Prescrição/UBS"
                subtitle="Edite a prescrição/UBS do beneficiário selecionado."
                back={true}
            />

            {beneficiary && (
                <PrescriptionForm
                    key={beneficiary.id}
                    typeBenefit={typeBenefit}
                    setTypeBenefit={setTypeBenefit}
                    prescriptionTimeDays={prescriptionTimeDays}
                    setPrescriptionTimeDays={setPrescriptionTimeDays}
                    prescriptionQuantity={prescriptionQuantity}
                    setPrescriptionQuantity={setPrescriptionQuantity}
                    handlePrescriptionUpdate={updatePrescription}
                    messagePrescription={message}
                    ubsId={ubsId}
                    setUbsId={setUbsId}
                    ubsUsers={ubsUsers}
                />
            )}
        </>
    );
}