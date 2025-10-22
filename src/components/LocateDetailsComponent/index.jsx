import DetailField from "../DetailsField/DetailField";
import { maskCep } from "../../utils/mask";
import formatDate from "../../utils/formatDate";

export default function LocationDetailsComponent({ locate }) {
  if (!locate) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      {/* <DetailField label="ID" value={locate.id} /> */}
      <DetailField label="CEP" value={maskCep(locate.cep)} />
      <DetailField label="Rua" value={`${locate.streetName}, ${locate.numberHouse}`} />
      <DetailField label="Bairro" value={locate.neighborhood} />
      <DetailField label="Cidade" value={locate.city} />
      <DetailField label="Criado em" value={formatDate(locate.created_at)} />
      <DetailField label="Atualizado em" value={formatDate(locate.updated_at)} />
      <DetailField
        label="Apagado em"
        value={locate.deleted_at ? formatDate(locate.deleted_at) : "Não"}
      />
    </div>
  );
}
