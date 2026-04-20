import { useUser } from "../../contexts/UserContext";
import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";

export default function ActionPanelWithdrawalDetails({ withdrawal }) {
  const navigate = useNavigate();
  const { user } = useUser();

  const role = user?.role;

  const roleRoutes = {
    warehouse: "almoxarifado",
    secretary: "secretaria",
    beneficiary: "beneficiario",
  };

  const routeRole = roleRoutes[role];

  const scheduling = withdrawal?.scheduling;
  const beneficiary = scheduling?.beneficiary;

  const allActions = [
    {
      key: "beneficiario",
      label: "Ver detalhes do Beneficiário",
      color: "blue",
      icon: "fa-solid fa-user",
      onClick: () =>
        navigate(`/${routeRole}/beneficiario/detalhes/${beneficiary?.id}`),
    },
    {
      key: "pdf",
      label: "Gerar PDF",
      color: "red",
      icon: "fa-solid fa-file-pdf",
      onClick: () =>
        navigate(`/${routeRole}/retirada/pdf/${withdrawal?.id}`),
    },
    {
      key: "history-withdrawal",
      label: "Ver Histórico de Retiradas",
      color: "green",
      icon: "fa-solid fa-box",
      onClick: () =>
        navigate(`/${routeRole}/retirada/lista/${beneficiary?.cpf}`),
    },
    {
      key: "history-scheduling",
      label: "Ver Histórico de Agendamentos",
      color: "orange",
      icon: "fa-solid fa-calendar-check",
      onClick: () =>
        navigate(`/${routeRole}/agendamento/lista/${beneficiary?.cpf}`),
    },
  ];

  const actions =
    role === "beneficiary"
      ? allActions.filter((a) => a.key === "pdf")
      : allActions;

  return <ActionPanel title="Ações" actions={actions} />;
}