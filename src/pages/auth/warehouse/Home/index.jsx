import { useState } from "react";
import ActionButton from "../../../../components/ActionButton";
import ContainerActionButton from "../../../../components/ContainerActionButton";
import StatsCard from "../../../../components/StatsCard";
import SubtitleHome from "../../../../components/SubtitleHome";
import Title from "../../../../components/Title";

export default function WarehouseHome() {
  const [searchTerm, setSearchTerm] = useState("");

  // Definição de todas as ações disponíveis
  const allActions = [
    {
      category: "Agendamentos",
      items: [
        {
          title: "Marcar Agendamento",
          description: "Registre um agendamento para o beneficiário",
          iconClass: "fas fa-plus",
          bgColor: "bg-blue-600",
          hoverColor: "hover:bg-blue-700",
          to: "/almoxarifado/agendamento/criar"
        },
        {
          title: "Histórico de agendamentos",
          description: "Acompanhe a lista de todos os agendamentos.",
          iconClass: "fas fa-calendar-check",
          bgColor: "bg-green-600",
          hoverColor: "hover:bg-green-800",
          to: "/almoxarifado/agendamento/lista"
        },
        {
          title: "Agendamento marcados para hoje",
          description: "Acompanhe a lista de agendamento para hoje.",
          iconClass: "fas fa-hand-holding",
          bgColor: "bg-pink-600",
          hoverColor: "hover:bg-pink-700",
          to: "/almoxarifado/agendamento/hoje"
        }
      ]
    },
    {
      category: "Retiradas",
      items: [
        {
          title: "Registrar Retirada e Próximo Agendamento",
          description: "Confirmar retirada de insumo do paciente e próxima retirada.",
          iconClass: "fas fa-hand-holding",
          bgColor: "bg-pink-600",
          hoverColor: "hover:bg-pink-700",
          to: "/almoxarifado/retirada/registrar"
        },
        {
          title: "Histórico de retiradas",
          description: "Acompanhe a lista de retiradas",
          iconClass: "fas fa-history",
          bgColor: "bg-yellow-600",
          hoverColor: "hover:bg-yellow-700",
          to: "/almoxarifado/retirada/lista"
        }
      ]
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
          to: "/almoxarifado/beneficiario/lista"
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
          to: "/almoxarifado/relatorios"
        },
        {
          title: "Configurações de funcionamento",
          description: "Configure o horário de funcionamento da unidade.",
          iconClass: "fas fa-gears",
          bgColor: "bg-purple-800",
          hoverColor: "hover:bg-purple-900",
          to: "/almoxarifado/configuracoes/funcionamento"
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
      <Title
        title={"Almoxarifado"}
        subtitle={"Controle de agendamentos, retiradas e relatórios."}
      />

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

      <div className="grid md:grid-cols-3 gap-6 mb-8 hidden">
        <StatsCard
          title="Distribuídas Hoje"
          value="5"
          iconClass="fas fa-truck"
          iconColor="#16A34A"
        />
        <StatsCard
          title="Pendentes"
          value="49"
          iconClass="fas fa-calendar-day"
          iconColor="#ff6400"
        />
        <StatsCard
          title="Agendamento Atrasados"
          value="0"
          iconClass="fas fa-exclamation-triangle"
          iconColor="#ab000b"
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
    </>
  );
}