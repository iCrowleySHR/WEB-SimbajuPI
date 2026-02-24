import FormBox from "../FormBox";
import { maskCpf } from "../../utils/mask";

export default function WithdrawalForm({
  schedulings,
  selectedSchedulingId,
  setSelectedSchedulingId,
  brand,
  setBrand,
  typeDiaper,
  setTypeDiaper,
  quantityDiapers,
  setQuantityDiapers,
  quantityPackage,
  setQuantityPackage,
  responsibleWithdrawal,
  setResponsibleWithdrawal,
  message,
  handleSubmit,
}) {
  const selectedScheduling = schedulings.find(
    (s) => String(s.id) === String(selectedSchedulingId)
  );

  const fields = [
    {
      label: "Agendamento do dia",
      type: "autocomplete",
      value: selectedSchedulingId,
      onChange: setSelectedSchedulingId,
      placeholder: "Pesquisar agendamento...",
      options: schedulings.map((s) => ({
        value: s.id,
        label: `${s.beneficiary?.user?.name || "Sem nome"} - ${s.dateTime} - CPF: ${maskCpf(
          s.beneficiary?.cpf || ""
        )}`,
      })),
      noResultsText: "Nenhum agendamento encontrado",
      initialLabel: selectedScheduling
        ? `${selectedScheduling.beneficiary?.user?.name || "Sem nome"} - ${selectedScheduling.dateTime}`
        : "",
    },
    {
      label: "Marca",
      value: brand,
      onChange: (e) => setBrand(e.target.value),
      type: "text",
      placeholder: "Digite a marca",
    },
    {
      label: "Tipo de Fralda",
      value: typeDiaper,
      onChange: (e) => setTypeDiaper(e.target.value),
      type: "select",
      options: [
        { value: "P", label: "P" },
        { value: "M", label: "M" },
        { value: "G", label: "G" },
        { value: "XG", label: "XG" },
      ],
    },
    {
      label: "Quantidade de Fraldas",
      value: quantityDiapers,
      onChange: (e) => setQuantityDiapers(e.target.value),
      type: "number",
      placeholder: "Digite a quantidade",
    },
    {
      label: "Quantidade de Pacotes",
      value: quantityPackage,
      onChange: (e) => setQuantityPackage(e.target.value),
      type: "number",
      placeholder: "Digite a quantidade de pacotes",
    },
    {
      label: "Responsável pela Retirada",
      value: responsibleWithdrawal,
      onChange: (e) => setResponsibleWithdrawal(e.target.value),
      type: "text",
      placeholder: "Nome do responsável",
    },
  ];

  return (
    <FormBox
      type="Registrar Retirada dos Pacotes"
      icon="fas fa-hand-holding"
      color="green"
      onSubmit={handleSubmit}
      fields={fields}
      message={message}
      infoBox={{
        title: "Instruções",
        items: [
          "Selecione um agendamento do dia para registrar a retirada.",
          "O horário da retirada é registrado automaticamente.",
          "Preencha todos os campos obrigatórios antes de confirmar.",
        ],
      }}
    />
  );
}
