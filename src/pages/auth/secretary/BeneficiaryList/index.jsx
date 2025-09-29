import DynamicTable from "../../../../components/DynamicTable";
import Title from "../../../../components/Title";


export default function BeneficiartyList() {
    const dados = [
        {
            id: 1,
            Nome: "João Silva",
            CPF: "123.456.789-00",
            "Data de Nascimento": "1990-05-20",
            "Status do Benefício": "Ativo",
            Quantidade: "120",
            Unidade: "Fraldas/mês",
            "Situação UBS": "Pendente",
            "Situação Secretaria": "Ativo"
        },
        {
            id: 2,
            Nome: "Maria Souza",
            CPF: "987.654.321-00",
            "Data de Nascimento": "1985-10-15",
            "Status do Benefício": "Inativo",
            Quantidade: "80",
            Unidade: "Fraldas/mês",
            "Situação UBS": "Inativo",
            "Situação Secretaria": "Inativo"
        }
    ];

    return (
        <>
            <Title title={"Lista de Beneficiários"} subtitle={"Veja todos os beneficiários cadastrados no sistema."} back={true} />
            
            <DynamicTable
                data={dados}
                actions={[
                    {
                        label: "Alterar Situação",
                        getPath: (row) => `/beneficiarios/${row.id}/situacao`
                    }
                ]}
            />

        </>
    );
}
