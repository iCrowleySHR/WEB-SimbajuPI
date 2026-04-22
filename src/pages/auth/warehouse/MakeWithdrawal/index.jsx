import Title from "../../../../components/Title";
import WithdrawalForm from "../../../../components/WithdrawalForm";
import { useWithdrawalForm } from "../../../../hook/useWithdrawal";

export default function MakeWithdrawal() {
  const form = useWithdrawalForm();

  return (
    <>
      <Title
        title="Registro de Retirada de Pacotes"
        subtitle="Realize o registro da retirada de insumos do paciente."
        back="true"
      />

      <WithdrawalForm {...form} />
    </>
  );
}
