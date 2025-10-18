import { maskCpf } from "../../utils/mask";
import FormBox from "../FormBox";

export default function SchedulingForm(props) {
    const {
        user,
        date, setDate,
        time, setTime,
        id, setId,
        beneficiaries = [],
        availableTimes = [],
        message,
        handleSubmit
    } = props;

    const fields = [];

    if (user?.role === "warehouse") {
        const selectedOption = beneficiaries.find(b => b.id === id);
        fields.push({
            label: "Beneficiário",
            type: "autocomplete",
            value: id,
            onChange: (val) => setId(val),
            placeholder: "Pesquisar beneficiário...",
            initialLabel: selectedOption ? selectedOption.user.name : "",
            options: beneficiaries.map(b => ({
                value: b.id,
                label: b.user.name,
                extra: `CPF: ${maskCpf(b.cpf)}`,
            })),
            noResultsText: "Nenhum beneficiário encontrado",
        });
    }

    fields.push(
        {
            label: "Data do agendamento",
            value: date,
            onChange: e => setDate(e.target.value),
            type: "date",
            placeholder: "Selecione a data"
        },
        {
            label: "Hora do agendamento",
            value: time,
            onChange: e => setTime(e.target.value),
            type: "select",
            placeholder: "Selecione o horário",
            options: availableTimes.map(t => ({ value: t, label: t })),
        }
    );

    return (
        <FormBox
            type="Agendar Retirada"
            icon="fas fa-calendar"
            color="blue"
            onSubmit={handleSubmit}
            message={message}
            fields={fields}
            infoBox={{
                title: "Informações Importantes",
                items: [
                    "Escolha uma data e horário disponíveis.",
                    "Certifique-se de que o beneficiário esteja disponível nesse horário."
                ]
            }}
        />
    );
}
