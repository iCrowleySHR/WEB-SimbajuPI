import { useState } from "react";
import FormBox from "../../../../components/FormBox";
import Title from "../../../../components/Title";

export default function NewWareAccount() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registryCode, setRegistryCode] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [message, setMessage] = useState(null);

  const handleSubmit = () => {
    if (!fullName || !email || !phone || !registryCode) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    const data = { fullName, email, phone, registryCode, status };
    console.log("Dados da Conta de Almoxarifado:", data);

    setMessage({ type: "success", text: "Conta de almoxarifado cadastrada com sucesso!" });

    // Resetar formulário
    setFullName("");
    setEmail("");
    setPhone("");
    setRegistryCode("");
    setStatus("Ativo");
  };

  return (
    <>
      <Title
        title={"Cadastrar Conta de Almoxarifado"}
        subtitle={"Registre no sistema novas contas responsáveis pelo agendamento e distribuição de fraldas."}
        back={true}
      />

      <FormBox
        type="Cadastrar Conta"
        icon="fas fa-warehouse"
        color="blue"
        fields={[
          { label: "Nome Completo", type: "text", value: fullName, onChange: e => setFullName(e.target.value), placeholder: "Digite o nome completo" },
          { label: "Email", type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "exemplo@email.com" },
          { label: "Número", type: "tel", value: phone, onChange: e => setPhone(e.target.value), placeholder: "(00) 00000-0000" },
          { label: "Código de Registro", type: "text", value: registryCode, onChange: e => setRegistryCode(e.target.value), placeholder: "Ex: REG-001" },
        ]}
        onSubmit={handleSubmit}
        message={message}
        infoBox={{
          title: "Informações Importantes",
          items: [
            "Uma senha temporária será enviada por e-mail",
            "O funcionário deverá alterar a senha no primeiro acesso",
          ]
        }}
      />

    </>
  );
}
