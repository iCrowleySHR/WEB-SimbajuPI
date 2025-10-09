import { useState } from "react";
import Title from "../../../../components/Title";
import FormBox from "../../../../components/FormBox";
import { useUser } from "../../../../contexts/UserContext";
import translate from '../../../../utils/translate';
import formatDate from '../../../../utils/formatDate';
import { updateUser } from '../../../../api/routers/user'; 

export default function GeneralSettings() {
  const { user } = useUser();

  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [messageEmail, setMessageEmail] = useState(null);
  const [messagePassword, setMessagePassword] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleEmailUpdate = async () => {
    if (!email) {
      setMessageEmail({ type: "error", text: "Email é obrigatório." });
      return;
    }

    try {
      const response = await updateUser({ email });
      setMessageEmail({ type: "success", text: response.message });
    } catch (error) {
      setMessageEmail({ type: "error", text: error.response?.data?.message || "Erro ao atualizar email." });
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !password || !passwordConfirmation) {
      setMessagePassword({ type: "error", text: "Todos os campos de senha são obrigatórios." });
      return;
    }

    try {
       const response = await updateUser({
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessagePassword({ type: "success", text: response.message });
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      setMessagePassword({ type: "error", text: error.response?.data?.message || "Erro ao atualizar senha." });
    }
  };

  return (
    <>
      <Title
        title={"Configurações"}
        subtitle={"Veja todas as informações da sua conta."}
        back={true}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Informações do usuário</h3>
        <p><strong>Nome:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Criado em:</strong> {formatDate(user?.created_at)}</p>
        <p><strong>Última atualização:</strong> {formatDate(user?.updated_at)}</p>
        <p><strong>Perfil:</strong> {translate(user?.role)}</p>
      </div>

      <FormBox
        type="Atualizar Email"
        icon="fas fa-envelope"
        color="blue"
        onSubmit={handleEmailUpdate}
        message={messageEmail}
        infoBox={{
          title: "Regras para atualização",
          items: ["Email deve ser único no sistema."],
        }}
        fields={[
          {
            label: "Email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "Digite seu novo email",
            required: true,
          },
        ]}
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
          <FormBox
            type="Alterar Senha"
            icon="fas fa-lock"
            color="blue"
            onSubmit={handlePasswordUpdate}
            message={messagePassword}
            infoBox={{
              title: "Regras para atualização",
              items: [
                "Senha atual é obrigatória.",
                "Nova senha deve ser confirmada.",
              ],
            }}
            fields={[
              {
                label: "Senha Atual",
                type: "password",
                value: currentPassword,
                onChange: (e) => setCurrentPassword(e.target.value),
                placeholder: "Digite sua senha atual",
                required: true,
              },
              {
                label: "Nova Senha",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Digite a nova senha",
                required: true,
              },
              {
                label: "Confirmar Nova Senha",
                type: "password",
                value: passwordConfirmation,
                onChange: (e) => setPasswordConfirmation(e.target.value),
                placeholder: "Confirme a nova senha",
                required: true,
              },
            ]}
          />

          <div className="text-center mt-4">
            <button
              onClick={() => {
                setShowPasswordForm(false);
                setCurrentPassword("");
                setPassword("");
                setPasswordConfirmation("");
                setMessagePassword(null);
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
