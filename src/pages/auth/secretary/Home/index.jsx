import { useState } from "react";
import ActionButton from "../../../../components/ActionButton";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";
import CreateAdminAccountModal from "../../../../components/Modal/CreateAdminAccountModal";
import SubtitleHome from "../../../../components/SubtitleHome";
import ContainerActionButton from "../../../../components/ContainerActionButton";
import SearchBarHome from "../../../../components/SearchBarHome";
import { secretaryActions } from "../../../../constants/secretaryActions";

export default function SecretaryHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const showModalCreateAdminAccount = () => {
    setIsModalOpen(true);
  };

  const allActions = secretaryActions(showModalCreateAdminAccount);

  const filterActions = () => {
    if (!searchTerm.trim()) {
      return allActions;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return allActions
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.title.toLowerCase().includes(lowerSearchTerm) ||
            item.description.toLowerCase().includes(lowerSearchTerm)
        ),
      }))
      .filter((category) => category.items.length > 0);
  };

  const filteredActions = filterActions();

  const totalResults = filteredActions.reduce(
    (acc, category) => acc + category.items.length,
    0
  );

  return (
    <>
      <Title
        title={"Secretaria de Saúde"}
        subtitle={"Gerencie beneficiários e monitore o programa."}
      />

      {/* ✅ NOVO COMPONENTE DE BUSCA */}
      <SearchBarHome
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")}
        resultCount={totalResults}
      />

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

      {filteredActions.length > 0 ? (
        filteredActions.map((category, index) => (
          <div key={index}>
            <SubtitleHome>{category.category}</SubtitleHome>
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

      <CreateAdminAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}