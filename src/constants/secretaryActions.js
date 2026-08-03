export const secretaryActions = (showModalCreateAdminAccount) => [
  {
    category: "Beneficiários",
    items: [
      {
        title: "Novo Beneficiário",
        description: "Cadastrar novo paciente no sistema.",
        iconClass: "fas fa-user-plus",
        bgColor: "bg-blue-400",
        hoverColor: "hover:bg-blue-500",
        to: "/secretaria/novo-beneficiario",
      },
      {
        title: "Lista de Beneficiários",
        description: "Visualizar e gerenciar cadastros.",
        iconClass: "fas fa-list",
        bgColor: "bg-blue-600",
        hoverColor: "hover:bg-blue-700",
        to: "/secretaria/beneficiario/lista",
      },
      {
        title: "Beneficiários desativados",
        description: "Acompanhe a lista de beneficiados desativados",
        iconClass: "fas fa-xmark",
        bgColor: "bg-blue-800",
        hoverColor: "hover:bg-blue-900",
        to: "/secretaria/beneficiario/desativados",
      },
      {
        title: "Reavaliação semestral",
        description:
          "Valide os benefícios dos pacientes, efetuando a reavaliação semestral.",
        iconClass: "fa fa-users",
        bgColor: "bg-pink-600",
        hoverColor: "hover:bg-pink-700",
        to: "/secretaria/beneficiario/ultima-veriricacao",
      },
      {
        title: "Status da UBS",
        description:
          "Acompanhe a lista de beneficiarios ativos com o status diferente de Ativado da UBS.",
        iconClass: "fas fa-plus",
        bgColor: "bg-pink-800",
        hoverColor: "hover:bg-pink-900",
        to: "/secretaria/beneficiario/status/suspensoes/ubs",
      },
    ],
  },
  {
    category: "Históricos",
    items: [
      {
        title: "Histórico de agendamentos",
        description: "Acompanhe a lista de todos os agendamentos.",
        iconClass: "fas fa-history",
        bgColor: "bg-green-600",
        hoverColor: "hover:bg-green-700",
        to: "/secretaria/agendamento/lista",
      },
      {
        title: "Histórico de retiradas",
        description: "Acompanhe a lista de retiradas",
        iconClass: "fas fa-calendar-check",
        bgColor: "bg-green-800",
        hoverColor: "hover:bg-green-900",
        to: "/secretaria/retirada/lista",
      },
    ],
  },
  {
    category: "Contas",
    items: [
      {
        title: "Contas de Almoxarifado",
        description: "Veja as contas cadastradas com o tipo de perfil Almoxarifado.",
        iconClass: "fas fa-person",
        bgColor: "bg-cyan-600",
        hoverColor: "hover:bg-cyan-700",
        to: "/secretaria/almoxarifado/lista",
      },
      {
        title: "Contas de UBS",
        description: "Veja as contas cadastradas com o tipo de perfil UBS.",
        iconClass: "fas fa-plus",
        bgColor: "bg-amber-700",
        hoverColor: "hover:bg-amber-900",
        to: "/secretaria/ubs/lista",
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
        to: "/secretaria/relatorios",
      },
      {
        title: "Criar Contas Administrativas",
        description: "Criar acessos para UBS ou Almoxarifados.",
        iconClass: "fa fa-users",
        bgColor: "bg-yellow-600",
        hoverColor: "hover:bg-yellow-700",
        onClick: showModalCreateAdminAccount,
      },
    ],
  },
];