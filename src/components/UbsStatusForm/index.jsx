import React from "react";
import FormBox from "../FormBox";

export default function UbsStatusForm({
  ubsStatus,
  setUbsStatus,
  observationUbs,
  setObservationUbs,
  files,
  setFiles,
  handleStatusUpdate,
  messageStatus
}) {    
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <FormBox
      type="Atualizar Status Secretaria"
      icon="fas fa-file-alt"
      color="blue"
      onSubmit={handleStatusUpdate}
      message={messageStatus}
      infoBox={{
        title: "Informações para atualização",
        items: [
          "Selecione o status da Ubs.",
          "Adicione observações, são obrigatórios.",
          "Um email será enviado ao beneficiado sinalizando a mundaça de status."
        ],
      }}
      fields={[
        {
          label: "Status Ubs",
          type: "select",
          value: ubsStatus,
          onChange: (e) => setUbsStatus(e.target.value),
          options: [
            { label: "Ativado", value: "Ativado" },
            { label: "Desativado", value: "Desativado" },
            { label: "Mudou de Municipio", value: "Mudou de Municipio" },
            { label: "Foi a Óbito", value: "Foi a Óbito" },
            { label: "Outro", value: "Outro" }
          ],
          required: true,
        },
        {
          label: "Observações",
          type: "textarea",
          value: observationUbs,
          onChange: (e) => setObservationUbs(e.target.value),
          placeholder: "Digite suas observações aqui...",
        },
      ]}
    />
  );
}
