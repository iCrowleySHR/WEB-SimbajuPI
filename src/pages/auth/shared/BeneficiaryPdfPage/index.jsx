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

  // ─── Paleta de cores ───────────────────────────────────────────────
  const COLORS = {
    primary:     [30,  64,  175],   // azul escuro (header)
    primaryLight:[59,  130, 246],   // azul claro  (destaques)
    accent:      [239, 246, 255],   // azul muito claro (linhas pares)
    white:       [255, 255, 255],
    gray100:     [248, 249, 250],
    gray200:     [226, 232, 240],
    gray600:     [100, 116, 139],
    gray800:     [30,  41,  59],
    success:     [22,  163, 74],
    danger:      [220, 38,  38],
  };

  // ─── Helper: desenha seção título com barra colorida ───────────────
  const drawSectionHeader = (doc, label, y) => {
    const pageWidth = doc.internal.pageSize.width;

    // barra lateral colorida
    doc.setFillColor(...COLORS.primary);
    doc.rect(14, y - 4, 3, 7, "F");

    // fundo suave
    doc.setFillColor(...COLORS.accent);
    doc.roundedRect(18, y - 4, pageWidth - 32, 7, 1, 1, "F");

    // texto
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.primary);
    doc.text(label, 21, y + 0.5);
    doc.setTextColor(...COLORS.gray800);

    return y + 6;
  };

  // ─── Helper: tabela padronizada ────────────────────────────────────
  const drawTable = (doc, startY, body) => {
    autoTable(doc, {
      startY,
      body,
      styles: {
        fontSize: 9.5,
        cellPadding: { top: 3, right: 5, bottom: 3, left: 5 },
        lineColor: COLORS.gray200,
        lineWidth: 0.2,
        textColor: COLORS.gray800,
      },
      columnStyles: {
        0: {
          cellWidth: 62,
          fontStyle: "bold",
          textColor: COLORS.gray600,
          fillColor: COLORS.gray100,
        },
        1: { cellWidth: 118 },
      },
      alternateRowStyles: { fillColor: COLORS.accent },
      didParseCell(data) {
        // linha separadora visual (linha vazia)
        if (data.row.raw[0] === "" && data.row.raw[1] === "") {
          data.cell.styles.fillColor = COLORS.gray200;
          data.cell.styles.minCellHeight = 1;
          data.cell.styles.cellPadding = 0.5;
        }
      },
      margin: { left: 14, right: 14 },
    });

    return doc.lastAutoTable.finalY + 10;
  };

  // ─── Geração principal ─────────────────────────────────────────────
  const generatePdf = () => {
    if (!beneficiary) return;

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth  = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // ── CABEÇALHO ──────────────────────────────────────────────────
    // bloco azul superior
    doc.setFillColor(...COLORS.primary);
    doc.rect(0, 0, pageWidth, 38, "F");

    // título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...COLORS.white);
    doc.text("Relatório do Beneficiário", 14, 16);

    // subtítulo (nome do beneficiário)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(180, 210, 255);
    doc.text(
      `${safe(beneficiary.user?.name)}  •  ID ${safe(beneficiary.id)}`,
      14,
      25
    );

    // data de geração — canto direito
    doc.setFontSize(9);
    doc.setTextColor(160, 195, 255);
    const dateStr = `Gerado em: ${new Date().toLocaleString("pt-BR")}`;
    doc.text(dateStr, pageWidth - 14, 32, { align: "right" });

    // linha separadora abaixo do header
    doc.setDrawColor(...COLORS.primaryLight);
    doc.setLineWidth(0.5);
    doc.line(0, 38, pageWidth, 38);

    let currentY = 50;
    doc.setTextColor(...COLORS.gray800);

    // ── DADOS GERAIS ───────────────────────────────────────────────
    currentY = drawSectionHeader(doc, "Dados do Usuário", currentY);
    currentY = drawTable(doc, currentY, [
      ["ID Usuário",            safe(beneficiary.user?.id)],
      ["Nome",                  safe(beneficiary.user?.name)],
      ["Email",                 safe(beneficiary.user?.email)],
      ["Perfil",                safe(translate(beneficiary.user?.role))],
      ["Trocar senha",          beneficiary.user?.must_change_password ? "Sim" : "Não"],
      ["Criado em",             safe(formatDate(beneficiary.user?.created_at))],
      ["Atualizado em",         safe(formatDate(beneficiary.user?.updated_at))],
      ["Apagado em",            beneficiary.user?.deleted_at ? safe(formatDate(beneficiary.user.deleted_at)) : "Não"],
    ]);

    currentY = drawSectionHeader(doc, "Dados do Beneficiário", currentY);
    currentY = drawTable(doc, currentY, [
      ["ID Beneficiário",              safe(beneficiary.id)],
      ["Nome do Responsável",          safe(beneficiary.nameResponsible)],
      ["CPF",                          safe(maskCpf(beneficiary.cpf))],
      ["Email do Responsável",         safe(beneficiary.emailResponsible)],
      ["Telefone",                     safe(maskTelephone(beneficiary.telephone))],
      ["Telefone do Responsável",      safe(maskTelephone(beneficiary.telephoneResponsible))],
      ["Data de Nascimento",           safe(formatDate(beneficiary.birthDate))],
      ["Tipo de Benefício",            safe(beneficiary.typeBenefit)],
      ["Prazo de Prescrição",          safe(formatDate(beneficiary.prescriptionTimeDays))],
      ["Qtd. de Prescrição",           safe(beneficiary.prescriptionQuantity)],
      ["Período Mín. de Agendamento",  safe(formatDate(beneficiary.minimumSchedulingPeriod))],
      ["Criado em",                    safe(formatDate(beneficiary.created_at))],
      ["Atualizado em",                safe(formatDate(beneficiary.updated_at))],
      ["Apagado em",                   beneficiary.deleted_at ? safe(formatDate(beneficiary.deleted_at)) : "Não"],
    ]);

    // ── LOCALIZAÇÃO ────────────────────────────────────────────────
    if (beneficiary.location) {
      currentY = drawSectionHeader(doc, "Localização", currentY);
      currentY = drawTable(doc, currentY, [
        ["ID",           safe(beneficiary.location.id)],
        ["CEP",          safe(beneficiary.location.cep)],
        ["Rua",          safe(beneficiary.location.streetName)],
        ["Número",       safe(beneficiary.location.numberHouse)],
        ["Bairro",       safe(beneficiary.location.neighborhood)],
        ["Cidade",       safe(beneficiary.location.city)],
        ["Criado em",    safe(formatDate(beneficiary.location.created_at))],
        ["Atualizado em",safe(formatDate(beneficiary.location.updated_at))],
        ["Apagado em",   beneficiary.location.deleted_at ? safe(formatDate(beneficiary.location.deleted_at)) : "Não"],
      ]);
    }

    // ── STATUS ─────────────────────────────────────────────────────
    if (beneficiary.status) {
      currentY = drawSectionHeader(doc, "Status do Beneficiário", currentY);
      currentY = drawTable(doc, currentY, [
        ["ID",                    safe(beneficiary.status.id)],
        ["Status UBS",            safe(beneficiary.status.ubsStatus)],
        ["Observação UBS",        safe(beneficiary.status.observationUbs)],
        ["Documento UBS",         safe(beneficiary.status.documentationStatusUbs) || "Não disponível"],
        ["Status Secretaria",     safe(beneficiary.status.secretaryStatus)],
        ["Observação Secretaria", safe(beneficiary.status.observationSecretary)],
        ["Documento Secretaria",  safe(beneficiary.status.documentationStatusSecretary) || "Não disponível"],
        ["Última Verificação",    safe(formatDate(beneficiary.status.lastCheck))],
        ["Criado em",             safe(formatDate(beneficiary.status.created_at))],
        ["Atualizado em",         safe(formatDate(beneficiary.status.updated_at))],
        ["Apagado em",            beneficiary.status.deleted_at ? safe(formatDate(beneficiary.status.deleted_at)) : "Não"],
      ]);
    }

    // ── RODAPÉ ─────────────────────────────────────────────────────
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      // linha do rodapé
      doc.setDrawColor(...COLORS.gray200);
      doc.setLineWidth(0.3);
      doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

      // bloco azul fino
      doc.setFillColor(...COLORS.primary);
      doc.rect(14, pageHeight - 13, 4, 4, "F");

      // nome do sistema / empresa (esquerda)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.gray600);
      doc.text("Sistema de Distribuição de Fraldas", 21, pageHeight - 10);

      // número de página (direita)
      doc.text(
        `Página ${i} de ${totalPages}`,
        pageWidth - 14,
        pageHeight - 10,
        { align: "right" }
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