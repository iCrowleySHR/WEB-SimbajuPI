import React, { useState } from "react";
import FormBox from "../FormBox";

export default function ReportForm(props) {
  const { month, setMonth, year, setYear, type, setType, message, handleSubmit } = props;

  return (
    <FormBox
      type="Gerar Relatório"
      icon="fas fa-file-alt"
      color="green"
      onSubmit={handleSubmit}
      message={message}
      fields={[
        { 
          label: "Mês", 
          value: month, 
          onChange: e => setMonth(e.target.value), 
          type: "number", 
          placeholder: "Digite o mês (1-12)", 
          min: 1,
          max: 12
        },
        { 
          label: "Ano", 
          value: year, 
          onChange: e => setYear(e.target.value), 
          type: "number", 
          placeholder: "Digite o ano", 
          min: 2000,
          max: 2100
        },
        {
          label: "Tipo de Relatório",
          value: type,
          onChange: e => setType(e.target.value),
          type: "select",
          options: [
            { value: "scheduling", label: "Agendamento" },
            { value: "distribution", label: "Distribuição" },
            { value: "withdrawal", label: "Retirada" },
          ],
          placeholder: "Selecione o tipo"
        }
      ]}
      infoBox={{
        title: "Informações do Relatório",
        items: [
          "Escolha o mês e o ano desejado",
          "Selecione o tipo de relatório que deseja gerar",
          "Após enviar, o relatório será processado e disponibilizado para download"
        ]
      }}
    />
  );
}
