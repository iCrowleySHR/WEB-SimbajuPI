import { useUser } from "../../contexts/UserContext";
import translate from "../../utils/translate";
import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";

export default function ActionPanelWarehouseSchedulingDetails({ scheduling, refetch }) {
  const navigate = useNavigate();
  const { user } = useUser();

  const isScheduled = scheduling?.schedulingStatus === "Agendado";

  const actions = [
    // Só aparece se estiver "Agendado"
    ...(isScheduled
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

    {
      label: "Ver detalhes do Beneficiário",
      color: "blue",
      icon: "fa-solid fa-user",
      onClick: () =>
        navigate(
          `/${translate(user?.role)}/beneficiario/detalhes/${scheduling.beneficiary.id}`
        ),
    },
    {
      label: "Gerar PDF",
      color: "red",
      icon: "fa-solid fa-file-pdf",
      onClick: () =>
        navigate(
          `/${translate(user?.role)}/agendamento/pdf/${scheduling.id}`
        ),
    },
    {
      label: "Ver Histórico de Retiradas",
      color: "green",
      icon: "fa-solid fa-box",
      onClick: () =>
        navigate(
          `/${translate(user?.role)}/retirada/lista/${scheduling.beneficiary.cpf}`
        ),
    },
    {
      label: "Ver Histórico de Agendamentos",
      color: "orange",
      icon: "fa-solid fa-calendar-check",
      onClick: () =>
        navigate(
          `/${translate(user?.role)}/agendamento/lista/${scheduling.beneficiary.cpf}`
        ),
    },
  ];

  return <ActionPanel title="Ações do Almoxarifado" actions={actions} />;
}