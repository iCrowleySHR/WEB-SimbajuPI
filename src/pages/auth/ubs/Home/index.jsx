import ActionButton from "../../../../components/ActionButton";
import ContainerActionButton from "../../../../components/ContainerActionButton";
import StatsCard from "../../../../components/StatsCard";
import SubtitleHome from "../../../../components/SubtitleHome";
import Title from "../../../../components/Title";

export default function UbsHome() {
  return (
    <>

      <Title title={"UBS"} subtitle={"Gerencie beneficiários e os status."} />

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

      {/* Botões de Ação */}
      <SubtitleHome>
        Beneficiários
      </SubtitleHome>
      <ContainerActionButton>
        <ActionButton
          title="Lista de beneficiarios ativos"
          description="Veja todos os beneficiarios cadastrados."
          iconClass="fas fa-user-plus"
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
          to={"/ubs/beneficiario/lista"}
        />
      </ContainerActionButton>

      <SubtitleHome>
        Reavaliações
      </SubtitleHome>
      <ContainerActionButton>
        <ActionButton
          title="Reavaliação semestral"
          description="Valide os benefícios dos pacientes, efetuando a reavaliação semestral."
          iconClass="fa fa-users"
          bgColor="bg-pink-600"
          hoverColor="hover:bg-pink-700"
          to={"/ubs/beneficiario/ultima-veriricacao"}
        />
      </ContainerActionButton>

    </>
  );
}
