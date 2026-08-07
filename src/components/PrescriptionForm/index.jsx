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
  ubsId,
  setUbsId,
  ubsUsers,
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
          "No momento que você altera de Administrativo para Judicial, o Beneficiário perde o relacionamento com a UBS",
          "A quantidade de prescrição deve ser um número inteiro maior que 0.",
        ],
      }}
      fields={[
        {
          label: "Tipo de Benefício",
          type: "select",
          value: typeBenefit,
          onChange: (e) => setTypeBenefit(e.target.value),
          options: [
            { label: "Judicial", value: "Judicial" },
            { label: "Administrativo", value: "Administrativo" },
          ],
          placeholder: "Selecione o tipo de benefício",
          required: true,
        },
        {
          label: "Validade da Prescrição",
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
        ...(typeBenefit === "Administrativo"
          ? [
            {
              label: "UBS Responsável",
              type: "select",
              value: ubsId,
              onChange: (e) => setUbsId(e.target.value),
              options: ubsUsers.map((ubs) => ({
                label: ubs.name,
                value: ubs.id
              })),
              options: ubsUsers.map((ubs) => ({
                  label: ubs.name,
                  value: String(ubs.id)
              })),
              required: true,
            }
          ]
          : []
        ),
      ]}
    />
  );
}
