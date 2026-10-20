import Title from "../../../components/Title";
import { useSendTokenPassword } from "../../../hook/useSendTokenPassword";
import FormBox from "../../../components/FormBox";

export default function SendTokenPassword() {
    const { email, setEmail, message, handleSubmit } = useSendTokenPassword();

    return (
        <>
            <Title
                title={"Recuperar Senha"}
                subtitle={"Informe seu e-mail para receber o link de redefinição"}
                back={true}
            />

            <FormBox
                type="Enviar Link de Redefinição"
                subtitle="Digite seu e-mail cadastrado para receber o link de redefinição."
                icon="fas fa-key"
                color="blue"
                message={message}
                onSubmit={handleSubmit}
                fields={[
                    {
                        label: "E-mail",
                        type: "email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: "Digite seu e-mail",
                        required: true,
                    },
                ]}
                infoBox={{
                    title: "Atenção",
                    items: [
                        "O link será enviado para o e-mail informado.",
                        "Verifique também sua caixa de spam.",
                        "O token tem validade limitada.",
                    ],
                }}
            />
        </>
    );
}