import { useUser } from "../../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { useSchedulingForm } from "../../../../hook/useSchedulingForm";
import SchedulingForm from "../../../../components/SchedulingForm";
import Title from "../../../../components/Title";

export default function MakeScheduling() {
    const { user } = useUser();
    const { id: urlId } = useParams();

    const {
        beneficiaries,
        id,
        setId,
        date,
        setDate,
        time,
        setTime,
        availableTimes,
        message,
        handleMakeScheduling
    } = useSchedulingForm(user?.role, user?.role === "warehouse" ? urlId : null);

    return (
        <>
            <Title
                title="Marcar agendamento"
                subtitle="Marque o agendamento para retirada de insumo."
                back="true"
            />
            <SchedulingForm
                user={user}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                id={id}
                setId={setId}
                beneficiaries={beneficiaries}
                availableTimes={availableTimes}
                message={message}
                handleSubmit={handleMakeScheduling}
            />
        </>
    );
}
