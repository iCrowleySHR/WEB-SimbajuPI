import { useState, useEffect } from "react";
import { createBeneficiary } from "../api/routers/beneficiary";
import { getAllUbs } from "../api/routers/user";
import getErrorMessage from '../utils/getErrorMessage';
import { useLoading } from "../contexts/LoadingContext";
import { getAddressByCep } from "../utils/cepUtils";
import { sanitizeCep, sanitizeCpf, sanitizeNumeric } from "../utils/sanitize";

export function useNewBeneficiary() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameResponsible, setNameResponsible] = useState("");
  const [cpf, setCpf] = useState("");
  const [emailResponsible, setEmailResponsible] = useState("");
  const [telephone, setTelephone] = useState("");
  const [telephoneResponsible, setTelephoneResponsible] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [typeBenefit, setTypeBenefit] = useState("Judicial");
  const [prescriptionTimeDays, setPrescriptionTimeDays] = useState("");
  const [prescriptionQuantity, setPrescriptionQuantity] = useState("");
  const [cep, setCepState] = useState("");
  const [streetName, setStreetName] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState(null);
  const [ubsId, setUbsId] = useState("");
  const [ubsList, setUbsList] = useState([]);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const loadUbs = async () => {
      try {
        const response = await getAllUbs();
        setUbsList(response.data);
      } catch (error) {
        console.error("Erro ao buscar UBS", error);
      }
    };

    loadUbs();
  }, []);

  const resetFields = () => {
    setName(""); setEmail(""); setNameResponsible(""); setCpf(""); setEmailResponsible("");
    setTelephone(""); setTelephoneResponsible(""); setBirthDate(""); setTypeBenefit("Judicial"); setUbsId("");
    setPrescriptionTimeDays(""); setPrescriptionQuantity(""); setCepState("");
    setStreetName(""); setNumberHouse(""); setNeighborhood(""); setCity("");
  };

  const handleSubmit = async () => {
    if (!name || !email || !cpf || !telephone || !birthDate || !typeBenefit || !prescriptionTimeDays || !prescriptionQuantity || !cep || !streetName || !numberHouse || !neighborhood || !city) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }
    if (
      typeBenefit === "Administrativo" &&
      !ubsId
    ) {
      setMessage({
        type: "error",
        text: "Selecione a UBS responsável pelo beneficiário."
      });
      return;
    }
    const data = {
      nameResponsible: nameResponsible || null, cpf: sanitizeCpf(cpf), emailResponsible: emailResponsible || null,
      telephone: sanitizeNumeric(telephone), telephoneResponsible: sanitizeNumeric(telephoneResponsible) || null, birthDate, typeBenefit,
      prescriptionTimeDays, prescriptionQuantity, cep: sanitizeCep(cep), streetName, numberHouse, neighborhood, city, name, email, ubsId: typeBenefit === "Administrativo" ? ubsId : null
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

  const setCep = async (value) => {
    setCepState(value);
    const address = await getAddressByCep(value);
    if (address) {
      setStreetName(address.streetName);
      setNeighborhood(address.neighborhood);
      setCity(address.city);
    }
  };

  return {
    name, setName, email, setEmail, nameResponsible, setNameResponsible,
    cpf, setCpf, emailResponsible, setEmailResponsible, telephone, setTelephone,
    telephoneResponsible, setTelephoneResponsible, birthDate, setBirthDate, typeBenefit, setTypeBenefit,
    prescriptionTimeDays, setPrescriptionTimeDays, prescriptionQuantity, setPrescriptionQuantity,
    cep, setCep, streetName, setStreetName, numberHouse, setNumberHouse,
    neighborhood, setNeighborhood, city, setCity,
    message, handleSubmit, ubsId,
    setUbsId,
    ubsList
  };
}
