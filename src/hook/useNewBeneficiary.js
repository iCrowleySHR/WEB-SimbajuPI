import { useState } from "react";
import { createBeneficiary } from "../api/routers/beneficiary";
import getErrorMessage from '../utils/getErrorMessage';
import { useLoading } from "../contexts/LoadingContext";

export function useNewBeneficiary() {
  // Beneficiário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Responsável (opcional)
  const [nameResponsible, setNameResponsible] = useState("");
  const [cpf, setCpf] = useState("");
  const [emailResponsible, setEmailResponsible] = useState("");
  const [telephone, setTelephone] = useState("");
  const [telephoneResponsible, setTelephoneResponsible] = useState("");

  // Datas e benefício
  const [birthDate, setBirthDate] = useState("");
  const [typeBenefit, setTypeBenefit] = useState("Judicial");
  const [prescriptionTimeDays, setPrescriptionTimeDays] = useState("");
  const [prescriptionQuantity, setPrescriptionQuantity] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [streetName, setStreetName] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");

  const [message, setMessage] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  const resetFields = () => {
    setName("");
    setEmail("");
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
  };

  const handleSubmit = async () => {
    if (!name || !email || !cpf || !telephone || !birthDate || !typeBenefit || !prescriptionTimeDays || !prescriptionQuantity || !cep || !streetName || !numberHouse || !neighborhood || !city) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    const data = {
      nameResponsible: nameResponsible || null,
      cpf,
      emailResponsible: emailResponsible || null,
      telephone,
      telephoneResponsible: telephoneResponsible || null,
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
      resetFields();
      hideLoading();
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
      hideLoading();
    }
  };

  return {
    // Beneficiário
    name, setName, email, setEmail,
    // Responsável
    nameResponsible, setNameResponsible,
    cpf, setCpf,
    emailResponsible, setEmailResponsible,
    telephone, setTelephone,
    telephoneResponsible, setTelephoneResponsible,
    // Datas e benefício
    birthDate, setBirthDate,
    typeBenefit, setTypeBenefit,
    prescriptionTimeDays, setPrescriptionTimeDays,
    prescriptionQuantity, setPrescriptionQuantity,
    // Endereço
    cep, setCep,
    streetName, setStreetName,
    numberHouse, setNumberHouse,
    neighborhood, setNeighborhood,
    city, setCity,
    // Outros
    message,
    handleSubmit
  };
}
