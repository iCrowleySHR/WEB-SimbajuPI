import Title from "../../../../components/Title";
import { Link, useParams } from "react-router-dom";
import { useDisableBeneficiaryAccount } from "../../../../hook/useDisableBeneficiaryAccount";
import BeneficiaryInfo from "../../../../components/BeneficiaryInfo";
import Alert from "../../../../components/Alert";

export default function DisableBeneficiaryAccount() {
  const { id } = useParams();
  const { beneficiary, error, message, handleDisable } = useDisableBeneficiaryAccount(id);

  return (
    <>
      <Title
        title="Desabilitar conta de beneficiário"
        subtitle="Desabilite a conta de um beneficiário ativo"
        back={true}
      />

      {beneficiary && <BeneficiaryInfo beneficiary={beneficiary} />}

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-red-400 text-base" />
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold text-gray-900 leading-tight">
              Desativar conta do beneficiário?
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Essa ação irá suspender o acesso do beneficiário ao sistema. Você poderá reativá-lo posteriormente.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={handleDisable}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 active:scale-[0.99] text-white text-sm font-medium rounded-lg transition-all duration-150 flex items-center gap-2"
              >
                <i className="fas fa-ban text-xs" />
                Confirmar desativação
              </button>

              <Link
                to={`/secretaria/beneficiario/detalhes/${id}`}
                className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 active:scale-[0.99] text-gray-600 text-sm font-medium rounded-lg border border-gray-200 transition-all duration-150 flex items-center gap-2"
              >
                <i className="fas fa-user text-xs" />
                Ver detalhes completos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}