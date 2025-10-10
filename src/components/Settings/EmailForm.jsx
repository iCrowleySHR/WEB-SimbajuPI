import React from "react";
import FormBox from "../FormBox";

export default function EmailForm({ email, setEmail, handleEmailUpdate, messageEmail }) {
  return (
    <FormBox
      type="Atualizar Email"
      icon="fas fa-envelope"
      color="blue"
      onSubmit={handleEmailUpdate}
      message={messageEmail}
      infoBox={{
        title: "Regras para atualização",
        items: ["Email deve ser único no sistema."],
      }}
      fields={[
        {
          label: "Email",
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          placeholder: "Digite seu novo email",
          required: true,
        },
      ]}
    />
  );
}
