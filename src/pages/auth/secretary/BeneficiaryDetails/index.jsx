import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BeneficiaryDetailsComponent from "../../../../components/BeneficiaryDetailsComponent";
import Title from "../../../../components/Title";
import SimpleButton from "../../../../components/SimpleButton";
import SelectField from "../../../../components/SelectField";

export default function BeneficiaryDetails({ id: propId }) {
  const { id: routeId } = useParams();
  const id = propId || routeId;
  const [beneficiary, setBeneficiary] = useState(null);

  useEffect(() => {
    // Mock de beneficiários
    const mockData = [
      {
        id: 1,
        nome: "Maria Silva",
        cpf: "123.456.789-00",
        email: "maria.silva@email.com",
        cep: "12345-678",
        ruaLogradouro: "Rua das Flores",
        numeroCasa: 123,
        bairro: "Centro",
        dataNascimento: "1985-06-15",
        telefone: "11988887777",
        statusUbs: "Ativo",
        statusSecretaria: "Deferido",
        tipoBeneficio: "Administrativo",
        criadoEm: "2024-01-10T00:00:00Z",
        atualizadoEm: "2025-01-01T00:00:00Z",
        verificadoEm: "2024-08-01T00:00:00Z",
        apagadoEm: null,
        observacao: "Nenhuma observação no momento."
      },
    ];

    const found = mockData.find((b) => b.id === parseInt(id));
    setBeneficiary(found || null);
  }, [id]);

  if (!beneficiary) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        Beneficiário não encontrado.
      </div>
    );
  }

  const handleStatusChange = (e) => {
    setBeneficiary((prev) => ({ ...prev, statusSecretaria: e.target.value }));
  };

  const handleVerify = () => {
    setBeneficiary((prev) => ({ ...prev, verificadoEm: new Date().toISOString() }));
  };

  const handleCancelVerification = () => {
    setBeneficiary((prev) => ({ ...prev, verificadoEm: null }));
  };

  return (
    <>
      <Title
        title="Detalhes do Beneficiário"
        subtitle="Informações completas do beneficiário."
        back
      />

      <div className=" mx-auto mt-6 bg-white shadow-lg rounded-xl p-6 space-y-6">


        {/* Seção de ações */}
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Select do status */}
          <SelectField
            label="Status da Secretaria"
            value={beneficiary.statusSecretaria}
            onChange={handleStatusChange}
            options={[
              { value: "Deferido", label: "Deferido" },
              { value: "Indeferido", label: "Indeferido" },
              { value: "Pendente", label: "Pendente" },
            ]}
          />

          {/* Botões de ação */}
          <div className="flex gap-3">
            <SimpleButton color="green" onClick={handleVerify}>Verificar</SimpleButton>
            <SimpleButton color="red" onClick={handleCancelVerification}>Cancelar</SimpleButton>
          </div>

        </div>

        {/* Grid de detalhes */}
        <BeneficiaryDetailsComponent beneficiary={beneficiary} />
      </div>
    </>
  );
}
