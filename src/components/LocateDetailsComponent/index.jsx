import DetailField from "../DetailsField/DetailField";
import { maskCep } from "../../utils/mask";

export default function LocationDetailsComponent({ locate }) {
  if (!locate) return null; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <DetailField label="ID" value={locate.id} />
      <DetailField label="CEP" value={maskCep(locate.cep)} />
      <DetailField label="Rua" value={`${locate.streetName}, ${locate.numberHouse}`} />
      <DetailField label="Bairro" value={locate.neighborhood} />
      <DetailField label="Cidade" value={locate.city} />
      <DetailField
        label="Criado em"
        value={new Date(locate.created_at).toLocaleDateString("pt-BR")}
      />
      <DetailField
        label="Atualizado em"
        value={new Date(locate.updated_at).toLocaleDateString("pt-BR")}
      />
      <DetailField
        label="Apagado em"
        value={locate.deleted_at ? new Date(locate.deleted_at).toLocaleDateString("pt-BR") : "Não"}
      />
    </div>
  );
}
