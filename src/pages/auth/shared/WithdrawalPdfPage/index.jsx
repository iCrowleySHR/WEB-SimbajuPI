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

    const COLORS = {
        primary: [30, 64, 175],
        primaryLight: [59, 130, 246],
        accent: [239, 246, 255],
        white: [255, 255, 255],
        gray100: [248, 249, 250],
        gray200: [226, 232, 240],
        gray600: [100, 116, 139],
        gray800: [30, 41, 59],
    };

    const drawSectionHeader = (doc, label, y) => {
        const pageWidth = doc.internal.pageSize.width;

        doc.setFillColor(...COLORS.primary);
        doc.rect(14, y - 4, 3, 7, "F");

        doc.setFillColor(...COLORS.accent);
        doc.roundedRect(18, y - 4, pageWidth - 32, 7, 1, 1, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...COLORS.primary);
        doc.text(label, 21, y + 0.5);
        doc.setTextColor(...COLORS.gray800);

        return y + 6;
    };

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
            margin: { left: 14, right: 14 },
        });

        return doc.lastAutoTable.finalY + 10;
    };

    const generatePdf = () => {
        if (!withdrawal) return;

        const doc = new jsPDF({ unit: "mm", format: "a4" });
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // ── CABEÇALHO ──────────────────────────────────────────────────
        doc.setFillColor(...COLORS.primary);
        doc.rect(0, 0, pageWidth, 38, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(...COLORS.white);
        doc.text("Relatório de Retirada", 14, 16);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(180, 210, 255);
        doc.text(
            `ID ${safe(withdrawal.id)}  •  ${safe(withdrawal.brand)} — ${safe(withdrawal.typeDiaper)}`,
            14,
            25
        );

        doc.setFontSize(9);
        doc.setTextColor(160, 195, 255);
        doc.text(
            `Gerado em: ${new Date().toLocaleString("pt-BR")}`,
            pageWidth - 14,
            32,
            { align: "right" }
        );

        doc.setDrawColor(...COLORS.primaryLight);
        doc.setLineWidth(0.5);
        doc.line(0, 38, pageWidth, 38);

        let currentY = 50;
        doc.setTextColor(...COLORS.gray800);

        // ── DADOS DA RETIRADA ──────────────────────────────────────────
        currentY = drawSectionHeader(doc, "Dados da Retirada", currentY);
        currentY = drawTable(doc, currentY, [
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
        ]);

        // ── USUÁRIO DO ALMOXARIFADO ────────────────────────────────────
        if (withdrawal.userWarehouse) {
            const uw = withdrawal.userWarehouse;
            currentY = drawSectionHeader(doc, "Usuário do Almoxarifado", currentY);
            currentY = drawTable(doc, currentY, [
                ["ID", safe(uw.id)],
                ["Nome", safe(uw.name)],
                ["Email", safe(uw.email)],
                ["Perfil", safe(translate(uw.role))],
                ["Trocar senha", uw.must_change_password ? "Sim" : "Não"],
                ["Criado em", safe(formatDate(uw.created_at))],
                ["Atualizado em", safe(formatDate(uw.updated_at))],
                ["Apagado em", uw.deleted_at ? safe(formatDate(uw.deleted_at)) : "Não"],
            ]);
        }

        // ── AGENDAMENTO ────────────────────────────────────────────────
        const s = withdrawal.scheduling;
        if (s) {
            currentY = drawSectionHeader(doc, "Agendamento", currentY);
            currentY = drawTable(doc, currentY, [
                ["ID", safe(s.id)],
                ["Status", safe(translate(s.schedulingStatus))],
                ["Data e Hora", safe(formatDate(s.dateTime))],
                ["Criado em", safe(formatDate(s.created_at))],
                ["Atualizado em", safe(formatDate(s.updated_at))],
                ["Apagado em", s.deleted_at ? safe(formatDate(s.deleted_at)) : "Não"],
            ]);

            // ── BENEFICIÁRIO ─────────────────────────────────────────────
            const b = s.beneficiary;
            if (b) {
                currentY = drawSectionHeader(doc, "Beneficiário", currentY);
                currentY = drawTable(doc, currentY, [
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
                ]);

                // ── USUÁRIO DO BENEFICIÁRIO ──────────────────────────────
                if (b.user) {
                    currentY = drawSectionHeader(doc, "Usuário do Beneficiário", currentY);
                    currentY = drawTable(doc, currentY, [
                        ["ID", safe(b.user.id)],
                        ["Nome", safe(b.user.name)],
                        ["Email", safe(b.user.email)],
                        ["Perfil", safe(translate(b.user.role))],
                        ["Trocar senha", b.user.must_change_password ? "Sim" : "Não"],
                        ["Criado em", safe(formatDate(b.user.created_at))],
                        ["Atualizado em", safe(formatDate(b.user.updated_at))],
                        ["Apagado em", b.user.deleted_at ? safe(formatDate(b.user.deleted_at)) : "Não"],
                    ]);
                }

                // ── LOCALIZAÇÃO ──────────────────────────────────────────
                if (b.location) {
                    if (currentY > 250) {
                        doc.addPage();
                        currentY = 20;
                    }

                    currentY = drawSectionHeader(doc, "Localização", currentY);
                    currentY = drawTable(doc, currentY, [
                        ["CEP", safe(b.location.cep)],
                        ["Rua", safe(b.location.streetName)],
                        ["Número", safe(b.location.numberHouse)],
                        ["Bairro", safe(b.location.neighborhood)],
                        ["Cidade", safe(b.location.city)],
                        ["Criado em", safe(formatDate(b.location.created_at))],
                        ["Atualizado em", safe(formatDate(b.location.updated_at))],
                        ["Apagado em", b.location.deleted_at ? safe(formatDate(b.location.deleted_at)) : "Não"],
                    ]);
                }

                // ── STATUS DO BENEFICIÁRIO ───────────────────────────────
                if (b.status) {
                    currentY = drawSectionHeader(doc, "Status do Beneficiário", currentY);
                    currentY = drawTable(doc, currentY, [
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
                    ]);
                }
            }
        }

        // ── RODAPÉ ─────────────────────────────────────────────────────
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);

            doc.setDrawColor(...COLORS.gray200);
            doc.setLineWidth(0.3);
            doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

            doc.setFillColor(...COLORS.primary);
            doc.rect(14, pageHeight - 13, 4, 4, "F");

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(...COLORS.gray600);
            doc.text("Sistema de Distribuição de Fraldas", 21, pageHeight - 10);
            doc.text(`Página ${i} de ${totalPages}`, pageWidth - 14, pageHeight - 10, { align: "right" });
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
                <p className="text-gray-500 text-sm mt-4">Carregando dados da retirada...</p>
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