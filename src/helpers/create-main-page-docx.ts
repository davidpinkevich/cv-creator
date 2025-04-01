import {
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

import { type ExperienceType } from "../components/Experience/types";
import { type PersonalDataFormType } from "../components/PersonalData/types";
import { createExperienceSectionDocx } from "./create-experience-section-docx";
import { createListItemsString } from "./create-list-items-string";
import { createParagraphs } from "./create-paragraphs";

export function createMainPageDocx(
  logoBase64: string,
  dateLang: string,
  titleTeamSize: string,
  projectDescription: string,
  titleAchievements: string,
  titleTechnologies: string,
  experience: ExperienceType,
  {
    about,
    firstName,
    secondName,
    position,
    skills,
    education,
    level,
  }: PersonalDataFormType
) {
  return new Table({
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
              ...createExperienceSectionDocx(
                experience,
                dateLang,
                titleTeamSize,
                projectDescription,
                titleAchievements,
                titleTechnologies
              ),
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
}
