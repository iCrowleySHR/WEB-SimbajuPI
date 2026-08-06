import React from "react";
import FormBox from "../FormBox";
import { sanitizeCep, sanitizeCpf, sanitizeNumeric, sanitizeLetters } from "../../utils/sanitize";
import { maskCep, maskCpf, maskTelephone } from "../../utils/mask";

export default function CreateBeneficiaryForm(props) {
  const {
    name, setName,
    email, setEmail,
    nameResponsible, setNameResponsible,
    cpf, setCpf,
    emailResponsible, setEmailResponsible,
    telephone, setTelephone,
    telephoneResponsible, setTelephoneResponsible,
    birthDate, setBirthDate,
    typeBenefit, setTypeBenefit,
    prescriptionTimeDays, setPrescriptionTimeDays,
    prescriptionQuantity, setPrescriptionQuantity,
    cep, setCep,
    streetName, setStreetName,
    numberHouse, setNumberHouse,
    neighborhood, setNeighborhood,
    city, setCity,
    message,
    handleSubmit,
    ubsId,
    setUbsId,
    ubsList
  } = props;

  return (
    <FormBox
      type="Cadastrar Beneficiário"
      icon="fas fa-user"
      color="blue"
      onSubmit={handleSubmit}
      message={message}
      sections={[
        {
          title: "Dados do Beneficiário",
          fields: [
            {
              label: "Nome do Beneficiário",
              value: name,
              onChange: e => setName(sanitizeLetters(e.target.value)),
              type: "text",
              placeholder: "Digite o nome do beneficiário",
            },
            {
              label: "Email do Beneficiário",
              value: email,
              onChange: e => setEmail(e.target.value),
              type: "email",
              placeholder: "exemplo@email.com",
            },
            {
              label: "CPF",
              value: cpf,
              onChange: e => setCpf(maskCpf(e.target.value)),
              type: "text",
              placeholder: "000.000.000-00",
            },
            {
              label: "Telefone",
              value: telephone,
              onChange: e => setTelephone(maskTelephone(e.target.value)),
              type: "text",
              placeholder: "11999999999",
            },
            {
              label: "Data de Nascimento",
              value: birthDate,
              onChange: e => setBirthDate(e.target.value),
              type: "date",
            },
          ],
        },
        {
          title: "Responsável (opcional)",
          description: "Preencha caso o beneficiário possua um responsável.",
          fields: [
            {
              label: "Nome Responsável",
              value: nameResponsible,
              onChange: e => setNameResponsible(sanitizeLetters(e.target.value)),
              type: "text",
              placeholder: "Digite o nome do responsável",
              required: false,
            },
            {
              label: "Email Responsável",
              value: emailResponsible,
              onChange: e => setEmailResponsible(e.target.value),
              type: "email",
              placeholder: "exemplo@email.com",
              required: false,
            },
            {
              label: "Telefone Responsável",
              value: telephoneResponsible,
              onChange: e => setTelephoneResponsible(maskTelephone(e.target.value)),
              type: "text",
              placeholder: "11999999999",
              required: false,
            },
          ],
        },
        {
          title: "Prescrição",
          fields: [
            {
              label: "Tipo de Benefício",
              value: typeBenefit,
              onChange: e => setTypeBenefit(e.target.value),
              type: "select",
              options: [
                { label: "Judicial", value: "Judicial" },
                { label: "Administrativo", value: "Administrativo" },
              ],
            },
            ...(typeBenefit === "Administrativo"
              ? [
                {
                  label: "UBS",
                  value: ubsId,
                  onChange: e => setUbsId(e.target.value),
                  type: "select",
                  options: ubsList.map(ubs => ({
                    label: ubs.name,
                    value: ubs.id
                  }))
                }
              ]
              : []),
            {
              label: "Data da Prescrição",
              value: prescriptionTimeDays,
              onChange: e => setPrescriptionTimeDays(e.target.value),
              type: "date",
            },
            {
              label: "Quantidade da Prescrição",
              value: prescriptionQuantity,
              onChange: e => setPrescriptionQuantity(sanitizeNumeric(e.target.value)),
              type: "number",
              placeholder: "Ex: 120",
            },
          ],
        },
        {
          title: "Endereço",
          fields: [
            {
              label: "CEP",
              value: cep,
              onChange: e => setCep(maskCep(e.target.value)),
              type: "text",
              placeholder: "00000-000",
            },
            {
              label: "Rua",
              value: streetName,
              onChange: e => setStreetName(e.target.value),
              type: "text",
              placeholder: "Nome da rua",
            },
            {
              label: "Número",
              value: numberHouse,
              onChange: e => setNumberHouse(sanitizeNumeric(e.target.value)),
              type: "number",
              placeholder: "123",
            },
            {
              label: "Bairro",
              value: neighborhood,
              onChange: e => setNeighborhood(e.target.value),
              type: "text",
              placeholder: "Bairro",
            },
            {
              label: "Cidade",
              value: city,
              onChange: e => setCity(e.target.value),
              type: "text",
              placeholder: "Cidade",
            },
          ],
        },
      ]}
      infoBox={{
        title: "Informações Importantes",
        items: [
          "Uma senha temporária será enviada por e-mail",
          "O paciente deverá alterar a senha no primeiro acesso",
          "Campos opcionais: Nome Responsável, Email Responsável, Telefone Responsável",
        ],
      }}
    />
  );
}