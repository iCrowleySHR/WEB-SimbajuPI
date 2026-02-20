export const warehouseActions = [
  {
    category: "Agendamentos",
    items: [
      {
        title: "Marcar Agendamento",
        description: "Registre um agendamento para o beneficiário",
        iconClass: "fas fa-plus",
        bgColor: "bg-blue-600",
        hoverColor: "hover:bg-blue-700",
        to: "/almoxarifado/agendamento/criar",
      },
      {
        title: "Histórico de agendamentos",
        description: "Acompanhe a lista de todos os agendamentos.",
        iconClass: "fas fa-calendar-check",
        bgColor: "bg-green-600",
        hoverColor: "hover:bg-green-800",
        to: "/almoxarifado/agendamento/lista",
      },
      {
        title: "Agendamento marcados para hoje",
        description: "Acompanhe a lista de agendamento para hoje.",
        iconClass: "fas fa-hand-holding",
        bgColor: "bg-pink-600",
        hoverColor: "hover:bg-pink-700",
        to: "/almoxarifado/agendamento/hoje",
      },
    ],
  },
  {
    category: "Retiradas",
    items: [
      {
        title: "Registrar Retirada e Próximo Agendamento",
        description:
          "Confirmar retirada de insumo do paciente e próxima retirada.",
        iconClass: "fas fa-hand-holding",
        bgColor: "bg-pink-600",
        hoverColor: "hover:bg-pink-700",
        to: "/almoxarifado/retirada/registrar",
      },
      {
        title: "Histórico de retiradas",
        description: "Acompanhe a lista de retiradas",
        iconClass: "fas fa-history",
        bgColor: "bg-yellow-600",
        hoverColor: "hover:bg-yellow-700",
        to: "/almoxarifado/retirada/lista",
      },
    ],
  },
  {
    category: "Beneficiários",
    items: [
      {
        title: "Lista de Beneficiários Ativos",
        description: "Confirmar retirada de insumo mediante a beneficio.",
        iconClass: "fas fa-list",
        bgColor: "bg-green-600",
        hoverColor: "hover:bg-green-700",
        to: "/almoxarifado/beneficiario/lista",
      },
    ],
  },
  {
    category: "Funções Administrativas",
    items: [
      {
        title: "Relatórios",
        description: "Gerar relatórios e estatísticas.",
        iconClass: "fas fa-chart-bar",
        bgColor: "bg-purple-600",
        hoverColor: "hover:bg-purple-700",
        to: "/almoxarifado/relatorios",
      },
      {
        title: "Configurações de funcionamento",
        description: "Configure o horário de funcionamento da unidade.",
        iconClass: "fas fa-gears",
        bgColor: "bg-purple-800",
        hoverColor: "hover:bg-purple-900",
        to: "/almoxarifado/configuracoes/funcionamento",
      },
    ],
  },
];