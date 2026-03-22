import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";


export default function ActionPanelSecretaryBeneficiaryDetails({ beneficiary, refetch }) {
  const navigate = useNavigate();

  return (
    <ActionPanel
      title="Ações da Secretaria"
      actions={[
        {
          label: "Editar Prescrição",
          color: "yellow",
          icon: "fa-regular fa-pen-to-square",
          onClick: () => navigate(`/secretaria/beneficiario/editar/prescricao/${beneficiary.id}`),
        },
        {
          label: "Verificar Conta/Status",
          color: "green",
          icon: "fa-regular fa-user",
          onClick: () => navigate(`/secretaria/beneficiario/editar/status/${beneficiary.id}`),
        },
        {
          label: "Desativar Conta",
          color: "red",
          icon: "fa-solid fa-user-xmark",
          onClick: () => navigate(`/secretaria/beneficiario/desabilitar-conta/${beneficiary.id}`),
        },
        {
          label: "Atualizar Dados",
          color: "blue",
          icon: "fa-solid fa-rotate-right",
          onClick: refetch,
        },
        {
          label: "Ver Histórico de Retiradas",
          color: "green",
          icon: "fa-solid fa-box",
          onClick: () => navigate(`/secretaria/retirada/lista/${beneficiary.cpf}`),
        },
        {
          label: "Ver Histórico de Agendamentos",
          color: "orange",
          icon: "fa-solid fa-calendar-check",
          onClick: () => navigate(`/secretaria/agendamento/lista/${beneficiary.cpf}`),
        },
      ]}
    />
  );
}
