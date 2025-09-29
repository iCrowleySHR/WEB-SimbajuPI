import DetailField from "./DetailField";

export default function BeneficiaryGrid({ beneficiary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <DetailField label="ID" value={beneficiary.id} />
      <DetailField label="Nome" value={beneficiary.nome} />
      <DetailField label="CPF" value={beneficiary.cpf} />
      <DetailField label="Email" value={beneficiary.email} />
      <DetailField label="CEP" value={beneficiary.cep} />
      <DetailField label="Rua" value={`${beneficiary.ruaLogradouro}, ${beneficiary.numeroCasa}`} />
      <DetailField label="Bairro" value={beneficiary.bairro} />
      <DetailField label="Data de Nascimento" value={new Date(beneficiary.dataNascimento).toLocaleDateString("pt-BR")} />
      <DetailField label="Telefone" value={beneficiary.telefone} />
      <DetailField label="Status UBS" value={beneficiary.statusUbs} />
      <DetailField label="Status Secretaria" value={beneficiary.statusSecretaria} />
      <DetailField label="Tipo de Benefício" value={beneficiary.tipoBeneficio} />
      <DetailField label="Criado em" value={new Date(beneficiary.criadoEm).toLocaleDateString("pt-BR")} />
      <DetailField label="Atualizado em" value={new Date(beneficiary.atualizadoEm).toLocaleDateString("pt-BR")} />
      <DetailField label="Verificado em" value={new Date(beneficiary.verificadoEm).toLocaleDateString("pt-BR")} />
      <DetailField label="Apagado em" value={beneficiary.apagadoEm ? new Date(beneficiary.apagadoEm).toLocaleDateString("pt-BR") : "Não"} />
      <DetailField label="Observação" value={beneficiary.observacao} colSpan={2} />
    </div>
  );
}
