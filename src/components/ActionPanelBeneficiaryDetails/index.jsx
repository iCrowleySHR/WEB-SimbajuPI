import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import translate from "../../utils/translate";

export default function ActionPanelBeneficiaryDetails({ beneficiary, refetch }) {
  const navigate = useNavigate();
  const { user } = useUser();

  const role = user?.role; // <-- NÃO traduzir aqui

  const actionsByRole = {
    warehouse: [
      {
        label: "Criar Agendamento",
        color: "blue",
        icon: "fa-regular fa-calendar",
        onClick: () =>
          navigate(`/almoxarifado/agendamento/criar/${beneficiary.id}`),
      },
      {
        label: "Ver Histórico de Retiradas",
        color: "green",
        icon: "fa-solid fa-box",
        onClick: () =>
          navigate(`/almoxarifado/retirada/lista/${beneficiary.cpf}`),
      },
      {
        label: "Ver Histórico de Agendamentos",
        color: "orange",
        icon: "fa-solid fa-calendar-check",
        onClick: () =>
          navigate(`/almoxarifado/agendamento/lista/${beneficiary.cpf}`),
      },
      {
        label: "Gerar PDF",
        color: "red",
        icon: "fa-solid fa-file-pdf",
        onClick: () =>
          navigate(`/almoxarifado/beneficiario/pdf/${beneficiary.id}`),
      },
    ],

    ubs: [
      {
        label: "Verificar Conta/Status",
        color: "green",
        icon: "fa-regular fa-user",
        onClick: () =>
          navigate(`/ubs/beneficiario/editar/status/${beneficiary.id}`),
      },
      {
        label: "Gerar PDF",
        color: "red",
        icon: "fa-solid fa-file-pdf",
        onClick: () => navigate(`/ubs/beneficiario/pdf/${beneficiary.id}`),
      },
    ],

    secretary: [
      {
        label: "Editar Prescrição",
        color: "yellow",
        icon: "fa-regular fa-pen-to-square",
        onClick: () =>
          navigate(`/secretaria/beneficiario/editar/prescricao/${beneficiary.id}`),
      },
      {
        label: "Verificar Conta/Status",
        color: "green",
        icon: "fa-regular fa-user",
        onClick: () =>
          navigate(`/secretaria/beneficiario/editar/status/${beneficiary.id}`),
      },
      {
        label: "Desativar Conta",
        color: "red",
        icon: "fa-solid fa-user-xmark",
        onClick: () =>
          navigate(`/secretaria/beneficiario/desabilitar-conta/${beneficiary.id}`),
      },
      {
        label: "Gerar PDF",
        color: "red",
        icon: "fa-solid fa-file-pdf",
        onClick: () =>
          navigate(`/secretaria/beneficiario/pdf/${beneficiary.id}`),
      },
      {
        label: "Ver Histórico de Retiradas",
        color: "green",
        icon: "fa-solid fa-box",
        onClick: () =>
          navigate(`/secretaria/retirada/lista/${beneficiary.cpf}`),
      },
      {
        label: "Ver Histórico de Agendamentos",
        color: "orange",
        icon: "fa-solid fa-calendar-check",
        onClick: () =>
          navigate(`/secretaria/agendamento/lista/${beneficiary.cpf}`),
      },
    ],
  };

  return (
    <ActionPanel
      title={`Ações da ${translate(role)}`}
      actions={actionsByRole[role] || []}
    />
  );
}