import { useState } from "react";
import Title from "../../../../components/Title";
import Alert from "../../../../components/Alert";
import BusinessHours from "../../../../components/BusinessHours";
import BusinessHoursForm from "../../../../components/BusinessHoursForm";
import { useWarehouseConfig } from "../../../../hook/useWarehouseConfig";

export default function WarehouseConfig() {
    const { data, error, message, updateConfig } = useWarehouseConfig();
    const [selectedDayId, setSelectedDayId] = useState(null);

    if (error) return <Alert type="error" message={error} />;

    return (
        <>
            <Title
                title="Configurações de funcionamento"
                subtitle="Configure os horários de funcionamento da unidade."
                back={true}
            />
<div className="mb-5">
<BusinessHours data={data} onSelectDay={setSelectedDayId}  />

</div>
            
            <BusinessHoursForm
                schedule={data}
                updateConfig={updateConfig}
                message={message}
                selectedDayId={selectedDayId}
                setSelectedDayId={setSelectedDayId}
            />

        </>
    );
}
