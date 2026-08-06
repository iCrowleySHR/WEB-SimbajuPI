import translate from "../../utils/translate";
import DetailField from "../DetailsField/DetailField";
import formatDate from "../../utils/formatDate";
import CollapsibleSection from "../CollapsibleSection";

export default function UbsDetailsComponent({ user, showDetails = false }) {
  return (
    <CollapsibleSection title="Detalhes da UBS Responsável" accent="blue" defaultOpen={showDetails}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DetailField label="Nome"         value={user.name} />
        <DetailField label="Email"        value={user.email} />
        <DetailField label="Função"       value={translate(user.role)} />
        {/* <DetailField label="Criado em"    value={formatDate(user.created_at)} />
        <DetailField label="Atualizado em" value={formatDate(user.updated_at)} /> */}
      </div>
    </CollapsibleSection>
  );
}