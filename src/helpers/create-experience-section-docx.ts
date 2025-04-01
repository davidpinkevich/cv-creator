import { Paragraph, TextRun } from "docx";

import { type ExperienceType } from "../components/Experience/types";
import { createListItemsString } from "./create-list-items-string";
import { createParagraphs } from "./create-paragraphs";
import { getDate } from "./get-date";

export function createExperienceSectionDocx(
  experience: ExperienceType,
  dateLang: string,
  titleTeamSize: string,
  projectDescription: string,
  titleAchievements: string,
  titleTechnologies: string
) {
  return [
    // общий блок для каждого нового Опыта
    // Позиция и время начала/конца
    new Paragraph({
      children: [
        new TextRun({
          text: experience.position + " | ",
          font: "Calibri",
          size: 22,
          bold: true,
        }),
        new TextRun({
          text: getDate(
            dateLang,
            experience.isCurrent,
            experience.start,
            experience.end
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
          text: titleTeamSize,
          font: "Calibri",
          size: 22,
          bold: true,
        }),
        new TextRun({
          text: " " + experience.teamSize,
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
          text: projectDescription,
          font: "Calibri",
          size: 22,
          bold: true,
        }),
      ],
      alignment: "left",
    }),
    ...createParagraphs(experience.project),
    // Заголовок "Обязанности и достижения"
    new Paragraph({
      children: [
        new TextRun({
          text: titleAchievements,
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
    ...createListItemsString(experience.achievements, "achievements").map(
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
          text: titleTechnologies,
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
    new Paragraph({
      children: [
        new TextRun({
          text: experience.technologies,
          font: "Calibri",
          color: "#8A9090",
          size: 22,
        }),
      ],

      alignment: "left",
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: ".",
          font: "Calibri",
          color: "#D9D9D9",
          size: 4,
        }),
      ],
      shading: {
        fill: "#D9D9D9",
      },
      spacing: {
        before: 60,
        after: 240,
      },
    }),
  ];
}
