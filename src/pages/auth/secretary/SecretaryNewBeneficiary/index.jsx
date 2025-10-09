import { useState } from "react";
import FormBox from "../../../../components/FormBox";
import Title from "../../../../components/Title";
import { createBeneficiary } from "../../../../api/routers/beneficiary";
import getErrorMessage from '../../../../utils/getErrorMessage';
import { useLoading } from "../../../../contexts/LoadingContext";

export default function SecretaryNewBeneficiary() {
  const [nameResponsible, setNameResponsible] = useState(""); // nullable
  const [cpf, setCpf] = useState("");
  const [emailResponsible, setEmailResponsible] = useState(""); // nullable
  const [telephone, setTelephone] = useState("");
  const [telephoneResponsible, setTelephoneResponsible] = useState(""); // nullable
  const [birthDate, setBirthDate] = useState("");
  const [typeBenefit, setTypeBenefit] = useState("Judicial");
  const [prescriptionTimeDays, setPrescriptionTimeDays] = useState("");
  const [prescriptionQuantity, setPrescriptionQuantity] = useState("");
  const [cep, setCep] = useState("");
  const [streetName, setStreetName] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async () => {
    if (!name || !email || !cpf || !telephone || !birthDate || !typeBenefit || !prescriptionTimeDays || !prescriptionQuantity || !cep || !streetName || !numberHouse || !neighborhood || !city) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    const data = {
      nameResponsible: nameResponsible || null,       // nullable
      cpf,
      emailResponsible: emailResponsible || null,     // nullable
      telephone,
      telephoneResponsible: telephoneResponsible || null, // nullable
      birthDate,
      typeBenefit,
      prescriptionTimeDays,
      prescriptionQuantity,
      cep,
      streetName,
      numberHouse,
      neighborhood,
      city,
      name,
      email
    };

    try {
      showLoading();
      await createBeneficiary(data);
      setMessage({ type: "success", text: "Beneficiário cadastrado com sucesso!" });

      // resetar campos
      setNameResponsible("");
      setCpf("");
      setEmailResponsible("");
      setTelephone("");
      setTelephoneResponsible("");
      setBirthDate("");
      setTypeBenefit("Judicial");
      setPrescriptionTimeDays("");
      setPrescriptionQuantity("");
      setCep("");
      setStreetName("");
      setNumberHouse("");
      setNeighborhood("");
      setCity("");
      setName("");
      setEmail("");
      hideLoading();
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: getErrorMessage(error) });
      hideLoading();
    }
  };

  return (
    <>
      <Title title={"Cadastrar Beneficiário"} subtitle={"Registre no sistema novos beneficiários."} back={true}/>

      <FormBox
        type="Cadastrar Beneficiário"
        icon="fas fa-user"
        color="blue"
        fields={[
          // Dados do beneficiário
          { label: "Nome do Beneficiário", value: name, onChange: e => setName(e.target.value), type: "text", placeholder: "Digite o nome do beneficiário" },
          { label: "Email do Beneficiário", value: email, onChange: e => setEmail(e.target.value), type: "email", placeholder: "exemplo@email.com" },

          // Dados do responsável (nullable)
          { label: "Nome Responsável (opcional)", value: nameResponsible, onChange: e => setNameResponsible(e.target.value), type: "text", placeholder: "Digite o nome do responsável", required: false },
          { label: "CPF", value: cpf, onChange: e => setCpf(e.target.value), type: "text", placeholder: "00000000000" },
          { label: "Email Responsável (opcional)", value: emailResponsible, onChange: e => setEmailResponsible(e.target.value), type: "email", placeholder: "exemplo@email.com",   required: false },
          { label: "Telefone", value: telephone, onChange: e => setTelephone(e.target.value), type: "text", placeholder: "11999999999" },
          { label: "Telefone Responsável (opcional)", value: telephoneResponsible, onChange: e => setTelephoneResponsible(e.target.value), type: "text", placeholder: "11999999999",   required: false },

          // Datas e benefício
          { label: "Data de Nascimento", value: birthDate, onChange: e => setBirthDate(e.target.value), type: "date" },
          { label: "Tipo de Benefício", value: typeBenefit, onChange: e => setTypeBenefit(e.target.value), type: "select", options: ["Judicial", "Administrativo"] },
          { label: "Data da Prescrição", value: prescriptionTimeDays, onChange: e => setPrescriptionTimeDays(e.target.value), type: "date" },
          { label: "Quantidade da Prescrição", value: prescriptionQuantity, onChange: e => setPrescriptionQuantity(e.target.value), type: "number", placeholder: "Ex: 120" },

          // Endereço
          { label: "CEP", value: cep, onChange: e => setCep(e.target.value), type: "text", placeholder: "00000000" },
          { label: "Rua", value: streetName, onChange: e => setStreetName(e.target.value), type: "text", placeholder: "Nome da rua" },
          { label: "Número", value: numberHouse, onChange: e => setNumberHouse(e.target.value), type: "number", placeholder: "123" },
          { label: "Bairro", value: neighborhood, onChange: e => setNeighborhood(e.target.value), type: "text", placeholder: "Bairro" },
          { label: "Cidade", value: city, onChange: e => setCity(e.target.value), type: "text", placeholder: "Cidade" },
        ]}
        onSubmit={handleSubmit}
        message={message}
        infoBox={{
          title: "Informações Importantes",
          items: [
            "Uma senha temporária será enviada por e-mail",
            "O paciente deverá alterar a senha no primeiro acesso",
            "Campos opcionais: Nome Responsável, Email Responsável, Telefone Responsável"
          ]
        }}
      />
    </>
  );
}
