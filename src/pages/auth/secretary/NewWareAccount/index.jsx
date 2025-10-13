import Title from "../../../../components/Title";
import { useCreateWarehouse } from "../../../../hook/useCreateWarehouse";
import WarehouseAccountForm from "../../../../components/WarehouseForm";

export default function NewWareAccount() {

const { fullName, setFullName, email, setEmail, message, handleSubmit } = useCreateWarehouse();

  return (
    <>
      <Title
        title={"Cadastrar Conta de Almoxarifado"}
        subtitle={"Registre no sistema novas contas responsáveis pelo agendamento e distribuição de fraldas."}
        back={true}
      />

      <WarehouseAccountForm
        fullName={fullName} setFullName={setFullName}
        email={email} setEmail={setEmail}
        message={message}
        handleSubmit={handleSubmit}
      />

    </>
  );
}
