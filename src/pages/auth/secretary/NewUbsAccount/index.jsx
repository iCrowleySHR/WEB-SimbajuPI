import { useState } from "react";
import FormBox from "../../../../components/FormBox";
import Title from "../../../../components/Title";

export default function NewUbsAccount() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ubsCode, setUbsCode] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [message, setMessage] = useState(null);

  const handleSubmit = () => {
    if (!fullName || !email || !ubsCode || !phone || !role || !address) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    const data = { fullName, email, ubsCode, phone, role, address, status };
    console.log("Dados da Conta UBS:", data);

    setMessage({ type: "success", text: "Conta de UBS cadastrada com sucesso!" });

    setFullName("");
    setEmail("");
    setUbsCode("");
    setPhone("");
    setRole("");
    setAddress("");
    setStatus("Ativo");
  };

  return (
    <>
      <Title
        title={"Cadastrar UBS"}
        subtitle={"Registre no sistema novas contas de UBS."}
        back={true}
      />

      <FormBox
        type="Cadastrar UBS"
        icon="fas fa-hospital"
        color="blue"
        fields={[
          { label: "Nome Completo", type: "text", value: fullName, onChange: e => setFullName(e.target.value), placeholder: "Digite o nome completo" },
          { label: "Email", type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "exemplo@email.com" },
          { label: "Código da UBS", type: "text", value: ubsCode, onChange: e => setUbsCode(e.target.value), placeholder: "Ex: UBS-123" },
          { label: "Telefone", type: "tel", value: phone, onChange: e => setPhone(e.target.value), placeholder: "(00) 00000-0000" },
          { label: "Função", type: "text", value: role, onChange: e => setRole(e.target.value), placeholder: "Ex: Coordenador" },
          { label: "Endereço", type: "text", value: address, onChange: e => setAddress(e.target.value), placeholder: "Digite o endereço completo" },
          { 
            label: "Status da Conta", 
            type: "select", 
            value: status, 
            onChange: e => setStatus(e.target.value), 
            options: ["Ativo", "Pendente", "Inativo"] 
          },
        ]}
        onSubmit={handleSubmit}
        message={message}
        infoBox={{
          title: "Informações Importantes",
          items: [
            "Uma senha temporária será enviada por e-mail",
            "O responsável deverá alterar a senha no primeiro acesso",
          ]
        }}
      />
    </>
  );
}
