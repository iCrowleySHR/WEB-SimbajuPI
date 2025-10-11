import React from "react";
import FormBox from "../../FormBox";
import { sanitizeNumeric, sanitizeLetters } from "../../../utils/sanitize";
import { maskTelephone } from "../../../utils/mask";

export default function ResponsibleForm({
  emailResponsible, setEmailResponsible,
  telephone, setTelephone,
  telephoneResponsible, setTelephoneResponsible,
  nameResponsible, setNameResponsible,
  handleResponsibleUpdate,
  messageResponsible
}) {
  return (
    <FormBox
      type="Atualizar Responsável/Dados de contato"
      icon="fas fa-user"
      color="blue"
      onSubmit={handleResponsibleUpdate}
      message={messageResponsible}
      infoBox={{
        title: "Regras para atualização",
        items: [
          "Todos os campos são obrigatórios.",
          "Verifique se os números de telefone estão corretos.",
          "O email deve ser válido.",
        ],
      }}
      fields={[
        { 
          label: "Nome do Responsável", 
          type: "text", 
          value: nameResponsible, 
          onChange: (e) => setNameResponsible(sanitizeLetters(e.target.value)), 
          placeholder: "Digite o nome do responsável", 
          required: true 
        },
        { 
          label: "Email do Responsável", 
          type: "email", 
          value: emailResponsible, 
          onChange: (e) => setEmailResponsible(e.target.value), 
          placeholder: "Digite o email do responsável", 
          required: true 
        },
        { 
          label: "Telefone (Seu telefone)", 
          type: "text", 
          value: telephone, 
          onChange: (e) => setTelephone(maskTelephone(e.target.value)), 
          placeholder: "Digite o telefone", 
          required: true 
        },
        { 
          label: "Telefone do Responsável", 
          type: "text", 
          value: telephoneResponsible, 
          onChange: (e) => setTelephoneResponsible(maskTelephone(e.target.value)), 
          placeholder: "Digite o telefone do responsável", 
          required: true 
        },
      ]}
    />
  );
}
