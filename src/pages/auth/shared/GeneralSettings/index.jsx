import { useState } from "react";
import Title from "../../../../components/Title";
import { useUser } from "../../../../contexts/UserContext";
import { useUserSettings } from "../../../../hook/useUserSettings";
import UserInfo from "../../../../components/Settings/userInfo";
import EmailForm from "../../../../components/Settings/EmailForm";
import PasswordForm from "../../../../components/Settings/PasswordForm";

export default function GeneralSettings() {
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
