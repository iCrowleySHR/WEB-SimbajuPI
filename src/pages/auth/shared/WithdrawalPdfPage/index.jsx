import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Title from "../../../../components/Title";
import Alert from "../../../../components/Alert";

import { useWithdrawalDetails } from "../../../../hook/useWithdrawalDetails";
import translate from "../../../../utils/translate";
import formatDate from "../../../../utils/formatDate";
import { maskCpf, maskTelephone } from "../../../../utils/mask";

export default function WithdrawalPdfPage() {
  const { id } = useParams();
  const { withdrawal, error, message } = useWithdrawalDetails(id);

  const pdfGenerated = useRef(false);

  const safe = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "string" && value.trim() === "") return "-";
    return value;
  };

  const tableConfig = {
    styles: {
      fontSize: 10,
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: 120 },
    },
  };

  const generatePdf = () => {
    if (!withdrawal) return;

    const doc = new jsPDF();
    let currentY = 20;

    // ===== TÍTULO =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Retirada", 14, currentY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, currentY + 8);

    currentY += 18;

    // ===== RETIRADA =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Dados da Retirada", 14, currentY);

    autoTable(doc, {
      startY: currentY + 4,
      head: [["Campo", "Valor"]],
      body: [
        ["ID", safe(withdrawal.id)],
        ["Data e Hora", safe(formatDate(withdrawal.dateTime))],
        ["Marca", safe(withdrawal.brand)],
        ["Tipo de Fralda", safe(withdrawal.typeDiaper)],
        ["Qtd. Fraldas", safe(withdrawal.quantityDiapers)],
        ["Qtd. Pacotes", safe(withdrawal.quantityPackage)],
        ["Responsável Retirada", safe(withdrawal.responsibleWithdrawal)],
        ["Criado em", safe(formatDate(withdrawal.created_at))],
        ["Atualizado em", safe(formatDate(withdrawal.updated_at))],
        ["Apagado em", withdrawal.deleted_at ? safe(formatDate(withdrawal.deleted_at)) : "Não"],
      ],
      ...tableConfig,
    });

    currentY = doc.lastAutoTable.finalY + 12;

    // ===== USUÁRIO ALMOXARIFADO =====
    if (withdrawal.userWarehouse) {
      doc.text("Usuário do Almoxarifado", 14, currentY);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", safe(withdrawal.userWarehouse.id)],
          ["Nome", safe(withdrawal.userWarehouse.name)],
          ["Email", safe(withdrawal.userWarehouse.email)],
          ["Perfil", safe(translate(withdrawal.userWarehouse.role))],
          ["Trocar senha", withdrawal.userWarehouse.must_change_password ? "Sim" : "Não"],
          ["Criado em", safe(formatDate(withdrawal.userWarehouse.created_at))],
          ["Atualizado em", safe(formatDate(withdrawal.userWarehouse.updated_at))],
          ["Apagado em", withdrawal.userWarehouse.deleted_at ? safe(formatDate(withdrawal.userWarehouse.deleted_at)) : "Não"],
        ],
        ...tableConfig,
      });

      currentY = doc.lastAutoTable.finalY + 12;
    }

    // ===== AGENDAMENTO =====
    const s = withdrawal.scheduling;

    if (s) {
      doc.text("Agendamento", 14, currentY);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", safe(s.id)],
          ["Status", safe(translate(s.schedulingStatus))],
          ["Data e Hora", safe(formatDate(s.dateTime))],
          ["Criado em", safe(formatDate(s.created_at))],
          ["Atualizado em", safe(formatDate(s.updated_at))],
          ["Apagado em", s.deleted_at ? safe(formatDate(s.deleted_at)) : "Não"],
        ],
        ...tableConfig,
      });

      currentY = doc.lastAutoTable.finalY + 12;

      // ===== BENEFICIÁRIO =====
      const b = s.beneficiary;

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
          ...tableConfig,
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
              ["Criado em", safe(formatDate(b.user.created_at))],
              ["Atualizado em", safe(formatDate(b.user.updated_at))],
              ["Apagado em", b.user.deleted_at ? safe(formatDate(b.user.deleted_at)) : "Não"],
            ],
            ...tableConfig,
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
              ["Criado em", safe(formatDate(b.location.created_at))],
              ["Atualizado em", safe(formatDate(b.location.updated_at))],
              ["Apagado em", b.location.deleted_at ? safe(formatDate(b.location.deleted_at)) : "Não"],
            ],
            ...tableConfig,
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
              ["Documento UBS", safe(b.status.documentationStatusUbs)],
              ["Status Secretaria", safe(b.status.secretaryStatus)],
              ["Obs Secretaria", safe(b.status.observationSecretary)],
              ["Documento Secretaria", safe(b.status.documentationStatusSecretary)],
              ["Última verificação", safe(formatDate(b.status.lastCheck))],
              ["Criado em", safe(formatDate(b.status.created_at))],
              ["Atualizado em", safe(formatDate(b.status.updated_at))],
              ["Apagado em", b.status.deleted_at ? safe(formatDate(b.status.deleted_at)) : "Não"],
            ],
            ...tableConfig,
          });

          currentY = doc.lastAutoTable.finalY + 12;
        }
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

    doc.save(`retirada_${withdrawal.id}.pdf`);
  };

  useEffect(() => {
    if (withdrawal && !pdfGenerated.current) {
      pdfGenerated.current = true;
      generatePdf();
    }
  }, [withdrawal]);

  return (
    <>
      <Title
        title="Gerar PDF da Retirada"
        subtitle="O PDF será baixado automaticamente."
        back="true"
      />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      {!withdrawal && !error && (
        <p className="text-gray-500 text-sm mt-4">
          Carregando dados da retirada...
        </p>
      )}

      {withdrawal && (
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