import FormBox from "../FormBox";
import { sanitizeCep, sanitizeCpf, sanitizeNumeric } from "../../utils/sanitize";

export default function BeneficiaryForm(props) {
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
    handleSubmit
  } = props;

  return (
    <FormBox
      type="Cadastrar Beneficiário"
      icon="fas fa-user"
      color="blue"
      onSubmit={handleSubmit}
      message={message}
      fields={[
        { label: "Nome do Beneficiário", value: name, onChange: e => setName(e.target.value), type: "text", placeholder: "Digite o nome do beneficiário" },
        { label: "Email do Beneficiário", value: email, onChange: e => setEmail(e.target.value), type: "email", placeholder: "exemplo@email.com" },
        { label: "Nome Responsável (opcional)", value: nameResponsible, onChange: e => setNameResponsible(e.target.value), type: "text", placeholder: "Digite o nome do responsável", required: false },
        { label: "CPF", value: cpf, onChange: e => setCpf(sanitizeCpf(e.target.value)), type: "text", placeholder: "00000000000" },
        { label: "Email Responsável (opcional)", value: emailResponsible, onChange: e => setEmailResponsible(e.target.value), type: "email", placeholder: "exemplo@email.com", required: false },
        { label: "Telefone", value: telephone, onChange: e => setTelephone(sanitizeNumeric(e.target.value)), type: "text", placeholder: "11999999999" },
        { label: "Telefone Responsável (opcional)", value: telephoneResponsible, onChange: e => setTelephoneResponsible(sanitizeNumeric(e.target.value)), type: "text", placeholder: "11999999999", required: false },
        { label: "Data de Nascimento", value: birthDate, onChange: e => setBirthDate(e.target.value), type: "date" },
        { label: "Tipo de Benefício", value: typeBenefit, onChange: e => setTypeBenefit(e.target.value), type: "select", options: ["Judicial", "Administrativo"] },
        { label: "Data da Prescrição", value: prescriptionTimeDays, onChange: e => setPrescriptionTimeDays(e.target.value), type: "date" },
        { label: "Quantidade da Prescrição", value: prescriptionQuantity, onChange: e => setPrescriptionQuantity(sanitizeNumeric(e.target.value)), type: "number", placeholder: "Ex: 120" },
        { label: "CEP", value: cep, onChange: e => setCep(sanitizeCep(e.target.value)), type: "text", placeholder: "00000000" },
        { label: "Rua", value: streetName, onChange: e => setStreetName(e.target.value), type: "text", placeholder: "Nome da rua" },
        { label: "Número", value: numberHouse, onChange: e => setNumberHouse(sanitizeNumeric(e.target.value)), type: "number", placeholder: "123" },
        { label: "Bairro", value: neighborhood, onChange: e => setNeighborhood(e.target.value), type: "text", placeholder: "Bairro" },
        { label: "Cidade", value: city, onChange: e => setCity(e.target.value), type: "text", placeholder: "Cidade" },
      ]}
      infoBox={{
        title: "Informações Importantes",
        items: [
          "Uma senha temporária será enviada por e-mail",
          "O paciente deverá alterar a senha no primeiro acesso",
          "Campos opcionais: Nome Responsável, Email Responsável, Telefone Responsável"
        ]
      }}
    />
  );
}
