import { useUser } from "../../contexts/UserContext";
import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";

export default function ActionPanelSchedulingDetails({ scheduling, refetch }) {
  const navigate = useNavigate();
  const { user } = useUser();

  const role = user?.role;

  const roleRoutes = {
    warehouse: "almoxarifado",
    secretary: "secretaria",
  };

  const routeRole = roleRoutes[role];

  const isScheduled = scheduling?.schedulingStatus === "Agendado";

  const actions = [
    // Warehouse: Só aparece se estiver "Agendado"
    ...(role === "warehouse" && isScheduled
      ? [
          {
            label: "Cancelar agendamento",
            color: "red",
            icon: "fa-regular fa-x",
            onClick: () =>
              navigate(`/almoxarifado/agendamento/cancelar/${scheduling.id}`),
          },
          {
            label: "Marcar como ausente",
            color: "green",
            icon: "fa-regular fa-user",
            onClick: () =>
              navigate(`/almoxarifado/agendamento/ausente/${scheduling.id}`),
          },
        ]
      : []),

    // Ações comuns (Secretaria e Almoxarifado)
    {
      label: "Ver detalhes do Beneficiário",
      color: "blue",
      icon: "fa-solid fa-user",
      onClick: () =>
        navigate(
          `/${routeRole}/beneficiario/detalhes/${scheduling.beneficiary.id}`
        ),
    },
    {
      label: "Gerar PDF",
      color: "red",
      icon: "fa-solid fa-file-pdf",
      onClick: () =>
        navigate(`/${routeRole}/agendamento/pdf/${scheduling.id}`),
    },
    {
      label: "Ver Histórico de Retiradas",
      color: "green",
      icon: "fa-solid fa-box",
      onClick: () =>
        navigate(
          `/${routeRole}/retirada/lista/${scheduling.beneficiary.cpf}`
        ),
    },
    {
      label: "Ver Histórico de Agendamentos",
      color: "orange",
      icon: "fa-solid fa-calendar-check",
      onClick: () =>
        navigate(
          `/${routeRole}/agendamento/lista/${scheduling.beneficiary.cpf}`
        ),
    },
  ];

  const titleByRole = {
    warehouse: "Ações do Almoxarifado",
    secretary: "Ações da Secretaria",
  };

  return (
    <ActionPanel
      title={titleByRole[role] || "Ações"}
      actions={actions}
    />
  );
}