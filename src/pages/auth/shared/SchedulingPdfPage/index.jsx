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

  // ─────────────────────────────────────────────────────────────
  // HELPER PARA VALORES VAZIOS
  // ─────────────────────────────────────────────────────────────

  const safe = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    if (
      typeof value === "string" &&
      value.trim() === ""
    ) {
      return "-";
    }

    return value;
  };

  // ─────────────────────────────────────────────────────────────
  // CORES
  // ─────────────────────────────────────────────────────────────

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

  // ─────────────────────────────────────────────────────────────
  // CABEÇALHO DE SEÇÃO
  // ─────────────────────────────────────────────────────────────

  const drawSectionHeader = (doc, label, y) => {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Espaço mínimo para o título + início da tabela
    const minimumSpace = 35;

    // Se não houver espaço suficiente, cria uma nova página
    if (y + minimumSpace > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    // Barra lateral
    doc.setFillColor(...COLORS.primary);

    doc.rect(
      14,
      y - 4,
      3,
      7,
      "F"
    );

    // Fundo do título
    doc.setFillColor(...COLORS.accent);

    doc.roundedRect(
      18,
      y - 4,
      pageWidth - 32,
      7,
      1,
      1,
      "F"
    );

    // Texto
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(
      ...COLORS.primary
    );

    doc.text(
      label,
      21,
      y + 0.5
    );

    doc.setTextColor(
      ...COLORS.gray800
    );

    return y + 6;
  };

  // ─────────────────────────────────────────────────────────────
  // TABELA
  // ─────────────────────────────────────────────────────────────

  const drawTable = (
    doc,
    startY,
    body
  ) => {
    autoTable(doc, {
      startY,
      body,

      styles: {
        fontSize: 9.5,

        cellPadding: {
          top: 3,
          right: 5,
          bottom: 3,
          left: 5,
        },

        lineColor:
          COLORS.gray200,

        lineWidth: 0.2,

        textColor:
          COLORS.gray800,
      },

      columnStyles: {
        0: {
          cellWidth: 62,
          fontStyle: "bold",
          textColor:
            COLORS.gray600,
          fillColor:
            COLORS.gray100,
        },

        1: {
          cellWidth: 118,
        },
      },

      alternateRowStyles: {
        fillColor:
          COLORS.accent,
      },

      margin: {
        left: 14,
        right: 14,
      },
    });

    return (
      doc.lastAutoTable.finalY +
      10
    );
  };

  // ─────────────────────────────────────────────────────────────
  // GERAÇÃO DO PDF
  // ─────────────────────────────────────────────────────────────

  const generatePdf = () => {
    if (!scheduling) return;

    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const pageWidth =
      doc.internal.pageSize.width;

    const pageHeight =
      doc.internal.pageSize.height;

    // ─────────────────────────────────────────────────────────
    // CABEÇALHO
    // ─────────────────────────────────────────────────────────

    doc.setFillColor(
      ...COLORS.primary
    );

    doc.rect(
      0,
      0,
      pageWidth,
      38,
      "F"
    );

    // Título
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(20);

    doc.setTextColor(
      ...COLORS.white
    );

    doc.text(
      "Relatório de Agendamento",
      14,
      16
    );

    // Subtítulo
    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(11);

    doc.setTextColor(
      180,
      210,
      255
    );

    doc.text(
      `ID ${safe(
        scheduling.id
      )}  •  ${safe(
        translate(
          scheduling.schedulingStatus
        )
      )}`,
      14,
      25
    );

    // Data
    doc.setFontSize(9);

    doc.setTextColor(
      160,
      195,
      255
    );

    doc.text(
      `Gerado em: ${new Date().toLocaleString(
        "pt-BR"
      )}`,
      pageWidth - 14,
      32,
      {
        align: "right",
      }
    );

    // Linha do cabeçalho
    doc.setDrawColor(
      ...COLORS.primaryLight
    );

    doc.setLineWidth(0.5);

    doc.line(
      0,
      38,
      pageWidth,
      38
    );

    let currentY = 50;

    doc.setTextColor(
      ...COLORS.gray800
    );

    // ─────────────────────────────────────────────────────────
    // DADOS DO AGENDAMENTO
    // ─────────────────────────────────────────────────────────

    currentY =
      drawSectionHeader(
        doc,
        "Dados do Agendamento",
        currentY
      );

    currentY = drawTable(
      doc,
      currentY,
      [
        [
          "ID",
          safe(scheduling.id),
        ],

        [
          "Status",
          safe(
            translate(
              scheduling.schedulingStatus
            )
          ),
        ],

        [
          "Data e Hora",
          safe(
            formatDate(
              scheduling.dateTime
            )
          ),
        ],

        [
          "Criado em",
          safe(
            formatDate(
              scheduling.created_at
            )
          ),
        ],

        [
          "Atualizado em",
          safe(
            formatDate(
              scheduling.updated_at
            )
          ),
        ],

        [
          "Apagado em",
          scheduling.deleted_at
            ? safe(
                formatDate(
                  scheduling.deleted_at
                )
              )
            : "Não",
        ],
      ]
    );

    // ─────────────────────────────────────────────────────────
    // USUÁRIO DO ALMOXARIFADO
    // ─────────────────────────────────────────────────────────

    if (
      scheduling.userWarehouse
    ) {
      const uw =
        scheduling.userWarehouse;

      currentY =
        drawSectionHeader(
          doc,
          "Usuário do Almoxarifado",
          currentY
        );

      currentY = drawTable(
        doc,
        currentY,
        [
          [
            "ID",
            safe(uw.id),
          ],

          [
            "Nome",
            safe(uw.name),
          ],

          [
            "Email",
            safe(uw.email),
          ],

          [
            "Perfil",
            safe(
              translate(
                uw.role
              )
            ),
          ],

          [
            "Trocar senha",
            uw.must_change_password
              ? "Sim"
              : "Não",
          ],

          [
            "Criado em",
            safe(
              formatDate(
                uw.created_at
              )
            ),
          ],

          [
            "Atualizado em",
            safe(
              formatDate(
                uw.updated_at
              )
            ),
          ],

          [
            "Apagado em",
            uw.deleted_at
              ? safe(
                  formatDate(
                    uw.deleted_at
                  )
                )
              : "Não",
          ],
        ]
      );
    }

    // ─────────────────────────────────────────────────────────
    // BENEFICIÁRIO
    // ─────────────────────────────────────────────────────────

    const b =
      scheduling.beneficiary;

    if (b) {
      currentY =
        drawSectionHeader(
          doc,
          "Beneficiário",
          currentY
        );

      currentY = drawTable(
        doc,
        currentY,
        [
          [
            "ID",
            safe(b.id),
          ],

          [
            "Responsável",
            safe(
              b.nameResponsible
            ),
          ],

          [
            "CPF",
            safe(
              maskCpf(b.cpf)
            ),
          ],

          [
            "Email",
            safe(
              b.emailResponsible
            ),
          ],

          [
            "Telefone",
            safe(
              maskTelephone(
                b.telephone
              )
            ),
          ],

          [
            "Telefone Responsável",
            safe(
              maskTelephone(
                b.telephoneResponsible
              )
            ),
          ],

          [
            "Nascimento",
            safe(
              formatDate(
                b.birthDate
              )
            ),
          ],

          [
            "Tipo Benefício",
            safe(
              b.typeBenefit
            ),
          ],

          [
            "Prescrição até",
            safe(
              formatDate(
                b.prescriptionTimeDays
              )
            ),
          ],

          [
            "Qtd Prescrição",
            safe(
              b.prescriptionQuantity
            ),
          ],

          [
            "Período mínimo",
            safe(
              formatDate(
                b.minimumSchedulingPeriod
              )
            ),
          ],

          [
            "Criado em",
            safe(
              formatDate(
                b.created_at
              )
            ),
          ],

          [
            "Atualizado em",
            safe(
              formatDate(
                b.updated_at
              )
            ),
          ],
        ]
      );

      // ───────────────────────────────────────────────────────
      // USUÁRIO DO BENEFICIÁRIO
      // ───────────────────────────────────────────────────────

      if (b.user) {
        currentY =
          drawSectionHeader(
            doc,
            "Usuário do Beneficiário",
            currentY
          );

        currentY = drawTable(
          doc,
          currentY,
          [
            [
              "ID",
              safe(b.user.id),
            ],

            [
              "Nome",
              safe(b.user.name),
            ],

            [
              "Email",
              safe(b.user.email),
            ],

            [
              "Perfil",
              safe(
                translate(
                  b.user.role
                )
              ),
            ],

            [
              "Trocar senha",
              b.user
                .must_change_password
                ? "Sim"
                : "Não",
            ],

            [
              "Criado em",
              safe(
                formatDate(
                  b.user.created_at
                )
              ),
            ],

            [
              "Atualizado em",
              safe(
                formatDate(
                  b.user.updated_at
                )
              ),
            ],

            [
              "Apagado em",
              b.user.deleted_at
                ? safe(
                    formatDate(
                      b.user.deleted_at
                    )
                  )
                : "Não",
            ],
          ]
        );
      }

      // ───────────────────────────────────────────────────────
      // LOCALIZAÇÃO
      // ───────────────────────────────────────────────────────

      if (b.location) {
        currentY =
          drawSectionHeader(
            doc,
            "Localização",
            currentY
          );

        currentY = drawTable(
          doc,
          currentY,
          [
            [
              "CEP",
              safe(
                b.location.cep
              ),
            ],

            [
              "Rua",
              safe(
                b.location.streetName
              ),
            ],

            [
              "Número",
              safe(
                b.location.numberHouse
              ),
            ],

            [
              "Bairro",
              safe(
                b.location.neighborhood
              ),
            ],

            [
              "Cidade",
              safe(
                b.location.city
              ),
            ],

            [
              "Criado em",
              safe(
                formatDate(
                  b.location.created_at
                )
              ),
            ],

            [
              "Atualizado em",
              safe(
                formatDate(
                  b.location.updated_at
                )
              ),
            ],

            [
              "Apagado em",
              b.location.deleted_at
                ? safe(
                    formatDate(
                      b.location.deleted_at
                    )
                  )
                : "Não",
            ],
          ]
        );
      }

      // ───────────────────────────────────────────────────────
      // UBS VINCULADA
      // ───────────────────────────────────────────────────────

      if (
        b.typeBenefit ===
          "Administrativo" &&
        b.ubs
      ) {
        currentY =
          drawSectionHeader(
            doc,
            "UBS Vinculada",
            currentY
          );

        currentY = drawTable(
          doc,
          currentY,
          [
            [
              "ID UBS",
              safe(
                b.ubs.id
              ),
            ],

            [
              "Nome",
              safe(
                b.ubs.user
                  ?.name
              ),
            ],

            [
              "Email",
              safe(
                b.ubs.user
                  ?.email
              ),
            ],

            [
              "Perfil",
              safe(
                translate(
                  b.ubs.user
                    ?.role
                )
              ),
            ],

            [
              "Trocar senha",
              b.ubs.user
                ?.must_change_password
                ? "Sim"
                : "Não",
            ],

            [
              "CEP",
              safe(
                b.ubs.location
                  ?.cep
              ),
            ],

            [
              "Rua",
              safe(
                b.ubs.location
                  ?.streetName
              ),
            ],

            [
              "Número",
              safe(
                b.ubs.location
                  ?.numberHouse
              ),
            ],

            [
              "Bairro",
              safe(
                b.ubs.location
                  ?.neighborhood
              ),
            ],

            [
              "Cidade",
              safe(
                b.ubs.location
                  ?.city
              ),
            ],

            [
              "Criado em",
              safe(
                formatDate(
                  b.ubs.created_at
                )
              ),
            ],

            [
              "Atualizado em",
              safe(
                formatDate(
                  b.ubs.updated_at
                )
              ),
            ],
          ]
        );
      }

      // ───────────────────────────────────────────────────────
      // STATUS DO BENEFICIÁRIO
      // ───────────────────────────────────────────────────────

      if (b.status) {
        currentY =
          drawSectionHeader(
            doc,
            "Status do Beneficiário",
            currentY
          );

        currentY = drawTable(
          doc,
          currentY,
          [
            [
              "Status UBS",
              safe(
                b.status
                  .ubsStatus
              ),
            ],

            [
              "Obs UBS",
              safe(
                b.status
                  .observationUbs
              ),
            ],

            [
              "Documento UBS",
              safe(
                b.status
                  .documentationStatusUbs
              ),
            ],

            [
              "Status Secretaria",
              safe(
                b.status
                  .secretaryStatus
              ),
            ],

            [
              "Obs Secretaria",
              safe(
                b.status
                  .observationSecretary
              ),
            ],

            [
              "Documento Secretaria",
              safe(
                b.status
                  .documentationStatusSecretary
              ),
            ],

            [
              "Última verificação",
              safe(
                formatDate(
                  b.status.lastCheck
                )
              ),
            ],

            [
              "Criado em",
              safe(
                formatDate(
                  b.status.created_at
                )
              ),
            ],

            [
              "Atualizado em",
              safe(
                formatDate(
                  b.status.updated_at
                )
              ),
            ],

            [
              "Apagado em",
              b.status.deleted_at
                ? safe(
                    formatDate(
                      b.status.deleted_at
                    )
                  )
                : "Não",
            ],
          ]
        );
      }
    }

    // ─────────────────────────────────────────────────────────
    // RODAPÉ
    // ─────────────────────────────────────────────────────────

    const totalPages =
      doc.internal.getNumberOfPages();

    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      doc.setPage(i);

      // Linha do rodapé
      doc.setDrawColor(
        ...COLORS.gray200
      );

      doc.setLineWidth(0.3);

      doc.line(
        14,
        pageHeight - 14,
        pageWidth - 14,
        pageHeight - 14
      );

      // Bloco azul
      doc.setFillColor(
        ...COLORS.primary
      );

      doc.rect(
        14,
        pageHeight - 13,
        4,
        4,
        "F"
      );

      // Nome do sistema
      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8);

      doc.setTextColor(
        ...COLORS.gray600
      );

      doc.text(
        "Sistema de Distribuição de Fraldas",
        21,
        pageHeight - 10
      );

      // Número da página
      doc.text(
        `Página ${i} de ${totalPages}`,
        pageWidth - 14,
        pageHeight - 10,
        {
          align: "right",
        }
      );
    }

    // ─────────────────────────────────────────────────────────
    // DOWNLOAD
    // ─────────────────────────────────────────────────────────

    doc.save(
      `agendamento_${scheduling.id}.pdf`
    );
  };

  // ─────────────────────────────────────────────────────────────
  // GERAÇÃO AUTOMÁTICA
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (
      scheduling &&
      !pdfGenerated.current
    ) {
      pdfGenerated.current = true;
      generatePdf();
    }
  }, [scheduling]);

  // ─────────────────────────────────────────────────────────────
  // TELA
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      <Title
        title="Gerar PDF do Agendamento"
        subtitle="O PDF será baixado automaticamente."
        back="true"
      />

      {message && (
        <Alert
          type="success"
          message={message}
        />
      )}

      {error && (
        <Alert
          type="error"
          message={error}
        />
      )}

      {!scheduling &&
        !error && (
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