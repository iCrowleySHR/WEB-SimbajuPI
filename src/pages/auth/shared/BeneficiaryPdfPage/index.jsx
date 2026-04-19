import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Title from "../../../../components/Title";
import Alert from "../../../../components/Alert";

import { useBeneficiaryDetail } from "../../../../hook/useBeneficiaryDetails";
import translate from "../../../../utils/translate";
import formatDate from "../../../../utils/formatDate";
import { maskCpf, maskTelephone } from "../../../../utils/mask";

export default function BeneficiaryPdfPage() {
  const { id } = useParams();
  const { beneficiary, error, message } = useBeneficiaryDetail(id);

  const pdfGenerated = useRef(false);

  const safe = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "string" && value.trim() === "") return "-";
    return value;
  };

  const generatePdf = () => {
    if (!beneficiary) return;

    const doc = new jsPDF();
    let currentY = 20;

    // ===== TÍTULO =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório do Beneficiário", 14, currentY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, currentY + 8);

    currentY += 18;


    // ===== DADOS GERAIS (BENEFICIÁRIO + USUÁRIO) =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Dados Gerais", 14, currentY);

    autoTable(doc, {
      startY: currentY + 4,
      head: [["Campo", "Valor"]],
      body: [

        ["ID Usuário", safe(beneficiary.user?.id)],
        ["Nome Usuário", safe(beneficiary.user?.name)],
        ["Email Usuário", safe(beneficiary.user?.email)],
        ["Perfil", safe(translate(beneficiary.user?.role))],
        ["Precisa trocar senha", beneficiary.user?.must_change_password ? "Sim" : "Não"],
        ["Criado em (Usuário)", safe(formatDate(beneficiary.user?.created_at))],
        ["Atualizado em (Usuário)", safe(formatDate(beneficiary.user?.updated_at))],
        ["Apagado em (Usuário)", beneficiary.user?.deleted_at ? safe(formatDate(beneficiary.user?.deleted_at)) : "Não"],

        ["", ""], // separador visual
        
        ["ID Beneficiário", safe(beneficiary.id)],
        ["Nome do Responsável", safe(beneficiary.nameResponsible)],
        ["CPF", safe(maskCpf(beneficiary.cpf))],
        ["Email do Responsável", safe(beneficiary.emailResponsible)],
        ["Telefone", safe(maskTelephone(beneficiary.telephone))],
        ["Telefone do Responsável", safe(maskTelephone(beneficiary.telephoneResponsible))],
        ["Data de Nascimento", safe(formatDate(beneficiary.birthDate))],
        ["Tipo de Benefício", safe(beneficiary.typeBenefit)],
        ["Prazo de Prescrição", safe(formatDate(beneficiary.prescriptionTimeDays))],
        ["Quantidade de Prescrição", safe(beneficiary.prescriptionQuantity)],
        ["Período Mínimo de Agendamento", safe(formatDate(beneficiary.minimumSchedulingPeriod))],
        ["Criado em (Beneficiário)", safe(formatDate(beneficiary.created_at))],
        ["Atualizado em (Beneficiário)", safe(formatDate(beneficiary.updated_at))],
        ["Apagado em (Beneficiário)", beneficiary.deleted_at ? safe(formatDate(beneficiary.deleted_at)) : "Não"],

      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
      columnStyles: {
        0: { cellWidth: 65 },
        1: { cellWidth: 120 },
      },
    });

    currentY = doc.lastAutoTable.finalY + 12;
    // ===== LOCALIZAÇÃO =====
    if (beneficiary.location) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Localização", 14, currentY);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", safe(beneficiary.location.id)],
          ["CEP", safe(beneficiary.location.cep)],
          ["Rua", safe(beneficiary.location.streetName)],
          ["Número", safe(beneficiary.location.numberHouse)],
          ["Bairro", safe(beneficiary.location.neighborhood)],
          ["Cidade", safe(beneficiary.location.city)],
          ["Criado em", safe(formatDate(beneficiary.location.created_at))],
          ["Atualizado em", safe(formatDate(beneficiary.location.updated_at))],
          ["Apagado em", beneficiary.location.deleted_at ? safe(formatDate(beneficiary.location.deleted_at)) : "Não"],
        ],
        styles: { fontSize: 10 },
        headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
        columnStyles: {
          0: { cellWidth: 65 },
          1: { cellWidth: 120 },
        },
      });

      currentY = doc.lastAutoTable.finalY + 12;
    }

    // ===== STATUS =====
    if (beneficiary.status) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("Status do Beneficiário", 14, currentY);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", safe(beneficiary.status.id)],
          ["Status UBS", safe(beneficiary.status.ubsStatus)],
          ["Observação UBS", safe(beneficiary.status.observationUbs)],
          [
            "Documento UBS",
            beneficiary.status.documentationStatusUbs
              ? beneficiary.status.documentationStatusUbs
              : "Não disponível",
          ],
          ["Status Secretaria", safe(beneficiary.status.secretaryStatus)],
          ["Observação Secretaria", safe(beneficiary.status.observationSecretary)],
          [
            "Documento Secretaria",
            beneficiary.status.documentationStatusSecretary
              ? beneficiary.status.documentationStatusSecretary
              : "Não disponível",
          ],
          ["Última Verificação", safe(formatDate(beneficiary.status.lastCheck))],
          ["Criado em", safe(formatDate(beneficiary.status.created_at))],
          ["Atualizado em", safe(formatDate(beneficiary.status.updated_at))],
          ["Apagado em", beneficiary.status.deleted_at ? safe(formatDate(beneficiary.status.deleted_at)) : "Não"],
        ],
        styles: { fontSize: 10 },
        headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
        columnStyles: {
          0: { cellWidth: 65 },
          1: { cellWidth: 120 },
        },
      });

      currentY = doc.lastAutoTable.finalY + 12;
    }

    // ===== RODAPÉ =====
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(130);

      doc.text(
        `Página ${i} de ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(`beneficiario_${beneficiary.id}.pdf`);
  };

  useEffect(() => {
    if (beneficiary && !pdfGenerated.current) {
      pdfGenerated.current = true;
      generatePdf();
    }
  }, [beneficiary]);

  return (
    <>
      <Title
        title="Gerar PDF"
        subtitle="O PDF será baixado automaticamente."
        back="true"
      />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      {!beneficiary && !error && (
        <p className="text-gray-500 text-sm mt-4">
          Carregando dados do beneficiário...
        </p>
      )}

      {beneficiary && (
        <button
          onClick={generatePdf}
          className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Baixar PDF novamente
        </button>
      )}
    </>
  );
}