import FormBox from "../FormBox";
import { sanitizeNumeric, sanitizeLetters } from "../../utils/sanitize";
import { maskCep } from "../../utils/mask";

export default function UbsAccountForm(props) {
  const {
    fullName,
    setFullName,
    email,
    setEmail,

    cep,
    setCep,
    streetName,
    setStreetName,
    numberHouse,
    setNumberHouse,
    neighborhood,
    setNeighborhood,
    city,
    setCity,

    handleCepSearch,

    message,
    handleSubmit,
  } = props;


  return (
    <FormBox
      type="Cadastrar Conta de UBS"
      icon="fas fa-hospital"
      color="blue"
      onSubmit={handleSubmit}
      message={message}
      sections={[
        {
          title: "Dados da UBS",
          fields: [
            {
              label: "Nome da UBS",
              value: fullName,
              onChange: e =>
                setFullName(sanitizeLetters(e.target.value)),
              type: "text",
              placeholder: "Digite o nome da UBS",
            },
            {
              label: "Email",
              value: email,
              onChange: e =>
                setEmail(e.target.value),
              type: "email",
              placeholder: "exemplo@email.com",
            },
          ],
        },
        {
          title: "Endereço",
          fields: [
            {
              label: "CEP",
              value: cep,
              onChange: e => {
                const value = maskCep(e.target.value);
                setCep(value);

                if (value.replace(/\D/g, "").length === 8) {
                  handleCepSearch(value);
                }
              },
              type: "text",
              placeholder: "00000-000",
            },
            {
              label: "Rua",
              value: streetName,
              onChange: e =>
                setStreetName(e.target.value),
              type: "text",
              placeholder: "Nome da rua",
            },
            {
              label: "Número",
              value: numberHouse,
              onChange: e =>
                setNumberHouse(
                  sanitizeNumeric(e.target.value)
                ),
              type: "number",
              placeholder: "123",
            },
            {
              label: "Bairro",
              value: neighborhood,
              onChange: e =>
                setNeighborhood(e.target.value),
              type: "text",
              placeholder: "Bairro",
            },
            {
              label: "Cidade",
              value: city,
              onChange: e =>
                setCity(e.target.value),
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
          "O funcionário deverá alterar a senha no primeiro acesso",
        ],
      }}
    />
  );
}