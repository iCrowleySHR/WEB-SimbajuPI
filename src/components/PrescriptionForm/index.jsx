import React from "react";
import FormBox from "../FormBox";

export default function PrescriptionForm({
  typeBenefit,
  setTypeBenefit,
  prescriptionTimeDays,
  setPrescriptionTimeDays,
  prescriptionQuantity,
  setPrescriptionQuantity,
  handlePrescriptionUpdate,
  messagePrescription,
}) {
  return (
    <FormBox
      type="Atualizar Prescrição"
      icon="fas fa-notes-medical"
      color="green"
      onSubmit={handlePrescriptionUpdate}
      message={messagePrescription}
      infoBox={{
        title: "Regras para atualização",
        items: [
          "O tipo de benefício deve ser 'Judicial' ou 'Administrativo'.",
          "O tempo de prescrição deve ser uma data válida.",
          "A quantidade de prescrição deve ser um número inteiro maior que 0.",
        ],
      }}
      fields={[
        {
          label: "Tipo de Benefício",
          type: "select",
          value: typeBenefit,
          onChange: (e) => setTypeBenefit(e.target.value),
          options: ["Judicial", "Administrativo"],
          placeholder: "Selecione o tipo de benefício",
          required: true,
        },
        {
          label: "Tempo de Prescrição (Dias)",
          type: "date",
          value: prescriptionTimeDays,
          onChange: (e) => setPrescriptionTimeDays(e.target.value),
        },
        {
          label: "Quantidade de Prescrição",
          type: "number",
          value: prescriptionQuantity,
          onChange: (e) => setPrescriptionQuantity(e.target.value),
          min: 1,
        },
      ]}
    />
  );
}
