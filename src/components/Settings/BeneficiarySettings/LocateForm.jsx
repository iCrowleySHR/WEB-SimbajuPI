import React from "react";
import FormBox from "../../FormBox";
import { sanitizeCep, sanitizeNumeric, sanitizeLetters } from "../../../utils/sanitize";
import { maskCep } from "../../../utils/mask";

export default function LocateForm({
  cep, setCep,
  streetName, setStreetName,
  numberHouse, setNumberHouse,
  neighborhood, setNeighborhood,
  city, setCity,
  handleLocateUpdate,
  messageLocate
}) {
  return (
    <FormBox
      type="Atualizar Endereço"
      icon="fas fa-map-marker-alt"
      color="blue"
      onSubmit={handleLocateUpdate}
      message={messageLocate}
      infoBox={{
        title: "Regras para atualização",
        items: [
          "Todos os campos são obrigatórios.",
          "Verifique se o CEP está correto antes de salvar.",
        ],
      }}
      fields={[
        { 
          label: "CEP", 
          type: "text", 
          value: cep, 
          onChange: (e) => setCep(maskCep(e.target.value)), 
          placeholder: "Digite o CEP", 
          required: true 
        },
        { 
          label: "Rua", 
          type: "text", 
          value: streetName, 
          onChange: (e) => setStreetName(sanitizeLetters(e.target.value)), 
          placeholder: "Digite o nome da rua", 
          required: true 
        },
        { 
          label: "Número", 
          type: "text", 
          value: numberHouse, 
          onChange: (e) => setNumberHouse(sanitizeNumeric(e.target.value)), 
          placeholder: "Digite o número da casa", 
          required: true 
        },
        { 
          label: "Bairro", 
          type: "text", 
          value: neighborhood, 
          onChange: (e) => setNeighborhood(sanitizeLetters(e.target.value)), 
          placeholder: "Digite o bairro", 
          required: true 
        },
        { 
          label: "Cidade", 
          type: "text", 
          value: city, 
          onChange: (e) => setCity(sanitizeLetters(e.target.value)), 
          placeholder: "Digite a cidade", 
          required: true 
        },
      ]}
    />
  );
}
