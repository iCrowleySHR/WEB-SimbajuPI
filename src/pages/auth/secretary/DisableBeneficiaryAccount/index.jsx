import Title from "../../../../components/Title";
import { useParams } from "react-router-dom";
import { useDisableBeneficiaryAccount } from "../../../../hook/useDisableBeneficiaryAccount";
import BeneficiaryInfo from "../../../../components/BeneficiaryInfo";
import Alert from "../../../../components/Alert";

export default function DisableBeneficiaryAccount() {
    const { id } = useParams();
    const {
        beneficiary, error, message, handleDisable
    } = useDisableBeneficiaryAccount(id);
    return (
        <>
            <Title
                title="Desabilitar conta de beneficiário"
                subtitle="Desabilite a conta de um beneficiario ativo"
                back={true}
            />

            {beneficiary && <BeneficiaryInfo beneficiary={beneficiary} />}
            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            <div>
                <section className=" font-medium text-lg">
                    Deseja desativar a conta desse beneficiário?
                </section>
                <button
                    onClick={handleDisable}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors mt-3"
                >
                    Confirmar
                </button>
            </div>
        </>
    );
}
