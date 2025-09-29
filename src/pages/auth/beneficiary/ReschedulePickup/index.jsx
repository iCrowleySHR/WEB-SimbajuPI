import { useState, useEffect } from "react";
import Title from "../../../../components/Title";
import FormBox from "../../../../components/FormBox";

export default function ReschedulePickup() {
  const [currentDate, setCurrentDate] = useState("");
  const [newDate, setNewDate] = useState("");

  // Simula puxada de API para data atual
  useEffect(() => {
    const fetchCurrentDate = () => {
      // Simula API retornando a data atual
      const today = new Date();
      const isoDate = today.toISOString().split("T")[0]; // yyyy-mm-dd
      setCurrentDate(isoDate);
      setNewDate(isoDate); // inicializa com a mesma data
    };

    fetchCurrentDate();
  }, []);

  const handleSubmit = () => {
    alert(`Retirada reagendada para: ${newDate}`);
    // Aqui você chamaria a API para salvar a nova data
  };

  return (
    <>
      <Title
        title={"Reagendamento de Retirada"}
        subtitle={"Reagende a sua retirada de fraldas."}
        back={true}
      />

      <FormBox
        type="Reagendar Retirada"
        icon="fas fa-calendar-alt"
        color="blue"
        onSubmit={handleSubmit}
        fields={[
          {
            label: "Data Atual",
            type: "text",
            value: currentDate,
            onChange: () => {},
            placeholder: "",
            required: false,
          },
          {
            label: "Nova Data",
            type: "date",
            value: newDate,
            onChange: (e) => setNewDate(e.target.value),
            required: true,
          },
        ]}
        infoBox={{
          title: "Informações",
          items: [
            "Selecione a data desejada para a retirada.",
            "Você só pode reagendar para datas futuras.",
          ],
        }}
      />
    </>
  );
}
