import DetailField from "../DetailsField/DetailField";
import { maskCep } from "../../utils/mask";
import formatDate from "../../utils/formatDate";
import CollapsibleSection from "../CollapsibleSection";

export default function LocationDetailsComponent({ locate, showDetails = false }) {
  if (!locate) return null;
  return (
    <CollapsibleSection title="Detalhes de Localização" accent="blue" defaultOpen={showDetails}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DetailField label="CEP"          value={maskCep(locate.cep)} />
        <DetailField label="Rua"          value={`${locate.streetName}, ${locate.numberHouse}`} />
        <DetailField label="Bairro"       value={locate.neighborhood} />
        <DetailField label="Cidade"       value={locate.city} />
        <DetailField label="Criado em"    value={formatDate(locate.created_at)} />
        <DetailField label="Atualizado em" value={formatDate(locate.updated_at)} />
        <DetailField label="Apagado em"   value={locate.deleted_at ? formatDate(locate.deleted_at) : "Não"} />
      </div>
    </CollapsibleSection>
  );
}