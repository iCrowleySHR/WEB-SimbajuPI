import React, { useState, useEffect } from "react";
import FormBox from "../FormBox";

export default function BusinessHoursForm({ schedule = [], updateConfig, message, selectedDayId, setSelectedDayId }) {
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!selectedDayId) return;
    const day = schedule.find((d) => d.id === parseInt(selectedDayId));
    if (day) {
      setOpenTime(day.openTime);
      setCloseTime(day.closeTime);
      setIsActive(day.isActive);
    }
  }, [selectedDayId, schedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDayId) return;

    updateConfig(selectedDayId, { openTime, closeTime, isActive });
  };

  return (
    <FormBox
      type="Salvar Configuração"
      icon="fas fa-clock"
      color="blue"
      onSubmit={handleSubmit}
      message={message}
      infoBox={{
        title: "Instruções",
        items: [
          "Selecione o dia que deseja alterar.",
          "Edite o horário de abertura e fechamento.",
          "Ative o dia se a unidade funciona nesse período.",
          "Clique em 'Salvar Configuração' para aplicar."
        ],
      }}
      fields={[
        {
          label: "Dia da Semana",
          type: "select",
          value: selectedDayId || "",
          onChange: (e) => setSelectedDayId(e.target.value),
          options: schedule.map((d) => ({ value: d.id, label: d.dayWeek })),
          placeholder: "Selecione o dia",
          required: true,
        },
        selectedDayId && {
          label: "Horário de Abertura",
          type: "time",
          value: openTime,
          onChange: (e) => setOpenTime(e.target.value),
          required: true,
        },
        selectedDayId && {
          label: "Horário de Fechamento",
          type: "time",
          value: closeTime,
          onChange: (e) => setCloseTime(e.target.value),
          required: true,
        },
        selectedDayId && {
          label: "Ativo",
          type: "checkbox",
          checked: isActive,
          onChange: (e) => setIsActive(e.target.checked),
        },
      ].filter(Boolean)}
    />
  );
}
