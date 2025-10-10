import React from "react";
import FormBox from "../FormBox";

export default function PasswordForm({
  currentPassword, setCurrentPassword,
  password, setPassword,
  passwordConfirmation, setPasswordConfirmation,
  handlePasswordUpdate, messagePassword
}) {
  return (
    <FormBox
      type="Alterar Senha"
      icon="fas fa-lock"
      color="blue"
      onSubmit={handlePasswordUpdate}
      message={messagePassword}
      infoBox={{
        title: "Regras para atualização",
        items: [
          "Senha atual é obrigatória.",
          "Nova senha deve ser confirmada.",
        ],
      }}
      fields={[
        {
          label: "Senha Atual",
          type: "password",
          value: currentPassword,
          onChange: (e) => setCurrentPassword(e.target.value),
          placeholder: "Digite sua senha atual",
          required: true,
        },
        {
          label: "Nova Senha",
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          placeholder: "Digite a nova senha",
          required: true,
        },
        {
          label: "Confirmar Nova Senha",
          type: "password",
          value: passwordConfirmation,
          onChange: (e) => setPasswordConfirmation(e.target.value),
          placeholder: "Confirme a nova senha",
          required: true,
        },
      ]}
    />
  );
}
