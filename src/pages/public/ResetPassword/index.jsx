import FormBox from "../../../components/FormBox";
import Title from "../../../components/Title";
import { useResetPassword } from "../../../hook/useResetPassword";

export default function ResetPassword() {
    const {
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        message,
        handleSubmit,
    } = useResetPassword();

    return (
        <>
            <Title
                title={"Redefinir Senha"}
                subtitle={"Digite sua nova senha para acessar o sistema"}
                backTo="/login"
                back={true}
            />

            <FormBox
                type="Redefinir Senha"
                subtitle="Informe sua nova senha abaixo."
                icon="fas fa-lock"
                color="green"
                message={message}
                onSubmit={handleSubmit}
                fields={[
                    {
                        label: "Nova senha",
                        type: "password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: "Digite sua nova senha",
                        required: true,
                    },
                    {
                        label: "Confirmar senha",
                        type: "password",
                        value: passwordConfirmation,
                        onChange: (e) => setPasswordConfirmation(e.target.value),
                        placeholder: "Confirme sua nova senha",
                        required: true,
                    },
                ]}
                infoBox={{
                    title: "Dicas de segurança",
                    items: [
                        "Crie uma senha forte com letras e números.",
                        "Não compartilhe seu token com outras pessoas.",
                        "Após redefinir, faça login normalmente.",
                    ],
                }}
            />
        </>
    );
}