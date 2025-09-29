import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";

export default function CancelWithdrawal() {
  // Apenas uma retirada por vez
  const [withdrawal, setWithdrawal] = useState({
    Data: "2025-09-01",
    Quantidade: "50",
  });

  const handleCancel = () => {
    if (!withdrawal) return;

    if (confirm("Deseja realmente cancelar esta retirada?")) {
      setWithdrawal(null);
      alert("Retirada cancelada com sucesso!");
    }
  };

  return (
    <>
      <Title
        title={"Cancelar Retirada"}
        subtitle={"Cancele a sua retirada."}
        back={true}
      />

      <div className="mt-6">
        {withdrawal ? (
          <>
            <DynamicTable data={[withdrawal]} />
            <button
              onClick={handleCancel}
              className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Cancelar Retirada
            </button>
          </>
        ) : (
          <p className="text-gray-600 text-center mt-4">Nenhuma retirada disponível ou agendada.</p>
        )}
      </div>
    </>
  );
}
