import { useState, useEffect } from "react";
import Title from "../../../../components/Title";
import FormBox from "../../../../components/FormBox";

export default function GeneralSettings() {
  const userDataFromApi = {
    name: "João Silva",
    email: "joao.silva@email.com",
    created_at: "2023-01-10 15:23:00",
    updated_at: "2023-09-05 10:45:00",
    role: "Usuário",
  };

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    setEmail(userDataFromApi.email);
  }, []);

  const handleSubmit = () => {
    if (!email) {
      setMessage({ type: "error", text: "Email é obrigatório." });
      return;
    }

    if (showPasswordFields) {
      if ((password || passwordConfirmation) && !currentPassword) {
        setMessage({ type: "error", text: "Senha atual é necessária para alterar a senha." });
        return;
      }
      if (password !== passwordConfirmation) {
        setMessage({ type: "error", text: "Nova senha e confirmação não conferem." });
        return;
      }
    }

    console.log({
      email,
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    });

    setMessage({ type: "success", text: "Configurações atualizadas com sucesso!" });

    setCurrentPassword("");
    setPassword("");
    setPasswordConfirmation("");
    setShowPasswordFields(false);
  };

  const editableFields = [
    {
      label: "Email",
      type: "email",
      value: email,
      onChange: e => setEmail(e.target.value),
      placeholder: "Digite seu email",
      required: true,
    },
  ];

  return (
    <>
      <Title
        title={"Configurações"}
        subtitle={"Veja todas as informações da sua conta."}
        back={true}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Informações do usuário</h3>
        <p><strong>Nome:</strong> {userDataFromApi.name}</p>
        <p><strong>Criado em:</strong> {userDataFromApi.created_at}</p>
        <p><strong>Última atualização:</strong> {userDataFromApi.updated_at}</p>
        <p><strong>Perfil:</strong> {userDataFromApi.role}</p>
      </div>

      <FormBox
        type={showPasswordFields ? "Atualizar Configurações" : "Atualizar Email"}
        icon="fas fa-cog"
        color="blue"
        fields={editableFields}
        onSubmit={handleSubmit}
        message={message}
        infoBox={{
          title: "Regras para atualização",
          items: [
            "Email deve ser único no sistema.",
            ...(showPasswordFields
              ? [
                  "Senha atual é necessária para alterar senha.",
                  "Nova senha deve ser confirmada.",
                ]
              : []),
          ],
        }}
      />

      {/* Só mostrar o botão e campos de senha se for pra alterar */}
      {showPasswordFields && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto">
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="font-semibold text-gray-700 mb-2 px-2">Alterar Senha</legend>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Senha Atual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Digite sua senha atual"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Nova Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Digite a nova senha"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                placeholder="Confirme a nova senha"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition-colors"
            >
              Atualizar Senha
            </button>

            <button
              onClick={() => {
                setShowPasswordFields(false);
                setCurrentPassword("");
                setPassword("");
                setPasswordConfirmation("");
                setMessage(null);
              }}
              className="mt-3 w-full border border-gray-300 rounded-xl p-3 font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
          </fieldset>
        </div>
      )}

      {!showPasswordFields && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowPasswordFields(true)}
            className="text-blue-600 hover:underline font-semibold"
          >
            Quero mudar minha senha
          </button>
        </div>
      )}
    </>
  );
}
