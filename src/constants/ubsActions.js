export const ubsActions = [
  {
    category: "Beneficiários",
    items: [
      {
        title: "Lista de beneficiarios ativos",
        description: "Veja todos os beneficiarios cadastrados.",
        iconClass: "fas fa-user-plus",
        bgColor: "bg-blue-600",
        hoverColor: "hover:bg-blue-700",
        to: "/ubs/beneficiario/lista",
      },
    ],
  },
  {
    category: "Configurações",
    items: [
      {
        title: "Atualizar endereço",
        description:
          "Atualize o endereço da sua UBS",
        iconClass: "fa fa-location-dot",
        bgColor: "bg-orange-600",
        hoverColor: "hover:bg-orange-700",
        to: "/ubs/atualizar-localizacao",
      },
    ],
  },
  {
    category: "Reavaliações",
    items: [
      {
        title: "Reavaliação semestral",
        description:
          "Valide os benefícios dos pacientes, efetuando a reavaliação semestral.",
        iconClass: "fa fa-users",
        bgColor: "bg-pink-600",
        hoverColor: "hover:bg-pink-700",
        to: "/ubs/beneficiario/ultima-veriricacao",
      },
    ],
  },
];