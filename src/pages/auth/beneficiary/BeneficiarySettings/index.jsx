import { useState } from "react";
import Title from "../../../../components/Title";
import { useUser } from "../../../../contexts/UserContext";
import { useUserSettings } from "../../../../hook/useUserSettings";
import UserInfo from "../../../../components/Settings/UserInfo";
import EmailForm from "../../../../components/Settings/EmailForm";
import PasswordForm from "../../../../components/Settings/PasswordForm";
import LocateForm from "../../../../components/Settings/BeneficiarySettings/LocateForm";
import { useLocateSettings } from "../../../../hook/useLocateSettings";
import ResponsibleForm from "../../../../components/Settings/BeneficiarySettings/ResponsibleForm";
import { useResponsibleSettings } from "../../../../hook/useResponsibleSettings";

export default function BeneficiarySettings() {
  const { user } = useUser();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const {
    email, setEmail,
    currentPassword, setCurrentPassword,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    messageEmail, messagePassword,
    handleEmailUpdate, handlePasswordUpdate
  } = useUserSettings(user?.email);

  const {
    cep, setCep,
    streetName, setStreetName,
    numberHouse, setNumberHouse,
    neighborhood, setNeighborhood,
    city, setCity,
    messageLocate,
    handleLocateUpdate
  } = useLocateSettings(user?.id);

  const {
    nameResponsible,
    setNameResponsible,
    emailResponsible,
    setEmailResponsible,
    telephone,
    setTelephone,
    telephoneResponsible,
    setTelephoneResponsible,
    messageResponsible,
    handleResponsibleUpdate,
  } = useResponsibleSettings(user?.id);

  return (
    <>
      <Title
        title={"Configurações"}
        subtitle={"Veja todas as informações da sua conta."}
        back={true}
      />

      <UserInfo user={user} />

      <EmailForm
        email={email}
        setEmail={setEmail}
        handleEmailUpdate={handleEmailUpdate}
        messageEmail={messageEmail}
      />

      <LocateForm
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
        handleLocateUpdate={handleLocateUpdate}
        messageLocate={messageLocate}
      />

      <ResponsibleForm
        nameResponsible={nameResponsible}
        setNameResponsible={setNameResponsible}
        emailResponsible={emailResponsible}
        setEmailResponsible={setEmailResponsible}
        telephone={telephone}
        setTelephone={setTelephone}
        telephoneResponsible={telephoneResponsible}
        setTelephoneResponsible={setTelephoneResponsible}
        handleResponsibleUpdate={handleResponsibleUpdate}
        messageResponsible={messageResponsible}
      />

      {!showPasswordForm ? (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowPasswordForm(true)}
            className="text-blue-600 hover:underline font-semibold"
          >
            Quero mudar minha senha
          </button>
        </div>
      ) : (
        <>
          <PasswordForm
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            password={password}
            setPassword={setPassword}
            passwordConfirmation={passwordConfirmation}
            setPasswordConfirmation={setPasswordConfirmation}
            handlePasswordUpdate={handlePasswordUpdate}
            messagePassword={messagePassword}
          />

          <div className="text-center mt-4">
            <button
              onClick={() => {
                setShowPasswordForm(false);
                setCurrentPassword("");
                setPassword("");
                setPasswordConfirmation("");
              }}
              className="text-gray-600 hover:underline font-semibold"
            >
              Cancelar alteração de senha
            </button>
          </div>
        </>
      )}
    </>
  );
}
