import { useState } from "react";
import ActionButton from "../../../../components/ActionButton";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";
import CreateAdminAccountModal from "../../../../components/Modal/CreateAdminAccountModal";
import SubtitleHome from "../../../../components/SubtitleHome";
import ContainerActionButton from "../../../../components/ContainerActionButton";

export default function SecretaryHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const showModalCreateAdminAccount = () => {
    setIsModalOpen(true);
  }

  // Definição de todas as ações disponíveis
  const allActions = [
    {
      category: "Beneficiários",
      items: [
        {
          title: "Novo Beneficiário",
          description: "Cadastrar novo paciente no sistema.",
          iconClass: "fas fa-user-plus",
          bgColor: "bg-blue-400",
          hoverColor: "hover:bg-blue-500",
          to: "/secretaria/novo-beneficiario"
        },
        {
          title: "Lista de Beneficiários",
          description: "Visualizar e gerenciar cadastros.",
          iconClass: "fas fa-list",
          bgColor: "bg-blue-600",
          hoverColor: "hover:bg-blue-700",
          to: "/secretaria/beneficiario/lista"
        },
        {
          title: "Beneficiários desativados",
          description: "Acompanhe a lista de beneficiados desativados",
          iconClass: "fas fa-xmark",
          bgColor: "bg-blue-800",
          hoverColor: "hover:bg-blue-900",
          to: "/secretaria/beneficiario/desativados"
        },
        {
          title: "Reavaliação semestral",
          description: "Valide os benefícios dos pacientes, efetuando a reavaliação semestral.",
          iconClass: "fa fa-users",
          bgColor: "bg-pink-600",
          hoverColor: "hover:bg-pink-700",
          to: "/secretaria/beneficiario/ultima-veriricacao"
        },
        {
          title: "Status da UBS",
          description: "Acompanhe a lista de beneficiarios ativos com o status diferente de Ativado da UBS.",
          iconClass: "fas fa-plus",
          bgColor: "bg-pink-800",
          hoverColor: "hover:bg-pink-900",
          to: "/secretaria/beneficiario/status/suspensoes/ubs"
        }
      ]
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
          to: "/secretaria/agendamento/lista"
        },
        {
          title: "Histórico de retiradas",
          description: "Acompanhe a lista de retiradas",
          iconClass: "fas fa-calendar-check",
          bgColor: "bg-green-800",
          hoverColor: "hover:bg-green-900",
          to: "/secretaria/retirada/lista"
        }
      ]
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
          to: "/secretaria/relatorios"
        },
        {
          title: "Criar Contas Administrativas",
          description: "Criar acessos para UBS ou Almoxarifados.",
          iconClass: "fa fa-users",
          bgColor: "bg-yellow-600",
          hoverColor: "hover:bg-yellow-700",
          onClick: showModalCreateAdminAccount,
          to: undefined 
        }
      ]
    }
  ];

  // Função para filtrar itens baseado no termo de busca
  const filterActions = () => {
    if (!searchTerm.trim()) {
      return allActions;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return allActions
      .map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.title.toLowerCase().includes(lowerSearchTerm) ||
          item.description.toLowerCase().includes(lowerSearchTerm)
        )
      }))
      .filter(category => category.items.length > 0);
  };

  const filteredActions = filterActions();

  return (
    <>
      {/* Título */}
      <Title title={"Secretaria de Saúde"} subtitle={"Gerencie beneficiários e monitore o programa."} />

      {/* Barra de Pesquisa */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            placeholder="Pesquisar por título ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        
        {/* Indicador de resultados */}
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600">
            {filteredActions.reduce((acc, category) => acc + category.items.length, 0)} resultados encontrados
          </div>
        )}
      </div>

      {/* Cards de Estatísticas - Falta ligar com API*/}
      <div className="grid md:grid-cols-4 gap-6 mb-8 hidden">
        <StatsCard
          title="Total Beneficiários"
          value="1,247"
          iconClass="fas fa-users"
          iconColor="#2563EB"
        />
        <StatsCard
          title="Ativos"
          value="1,198"
          iconClass="fas fa-check-circle"
          iconColor="#16A34A"
        />
        <StatsCard
          title="Pendentes"
          value="49"
          iconClass="fas fa-clock"
          iconColor="#CA8A04"
        />
        <StatsCard
          title="Este Mês"
          value="143,640"
          iconClass="fas fa-box"
          iconColor="#7C3AED"
          extra="fraldas distribuídas"
        />
      </div>

      {/* Renderização condicional baseada na pesquisa */}
      {filteredActions.length > 0 ? (
        filteredActions.map((category, index) => (
          <div key={index}>
            <SubtitleHome>
              {category.category}
            </SubtitleHome>
            <ContainerActionButton>
              {category.items.map((item, itemIndex) => (
                <ActionButton
                  key={itemIndex}
                  title={item.title}
                  description={item.description}
                  iconClass={item.iconClass}
                  bgColor={item.bgColor}
                  hoverColor={item.hoverColor}
                  to={item.to}
                  onClick={item.onClick}
                />
              ))}
            </ContainerActionButton>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-gray-600">
            Tente buscar por termos diferentes ou mais genéricos.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Limpar pesquisa
          </button>
        </div>
      )}

      <CreateAdminAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}