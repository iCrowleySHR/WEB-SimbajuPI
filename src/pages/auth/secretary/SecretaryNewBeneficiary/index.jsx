import { useState } from "react";
import FormBox from "../../../../components/FormBox";
import Title from "../../../../components/Title";

export default function SecretaryNewBeneficiary() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Fraldas/mês");
  const [message, setMessage] = useState(null); 

  const handleSubmit = () => {

    if (!name || !cpf || !birthDate || !quantity || !unit) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    const data = { name, cpf, birthDate, status, quantity, unit };
    console.log("Dados do beneficiário:", data);

    setMessage({ type: "success", text: "Beneficiário cadastrado com sucesso!" });


    setName("");
    setCpf("");
    setBirthDate("");
    setStatus("Ativo");
    setQuantity("");
    setUnit("Fraldas/mês");
  };

  return (
    <>
      <Title title={"Cadastrar Beneficiário"} subtitle={"Registre no sistema novos beneficiários."} back={true}/>

      <FormBox
        type="Cadastrar Beneficiário"
        icon="fas fa-user"
        color="blue"
        fields={[
          { label: "Nome", value: name, onChange: e => setName(e.target.value), type: "text", placeholder: "Digite o nome do beneficiário" },
          { label: "CPF", value: cpf, onChange: e => setCpf(e.target.value), type: "text", placeholder: "000.000.000-00" },
          { label: "Data de Nascimento", value: birthDate, onChange: e => setBirthDate(e.target.value), type: "date" },
          { 
            label: "Status do Benefício", 
            value: status, 
            onChange: e => setStatus(e.target.value), 
            type: "select", 
            options: ["Ativo", "Pendente", "Inativo"] 
          },
          { label: "Quantidade", value: quantity, onChange: e => setQuantity(e.target.value), type: "number", placeholder: "Ex: 120" },
          { label: "Unidade", value: unit, onChange: e => setUnit(e.target.value), type: "text", placeholder: "Fraldas/mês" },
        ]}
        onSubmit={handleSubmit}
        message={message} 
        infoBox={{
          title: "Informações Importantes",
          items: [
            "Uma senha temporária será enviada por e-mail",
            "O Paciente deverá alterar a senha no primeiro acesso",
          ]
        }}
      />
    </>
  );
}
