import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";


export default function ActionPanelUbsBeneficiaryDetails({ beneficiary, refetch }) {
  const navigate = useNavigate();

  return (
    <ActionPanel
      title="Ações da UBS"
      actions={[
        {
          label: "Verificar Conta/Status",
          color: "green",
          icon: "fa-regular fa-user",
          onClick: () => navigate(`/ubs/beneficiario/editar/status/${beneficiary.id}`),
        },
        {
          label: "Atualizar Dados",
          color: "blue",
          icon: "fa-solid fa-rotate-right",
          onClick: refetch,
        },
      ]}
    />
  );
}
