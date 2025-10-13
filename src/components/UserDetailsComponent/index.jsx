import translate from "../../utils/translate";
import DetailField from "../DetailsField/DetailField";

export default function UserDetailsComponent({ user }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailField label="ID" value={user.id} />
            <DetailField label="Nome" value={user.name} />
            <DetailField label="Email" value={user.email} />
            <DetailField label="Função" value={translate(user.role)} />
            <DetailField
                label="Criado em"
                value={new Date(user.created_at).toLocaleDateString("pt-BR")}
            />
            <DetailField
                label="Atualizado em"
                value={new Date(user.updated_at).toLocaleDateString("pt-BR")}
            />
        </div>
    );
}
