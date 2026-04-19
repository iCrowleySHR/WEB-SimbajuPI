import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Title from "../../../../components/Title";
import Alert from "../../../../components/Alert";


import translate from "../../../../utils/translate";
import formatDate from "../../../../utils/formatDate";
import { maskCpf, maskTelephone } from "../../../../utils/mask";
import { useSchedulingDetail } from "../../../../hook/useSchedulingDetails";

export default function SchedulingPdfPage() {
  const { id } = useParams();
  const { scheduling, error, message } = useSchedulingDetail(id);

  const pdfGenerated = useRef(false);

  const safe = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "string" && value.trim() === "") return "-";
    return value;
  };

  const generatePdf = () => {
    if (!scheduling) return;

    const doc = new jsPDF();
    let currentY = 20;

    // ===== TÍTULO =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Agendamento", 14, currentY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, currentY + 8);

    currentY += 18;

    // ===== AGENDAMENTO =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Dados do Agendamento", 14, currentY);

    autoTable(doc, {
      startY: currentY + 4,
      head: [["Campo", "Valor"]],
      body: [
        ["ID", safe(scheduling.id)],
        ["Status", safe(translate(scheduling.schedulingStatus))],
        ["Data e Hora", safe(formatDate(scheduling.dateTime))],
        ["Criado em", safe(formatDate(scheduling.created_at))],
        ["Atualizado em", safe(formatDate(scheduling.updated_at))],
        ["Apagado em", scheduling.deleted_at ? safe(formatDate(scheduling.deleted_at)) : "Não"],
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
      columnStyles: {
        0: { cellWidth: 65 },
        1: { cellWidth: 120 },
      },
    });

    currentY = doc.lastAutoTable.finalY + 12;

    // ===== USUÁRIO ALMOXARIFADO =====
    if (scheduling.userWarehouse) {
      doc.text("Usuário do Almoxarifado", 14, currentY);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", safe(scheduling.userWarehouse.id)],
          ["Nome", safe(scheduling.userWarehouse.name)],
          ["Email", safe(scheduling.userWarehouse.email)],
          ["Perfil", safe(translate(scheduling.userWarehouse.role))],
          ["Trocar senha", scheduling.userWarehouse.must_change_password ? "Sim" : "Não"],
          ["Criado em", safe(formatDate(scheduling.userWarehouse.created_at))],
        ],
        styles: { fontSize: 10 },
         headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
      });

      currentY = doc.lastAutoTable.finalY + 12;
    }

    // ===== BENEFICIÁRIO =====
    const b = scheduling.beneficiary;

    if (b) {
      doc.text("Beneficiário", 14, currentY);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", safe(b.id)],
          ["Responsável", safe(b.nameResponsible)],
          ["CPF", safe(maskCpf(b.cpf))],
          ["Email", safe(b.emailResponsible)],
          ["Telefone", safe(maskTelephone(b.telephone))],
          ["Telefone Responsável", safe(maskTelephone(b.telephoneResponsible))],
          ["Nascimento", safe(formatDate(b.birthDate))],
          ["Tipo Benefício", safe(b.typeBenefit)],
          ["Prescrição até", safe(formatDate(b.prescriptionTimeDays))],
          ["Qtd Prescrição", safe(b.prescriptionQuantity)],
          ["Período mínimo", safe(formatDate(b.minimumSchedulingPeriod))],
        ],
        styles: { fontSize: 10 },
         headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
      });

      currentY = doc.lastAutoTable.finalY + 12;

      // ===== USUÁRIO DO BENEFICIÁRIO =====
      if (b.user) {
        doc.text("Usuário do Beneficiário", 14, currentY);

        autoTable(doc, {
          startY: currentY + 4,
          head: [["Campo", "Valor"]],
          body: [
            ["ID", safe(b.user.id)],
            ["Nome", safe(b.user.name)],
            ["Email", safe(b.user.email)],
            ["Perfil", safe(translate(b.user.role))],
            ["Trocar senha", b.user.must_change_password ? "Sim" : "Não"],
          ],
          styles: { fontSize: 10 },
           headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
        });

        currentY = doc.lastAutoTable.finalY + 12;
      }

      // ===== LOCALIZAÇÃO =====
      if (b.location) {
        doc.text("Localização", 14, currentY);

        autoTable(doc, {
          startY: currentY + 4,
          head: [["Campo", "Valor"]],
          body: [
            ["CEP", safe(b.location.cep)],
            ["Rua", safe(b.location.streetName)],
            ["Número", safe(b.location.numberHouse)],
            ["Bairro", safe(b.location.neighborhood)],
            ["Cidade", safe(b.location.city)],
          ],
          styles: { fontSize: 10 },
           headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
        });

        currentY = doc.lastAutoTable.finalY + 12;
      }

      // ===== STATUS =====
      if (b.status) {
        doc.text("Status do Beneficiário", 14, currentY);

        autoTable(doc, {
          startY: currentY + 4,
          head: [["Campo", "Valor"]],
          body: [
            ["Status UBS", safe(b.status.ubsStatus)],
            ["Obs UBS", safe(b.status.observationUbs)],
            ["Status Secretaria", safe(b.status.secretaryStatus)],
            ["Obs Secretaria", safe(b.status.observationSecretary)],
            ["Última verificação", safe(formatDate(b.status.lastCheck))],
          ],
          styles: { fontSize: 10 },
     headStyles: { fillColor: [240, 240, 240], textColor: [20, 20, 20] },
        });

        currentY = doc.lastAutoTable.finalY + 12;
      }
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

    doc.save(`agendamento_${scheduling.id}.pdf`);
  };

  useEffect(() => {
    if (scheduling && !pdfGenerated.current) {
      pdfGenerated.current = true;
      generatePdf();
    }
  }, [scheduling]);

  return (
    <>
      <Title
        title="Gerar PDF do Agendamento"
        subtitle="O PDF será baixado automaticamente."
        back="true"
      />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      {!scheduling && !error && (
        <p className="text-gray-500 text-sm mt-4">
          Carregando dados do agendamento...
        </p>
      )}

      {scheduling && (
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