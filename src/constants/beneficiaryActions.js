export const beneficiaryActions = [
  {
    category: "Agendamentos",
    items: [
      {
        title: "Criar Agendamento",
        description: "Agende a sua retirda de fraldas.",
        iconClass: "fas fa-calendar-alt",
        bgColor: "bg-blue-600",
        hoverColor: "hover:bg-blue-700",
        to: "/beneficiario/agendamento/criar",
      },
      {
        title: "Histórico de agendamentos",
        description: "Veja seus agendamentos anteriores.",
        iconClass: "fas fa-history",
        bgColor: "bg-green-600",
        hoverColor: "hover:bg-green-700",
        to: "/beneficiario/agendamento/historico",
      },
      {
        title: "Cancelar Agendamento",
        description: "Veja seu agendamento e cancele quando quiser.",
        iconClass: "fas fa-xmark",
        bgColor: "bg-red-800",
        hoverColor: "hover:bg-red-900",
        to: "/beneficiario/agendamento/cancelaveis",
      },
    ],
  },
  {
    category: "Retiradas",
    items: [
      {
        title: "Histórico de retiradas",
        description: "Veja suas retiradas anteriores.",
        iconClass: "fas fa-history",
        bgColor: "bg-yellow-600",
        hoverColor: "hover:bg-yellow-700",
        to: "/beneficiario/retirada/historico",
      },
    ],
  },
  {
    category: "Informações da Conta",
    items: [
      {
        title: "Seus dados",
        description: "Veja seus dados e status.",
        iconClass: "fas fa-user",
        bgColor: "bg-purple-600",
        hoverColor: "hover:bg-purple-700",
        to: "/beneficiario/dados",
      },
            {
        title: "UBS Responsável",
        description: "Veja os dados da sua UBS Responsável.",
        iconClass: "fas fa-plus",
        bgColor: "bg-blue-600",
        hoverColor: "hover:bg-blue-700",
        to: "/beneficiario/ubs",
      },
    ],
  },
];