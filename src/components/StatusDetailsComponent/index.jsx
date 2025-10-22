import DetailField from "../DetailsField/DetailField";

export default function StatusDetailsComponent({ status }) {
  if (!status) return null; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      {/* <DetailField label="ID" value={status.id} /> */}
      <DetailField label="Status UBS" value={status.ubsStatus} />
      <DetailField
        label="Observação UBS"
        value={status.observationUbs}
      />
      <DetailField
        label="Documento UBS"
        value={
          status.documentationStatusUbs ? (
            <a href={status.documentationStatusUbs} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              Visualizar
            </a>
          ) : (
            "Não disponível"
          )
        }
      />
      <DetailField label="Status Secretaria" value={status.secretaryStatus} />
      <DetailField
        label="Observação Secretaria"
        value={status.observationSecretary}
      />
      <DetailField
        label="Documento Secretaria"
        value={
          status.documentationStatusSecretary ? (
            <a href={status.documentationStatusSecretary} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              Visualizar
            </a>
          ) : (
            "Não disponível"
          )
        }
      />
      <DetailField
        label="Última Verificação"
        value={new Date(status.lastCheck).toLocaleDateString("pt-BR")}
      />
      <DetailField
        label="Criado em"
        value={new Date(status.created_at).toLocaleDateString("pt-BR")}
      />
      <DetailField
        label="Atualizado em"
        value={new Date(status.updated_at).toLocaleDateString("pt-BR")}
      />
      <DetailField
        label="Apagado em"
        value={status.deleted_at ? new Date(status.deleted_at).toLocaleDateString("pt-BR") : "Não"}
      />
    </div>
  );
}
