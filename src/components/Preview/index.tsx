import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { observer } from "mobx-react-lite";
import { Box, Stack } from "@mui/material";

import avatar from "../../assets/images/avatar.png";
import { createListItemsString } from "../../helpers/create-list-items-string";
import { experiencesForPage } from "../../helpers/experiences-for-page";
import { getDate } from "../../helpers/get-date";
import { experienceDataStore } from "../../stores/experience-store";
import { personalDataStore } from "../../stores/personal-data-store";
import { ButtonAdd } from "../ButtonAdd";
import { ExperiencesPage } from "./ExperiencesPage";
import { MainPage } from "./MainPage";
import { SkillsPage } from "./SkillsPage";
import { stylesPage } from "./styles";

export const Preview = observer(() => {
  const { t, i18n } = useTranslation();
  const mainPageRef = useRef<HTMLDivElement>(null);
  const experiencesPageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillsPageRef = useRef<HTMLDivElement>(null);

  const { dataExperience } = experienceDataStore;
  const {
    personalData: {
      firstName,
      secondName,
      skills,
      about,
      level,
      education,
      position,
    },
  } = personalDataStore;

  const experiences = Object.entries(dataExperience);

  const experiencesPages = experiencesForPage(experiences, 2);

  const handleDownloadPdf = () => {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const allRefs = [
      mainPageRef.current,
      ...experiencesPageRefs.current.filter(Boolean),
      skillsPageRef.current,
    ].filter(Boolean);

    const processPage = (index: number) => {
      if (index >= allRefs.length) {
        pdf.save(`${firstName} ${secondName[0]}.pdf`);
        return;
      }

      const page = allRefs[index];
      html2canvas(page!, {
        scale: 3,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.8);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;

        const pdfWidth = pageWidth;
        const pdfHeight = pageWidth / ratio;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

        if (index < allRefs.length - 1) {
          pdf.addPage();
        }

        processPage(index + 1);
      });
    };
    processPage(0);
  };

  const getBase64Image = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL.split(",")[1]);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  function createParagraphs(text: string) {
    return text.split("\n").map(
      (paragraphText) =>
        new Paragraph({
          children: [
            new TextRun({
              text: paragraphText.trim(),
              font: "Calibri",
              size: 22,
              color: "#878787",
            }),
          ],
          alignment: "both",
          wordWrap: true,
        })
    );
  }

  const handleDownloadWordx = async () => {
    try {
      const logoBase64 = await getBase64Image(avatar);

      const table = new Table({
        rows: [
          new TableRow({
            height: {
              value: "842pt",
              rule: "auto",
            },
            children: [
              new TableCell({
                width: {
                  size: 25,
                  type: WidthType.PERCENTAGE,
                },
                shading: {
                  fill: "#2C3144",
                },
                margins: {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
                children: [
                  new Table({
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            width: {
                              size: 1500,
                              type: WidthType.DXA,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new ImageRun({
                                    type: "png",
                                    data: logoBase64,
                                    transformation: {
                                      width: 150,
                                      height: 150,
                                    },
                                  }),
                                ],
                                alignment: "center",
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 3539,
                              type: WidthType.DXA,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${firstName} ${secondName[0]}.`,
                                    font: "Calibri",
                                    bold: true,
                                    size: 28,
                                  }),
                                ],
                                alignment: "left",
                              }),
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: position,
                                    font: "Calibri",
                                    size: 24,
                                    color: "#C3C2C2",
                                  }),
                                ],
                                spacing: {
                                  before: 60,
                                },
                                alignment: "left",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 4039,
                      type: WidthType.DXA,
                    },
                    borders: {
                      top: { style: "none", size: 0, color: "FFFFFF" },
                      bottom: { style: "none", size: 0, color: "FFFFFF" },
                      left: { style: "none", size: 0, color: "FFFFFF" },
                      right: { style: "none", size: 0, color: "FFFFFF" },
                      insideHorizontal: {
                        style: "none",
                        size: 0,
                        color: "FFFFFF",
                      },
                      insideVertical: {
                        style: "none",
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                  // Заголовок "Навыки"
                  new Paragraph({
                    indent: {
                      left: 240,
                    },
                    children: [
                      new TextRun({
                        text: "Навыки",
                        font: "Calibri",
                        size: 28,
                        color: "FFFFFF",
                      }),
                    ],
                    spacing: {
                      before: 180,
                    },
                    alignment: "left",
                  }),
                  ...createListItemsString(skills, "skills").map(
                    (skill) =>
                      new Paragraph({
                        indent: {
                          left: 240,
                        },
                        children: [
                          new TextRun({
                            text: "• ",
                            font: "Symbol",
                            size: 24,
                            color: "#C3C2C2",
                          }),
                          new TextRun({
                            text: skill,
                            font: "Calibri",
                            size: 24,
                            color: "#C3C2C2",
                          }),
                        ],
                        alignment: "left",
                      })
                  ),
                  // заголовок Языки
                  new Paragraph({
                    indent: {
                      left: 240,
                    },
                    children: [
                      new TextRun({
                        text: "Языки",
                        font: "Calibri",
                        size: 28,
                        color: "FFFFFF",
                      }),
                    ],
                    spacing: {
                      before: 180,
                    },
                    alignment: "left",
                  }),
                  new Paragraph({
                    indent: {
                      left: 240,
                    },
                    children: [
                      new TextRun({
                        text: `Английский ${level}`,
                        font: "Calibri",
                        size: 24,
                        color: "#C3C2C2",
                      }),
                    ],
                    spacing: {
                      after: 180,
                    },
                    alignment: "left",
                  }),
                  // заголовок Образование
                  new Paragraph({
                    indent: {
                      left: 240,
                    },
                    children: [
                      new TextRun({
                        text: "Образование",
                        font: "Calibri",
                        size: 28,
                        color: "FFFFFF",
                      }),
                    ],
                    alignment: "left",
                  }),
                  new Paragraph({
                    indent: {
                      left: 240,
                    },
                    children: [
                      new TextRun({
                        text: education,
                        font: "Calibri",
                        size: 24,
                        color: "#C3C2C2",
                      }),
                    ],
                    spacing: {
                      after: 180,
                    },
                    alignment: "left",
                  }),
                ],
              }),
              // правая колонка
              new TableCell({
                width: {
                  size: 75,
                  type: WidthType.PERCENTAGE,
                },
                margins: {
                  top: 240,
                  bottom: 240,
                  left: 240,
                  right: 540,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "О разработчике",
                        font: "Calibri",
                        size: 28,
                        bold: true,
                        color: "#878787",
                      }),
                    ],
                    alignment: "left",
                  }),
                  // Гор. линия серая
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: ".",
                        font: "Calibri",
                        color: "#D9D9D9",
                        size: 8,
                      }),
                    ],
                    shading: {
                      fill: "#D9D9D9",
                    },
                    spacing: {
                      before: 60,
                      after: 60,
                    },
                  }),
                  ...createParagraphs(about),
                  // заголовок Опыт
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Опыт",
                        font: "Calibri",
                        size: 28,
                        bold: true,
                        color: "#878787",
                      }),
                    ],
                    alignment: "left",
                  }),
                  // Горизонтальная линия серого цвета
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: ".",
                        font: "Calibri",
                        color: "#D9D9D9",
                        size: 8,
                      }),
                    ],
                    shading: {
                      fill: "#D9D9D9",
                    },
                    spacing: {
                      before: 60,
                      after: 60,
                    },
                  }),
                  // общий блок для каждого нового Опыта
                  // Позиция и время начала/конца
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: experiences[0][1].position + " | ",
                        font: "Calibri",
                        size: 22,
                        bold: true,
                      }),
                      new TextRun({
                        text: getDate(
                          i18n.language,
                          experiences[0][1].isCurrent,
                          experiences[0][1].start,
                          experiences[0][1].end
                        ),
                        font: "Calibri",
                        size: 22,
                      }),
                    ],
                    alignment: "left",
                    spacing: {
                      after: 180,
                    },
                  }),
                  // Размер команды
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Размер команды: ",
                        font: "Calibri",
                        size: 22,
                        bold: true,
                      }),
                      new TextRun({
                        text: experiences[0][1].teamSize,
                        font: "Calibri",
                        size: 22,
                      }),
                    ],
                    alignment: "left",
                    spacing: {
                      after: 180,
                    },
                  }),
                  // Описание проекта
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Описание проекта:",
                        font: "Calibri",
                        size: 22,
                        bold: true,
                      }),
                    ],
                    alignment: "left",
                  }),
                  ...createParagraphs(experiences[0][1].project),
                  // Заголовок "Обязанности и достижения"
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Обязанности и достижения:",
                        font: "Calibri",
                        size: 22,
                        bold: true,
                      }),
                    ],
                    spacing: {
                      before: 180,
                    },
                    alignment: "left",
                  }),
                  ...createListItemsString(
                    experiences[0][1].achievements,
                    "achievements"
                  ).map(
                    (skill) =>
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "• " + skill,
                            font: "Calibri",
                            color: "#8A9090",
                            size: 22,
                          }),
                        ],
                        alignment: "both",
                        spacing: {
                          line: 300,
                        },
                        wordWrap: true,
                      })
                  ),
                  // Технологии
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Технологии:",
                        font: "Calibri",
                        size: 22,
                        bold: true,
                      }),
                    ],
                    alignment: "left",
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: experiences[0][1].technologies,
                        font: "Calibri",
                        color: "#8A9090",
                        size: 22,
                      }),
                    ],
                    spacing: {
                      before: 180,
                    },
                    alignment: "left",
                  }),
                ],
              }),
            ],
          }),
        ],
        width: {
          size: 12240,
          type: WidthType.DXA,
        },
        borders: {
          top: { style: "none", size: 0, color: "FFFFFF" },
          bottom: { style: "none", size: 0, color: "FFFFFF" },
          left: { style: "none", size: 0, color: "FFFFFF" },
          right: { style: "none", size: 0, color: "FFFFFF" },
          insideHorizontal: { style: "none", size: 0, color: "FFFFFF" },
          insideVertical: { style: "none", size: 0, color: "FFFFFF" },
        },
        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      });

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 20,
                },
              },
            },
            children: [table],
          },
        ],
      });

      // Генерация DOCX
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${firstName} ${secondName[0]}.docx`);
      });
    } catch (error) {
      console.error("Ошибка при создании DOCX:", error);
    }
  };

  return (
    <>
      <Stack spacing={1.5} direction="column">
        <Box sx={stylesPage} ref={mainPageRef}>
          <MainPage />
        </Box>
        {!!experiencesPages.length &&
          experiencesPages.map((item, i) => (
            <Box
              key={i}
              sx={stylesPage}
              ref={(el) => {
                experiencesPageRefs.current[i] = el as HTMLDivElement | null;
              }}
            >
              <ExperiencesPage experiences={item} />
            </Box>
          ))}
        <Box sx={stylesPage} ref={skillsPageRef}>
          <SkillsPage />
        </Box>
        <ButtonAdd
          disabled={!firstName && !secondName}
          handleClick={handleDownloadPdf}
        >
          {t("cv.downloadPdf")}
        </ButtonAdd>
        <ButtonAdd
          disabled={!firstName && !secondName}
          handleClick={handleDownloadWordx}
        >
          Скачать DOCX
        </ButtonAdd>
      </Stack>
    </>
  );
});
