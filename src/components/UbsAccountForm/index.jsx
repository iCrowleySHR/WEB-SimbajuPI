import FormBox from "../FormBox";

export default function UbsAccountForm(props) {
  const { fullName, setFullName, email, setEmail, message, handleSubmit } = props;

  return (
    <FormBox
      type="Cadastrar Conta de UBS"
      icon="fas fa-hospital"
      color="blue"
      onSubmit={handleSubmit}
      message={message}
      fields={[
        { 
          label: "Nome Completo", 
          value: fullName, 
          onChange: e => setFullName(e.target.value), 
          type: "text", 
          placeholder: "Digite o nome completo" 
        },
        { 
          label: "Email", 
          value: email, 
          onChange: e => setEmail(e.target.value), 
          type: "email", 
          placeholder: "exemplo@email.com" 
        },
      ]}
      infoBox={{
        title: "Informações Importantes",
        items: [
          "Uma senha temporária será enviada por e-mail",
          "O funcionário deverá alterar a senha no primeiro acesso"
        ]
      }}
    />
  );
}
