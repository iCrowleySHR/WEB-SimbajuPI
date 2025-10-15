import React from "react";
import FormBox from "../FormBox";

export default function SecretaryStatusForm({
  secretaryStatus,
  setSecretaryStatus,
  observationSecretary,
  setObservationSecretary,
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
          "Selecione o status da secretaria.",
          "Adicione observações se necessário.",
          "Caso mude o status pra INDEFERIDO, a conta do beneficiário será desativada."
        ],
      }}
      fields={[
        {
          label: "Status Secretaria",
          type: "select",
          value: secretaryStatus,
          onChange: (e) => setSecretaryStatus(e.target.value),
          options: [
            { label: "Deferido", value: "Deferido" },
            { label: "Indeferido", value: "Indeferido" }
          ],
          required: true,
        },
        {
          label: "Observações",
          type: "textarea",
          value: observationSecretary,
          onChange: (e) => setObservationSecretary(e.target.value),
          placeholder: "Digite suas observações aqui...",
        },
      ]}
    />
  );
}
