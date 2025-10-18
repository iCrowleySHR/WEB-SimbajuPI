import ReportForm from "../../../../components/ReportForm";
import Title from "../../../../components/Title";
import { useReport } from "../../../../hook/useReport"; 

export default function Reports() {
    const { month, setMonth, year, setYear, type, setType, message, handleSubmit } = useReport();

    return (
        <>
            <Title
                title="Relatórios"
                subtitle="Gere seus relatórios sobre o nosso sistema."
                back="true"
            />

            <div className="mx-auto mt-6">
                <ReportForm
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    type={type}
                    setType={setType}
                    message={message}
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    );
}
