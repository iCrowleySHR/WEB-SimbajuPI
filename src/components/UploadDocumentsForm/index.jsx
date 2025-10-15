import React from "react";
import FormBox from "../FormBox";

export default function UploadDocumentsForm({ files, handleFileChange, handleUploadFiles, messageStatus }) {
  return (
    <FormBox
      type="Enviar Documentos"
      icon="fas fa-upload"
      color="yellow"
      onSubmit={handleUploadFiles}
      message={messageStatus}
      infoBox={{
        title: "Envio de Documentos",
        items: [
          "Selecione os arquivos que deseja enviar.",
          "Clique em 'Enviar' para subir os documentos.",
        ],
      }}
      fields={[
        {
          label: "Documentos",
          type: "file",
          multiple: true,
          onChange: handleFileChange,
        },
      ]}
    />
  );
}
