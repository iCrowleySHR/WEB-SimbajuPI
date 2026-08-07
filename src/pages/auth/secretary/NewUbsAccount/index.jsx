import Title from "../../../../components/Title";
import { useCreateUbs } from "../../../../hook/useCreateUbs";
import UbsAccountForm from "../../../../components/UbsAccountForm";

export default function NewUbsAccount() {

const {
  fullName,
  setFullName,
  email,
  setEmail,

  cep,
  setCep,
  streetName,
  setStreetName,
  numberHouse,
  setNumberHouse,
  neighborhood,
  setNeighborhood,
  city,
  setCity,

  handleCepSearch,

  message,
  handleSubmit

} = useCreateUbs();

  return (
    <>
      <Title
        title="Cadastrar Conta de UBS"
        subtitle="Registre no sistema novas contas responsáveis"
        back={true}
      />

<UbsAccountForm
  fullName={fullName}
  setFullName={setFullName}

  email={email}
  setEmail={setEmail}

  cep={cep}
  setCep={setCep}

  streetName={streetName}
  setStreetName={setStreetName}

  numberHouse={numberHouse}
  setNumberHouse={setNumberHouse}

  neighborhood={neighborhood}
  setNeighborhood={setNeighborhood}

  city={city}
  setCity={setCity}

  handleCepSearch={handleCepSearch}

  message={message}
  handleSubmit={handleSubmit}
/>
    </>
  );
}