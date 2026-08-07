import { useState } from "react";
import { createUbs } from "../api/routers/ubs";
import { getAddressByCep } from "../utils/cepUtils";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";


export function useCreateUbs() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [cep, setCep] = useState("");
  const [streetName, setStreetName] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");

  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();


  async function handleCepSearch(value) {

    const address = await getAddressByCep(value);

    if (!address) {
      return;
    }

    setStreetName(address.streetName);
    setNeighborhood(address.neighborhood);
    setCity(address.city);
  }


  async function handleSubmit() {

    if (
      !fullName ||
      !email ||
      !cep ||
      !streetName ||
      !numberHouse ||
      !neighborhood ||
      !city
    ) {
      setMessage({
        type: "error",
        text: "Preencha todos os campos obrigatórios."
      });
      return;
    }


    showLoading();
    setMessage(null);


    try {

      await createUbs({
        name: fullName,
        email,
        cep: cep.replace(/\D/g, ""),
        streetName,
        numberHouse,
        neighborhood,
        city,
      });


      setMessage({
        type:"success",
        text:"Conta de UBS cadastrada com sucesso!"
      });


      setFullName("");
      setEmail("");
      setCep("");
      setStreetName("");
      setNumberHouse("");
      setNeighborhood("");
      setCity("");

    } catch(error) {

      setMessage({
        type:"error",
        text:getErrorMessage(error)
      });

    } finally {

      hideLoading();

    }
  }


  return {

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
    handleSubmit
  };
}