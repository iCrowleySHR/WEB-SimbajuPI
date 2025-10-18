import Title from "../../../../components/Title";
import WithdrawalForm from "../../../../components/WithdrawalForm";
import { useWithdrawalForm } from "../../../../hook/useWithdrawal";

export default function MakeWithdrawal() {
  const form = useWithdrawalForm();

  return (
    <>
      <Title
        title="Registrar Retirada"
        subtitle="Registrar retirada de insumos do paciente."
        back="true"
      />

      <WithdrawalForm {...form} />
    </>
  );
}
