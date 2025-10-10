import Title from "../../../../components/Title";
import CreateBeneficiaryForm from "../../../../components/CreateBeneficiaryForm";
import { useNewBeneficiary } from "../../../../hook/useNewBeneficiary";

export default function NewBeneficiaryAccount() {
  const formHook = useNewBeneficiary();

  return (
    <>
      <Title
        title="Cadastrar Beneficiário"
        subtitle="Registre no sistema novos beneficiários."
        back={true}
      />
      <CreateBeneficiaryForm {...formHook} />
    </>
  );
}
