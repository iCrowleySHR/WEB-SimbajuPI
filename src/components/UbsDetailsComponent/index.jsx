import translate from "../../utils/translate";
import DetailField from "../DetailsField/DetailField";
import CollapsibleSection from "../CollapsibleSection";

export default function UbsDetailsComponent({ ubs, showDetails = false }) {
  return (
    <CollapsibleSection 
      title="Detalhes da UBS Responsável" 
      accent="blue" 
      defaultOpen={showDetails}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        <DetailField 
          label="Nome" 
          value={ubs.user?.name} 
        />

        <DetailField 
          label="Email" 
          value={ubs.user?.email} 
        />

        <DetailField 
          label="Função" 
          value={translate(ubs.user?.role)} 
        />

        <DetailField 
          label="CEP" 
          value={ubs.location?.cep} 
        />

        <DetailField 
          label="Rua" 
          value={ubs.location?.streetName} 
        />

        <DetailField 
          label="Número" 
          value={ubs.location?.numberHouse} 
        />

        <DetailField 
          label="Bairro" 
          value={ubs.location?.neighborhood} 
        />

        <DetailField 
          label="Cidade" 
          value={ubs.location?.city} 
        />

      </div>
    </CollapsibleSection>
  );
}