import { useState } from "react";
import ActionButton from "../../../../components/ActionButton";
import ContainerActionButton from "../../../../components/ContainerActionButton";
import StatsCard from "../../../../components/StatsCard";
import SubtitleHome from "../../../../components/SubtitleHome";
import Title from "../../../../components/Title";
import SearchBarHome from "../../../../components/SearchBarHome";
import { ubsActions } from "../../../../constants/ubsActions";

export default function UbsHome() {
  const [searchTerm, setSearchTerm] = useState("");

  const filterActions = () => {
    if (!searchTerm.trim()) {
      return ubsActions;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return ubsActions
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
      <Title title={"UBS"} subtitle={"Gerencie beneficiários e os status."} />

      {/* 🔎 Search reutilizável */}
      <SearchBarHome
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")}
        resultCount={totalResults}
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8 hidden">
        <StatsCard
          title="Pacientes da UBS"
          value="64"
          iconClass="fas fa-users"
          iconColor="#16A34A"
        />
        <StatsCard
          title="Pacientes Ativos"
          value="49"
          iconClass="fas fa-clipboard-check"
          iconColor="#ff9100"
        />
        <StatsCard
          title="Pacientes Desativados"
          value="15"
          iconClass="fas fa-exclamation-triangle"
          iconColor="#ab000b"
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