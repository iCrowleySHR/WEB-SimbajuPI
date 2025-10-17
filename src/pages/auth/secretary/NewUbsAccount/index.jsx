import Title from "../../../../components/Title";
import { useCreateUbs } from "../../../../hook/useCreateUbs";
import UbsAccountForm from "../../../../components/UbsAccountForm";

export default function NewUbsAccount() {

  const { fullName, setFullName, email, setEmail, message, handleSubmit } = useCreateUbs();

  return (
    <>
      <Title
        title={"Cadastrar Conta de UBS"}
        subtitle={"Registre no sistema novas contas responsáveis "}
        back={true}
      />

      <UbsAccountForm
        fullName={fullName} setFullName={setFullName}
        email={email} setEmail={setEmail}
        message={message}
        handleSubmit={handleSubmit}
      />

    </>
  );
}
