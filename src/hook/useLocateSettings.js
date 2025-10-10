import { useEffect, useState } from "react";
import { getMyLocate, updateLocate } from "../api/routers/locate";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { getAddressByCep } from "../utils/cepUtils";
import { sanitizeCep } from "../utils/sanitize";
import { maskCep } from "../utils/mask";

export function useLocateSettings() {
  const [cepState, setCepState] = useState("");
  const [streetName, setStreetName] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [messageLocate, setMessageLocate] = useState("");

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    async function fetchLocation() {
      showLoading();
      try {
        const data = await getMyLocate();
        setCepState(maskCep(data.cep) ?? "");
        setStreetName(data.streetName ?? "");
        setNumberHouse(data.numberHouse != null ? String(data.numberHouse) : "");
        setNeighborhood(data.neighborhood ?? "");
        setCity(data.city ?? "");
      } catch (error) {
        setMessageLocate({ type: "error", text: getErrorMessage(error) });
      } finally {
        hideLoading();
      }
    }
    fetchLocation();
  }, []);


  const handleLocateUpdate = async () => {
    showLoading();
    try {
      await updateLocate({
        cep: sanitizeCep(cepState),
        streetName,
        numberHouse: Number(numberHouse),
        neighborhood,
        city,
      });
      setMessageLocate({ type: "success", text: "Localização atualizada com sucesso!" });
    } catch (error) {
      setMessageLocate({ type: "error", text: getErrorMessage(error) });
    } finally {
      hideLoading();
    }
  };

  const setCep = async (value) => {
    setCepState(value);
    const address = await getAddressByCep(value);
    if (address) {
      setStreetName(address.streetName ?? "");
      setNeighborhood(address.neighborhood ?? "");
      setCity(address.city ?? "");
    }
  };

  return {
    cep: cepState, setCep,
    streetName, setStreetName,
    numberHouse, setNumberHouse,
    neighborhood, setNeighborhood,
    city, setCity,
    messageLocate,
    handleLocateUpdate,
  };
}
