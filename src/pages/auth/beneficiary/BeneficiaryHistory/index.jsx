import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";

export default function BeneficiaryHistory() {
  // Dados de exemplo
  const [historyData, setHistoryData] = useState([
    {
      Data: "2025-09-01",
      Quantidade: "50",
      Unidade: "Fraldas/mês",
      "Responsável Entrega": "Maria Oliveira",
      "Responsável Recebimento": "João Silva"
    },
    {
      Data: "2025-08-15",
      Quantidade: "30",
      Unidade: "Fraldas/mês",
      "Responsável Entrega": "Carlos Lima",
      "Responsável Recebimento": "Maria Souza"
    },
    {
      Data: "2025-07-20",
      Quantidade: "40",
      Unidade: "Fraldas/mês",
      "Responsável Entrega": "Ana Santos",
      "Responsável Recebimento": "Carlos Lima"
    }
  ]);

  return (
    <>
      <Title
        title={"Histórico"}
        subtitle={"Consulte todo o seu histórico de retiradas."}
        back={true}
      />

      <div className="mt-6">
        <DynamicTable 
          data={historyData}
        />
      </div>
    </>
  );
}
