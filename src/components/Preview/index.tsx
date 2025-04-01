import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { type Dayjs } from "dayjs";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { observer } from "mobx-react-lite";
import { Box, Stack } from "@mui/material";

import avatar from "../../assets/images/avatar.png";
import { createExperienceSectionDocx } from "../../helpers/create-experience-section-docx";
import { createMainPageDocx } from "../../helpers/create-main-page-docx";
import { createTableRows } from "../../helpers/create-table-rows";
import { experiencesForPage } from "../../helpers/experiences-for-page";
import { getBase64Image } from "../../helpers/get-base64-image";
import { experienceDataStore } from "../../stores/experience-store";
import { personalDataStore } from "../../stores/personal-data-store";
import { skillsDataStore } from "../../stores/skills-store";
import { ButtonAdd } from "../ButtonAdd";
import { type SkillsType } from "../Skills/types";
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
  const { personalData } = personalDataStore;
  const { dataSkills } = skillsDataStore;

  const experiences = Object.entries(dataExperience);

  const experiencesPages = experiencesForPage(experiences, 2);

  const tableRows = createTableRows(dataSkills);

  // Функция для создания таблицы навыков
  const createSkillsTable = (tableRows: [string, SkillsType[]][]) => {
    const rows = [];

    // Заголовки таблицы
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Навыки")],
            width: { size: 3000, type: WidthType.DXA },
          }),
          new TableCell({
            children: [new Paragraph("Уровень")],
            width: { size: 2000, type: WidthType.DXA },
          }),
          new TableCell({
            children: [new Paragraph("Опыт")],
            width: { size: 2000, type: WidthType.DXA },
          }),
          new TableCell({
            children: [new Paragraph("Год")],
            width: { size: 3000, type: WidthType.DXA },
          }),
        ],
      })
    );

    // Добавляем строки с данными
    tableRows.forEach(([groupName, skills]) => {
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(groupName)],
              columnSpan: 4,
              shading: {
                fill: "#EFEFEF",
              },
            }),
          ],
        })
      );

      skills.forEach((skill) => {
        rows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(skill.skill)] }),
              new TableCell({ children: [new Paragraph(skill.level)] }),
              new TableCell({
                children: [new Paragraph(skill.experienceYears + " года")],
              }),
              new TableCell({
                children: [new Paragraph(String((skill.year as Dayjs).year()))],
              }),
            ],
          })
        );
      });
    });

    return new Table({
      rows,
      width: { size: 10000, type: WidthType.DXA },
      borders: {
        top: { style: "single", size: 1, color: "000000" },
        bottom: { style: "single", size: 1, color: "000000" },
        left: { style: "single", size: 1, color: "000000" },
        right: { style: "single", size: 1, color: "000000" },
        insideHorizontal: { style: "single", size: 1, color: "000000" },
        insideVertical: { style: "single", size: 1, color: "000000" },
      },
    });
  };

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
        pdf.save(`${personalData.firstName} ${personalData.secondName[0]}.pdf`);
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

  const handleDownloadDocx = async () => {
    try {
      const avatarBase64 = await getBase64Image(avatar);

      const mainPage = createMainPageDocx(
        avatarBase64,
        i18n.language,
        t("cv.experience.teamSize"),
        t("cv.experience.projectDescription"),
        t("cv.experience.achievements"),
        t("cv.experience.technologies"),
        experiences[0][1],
        personalData
      );

      const experiencePages = experiencesPages.map((page) => {
        return {
          properties: {
            page: {
              margin: {
                top: 360,
                bottom: 360,
                left: 360,
                right: 360,
              },
            },
          },
          children: page.flatMap((experience) => {
            return createExperienceSectionDocx(
              experience[1],
              i18n.language,
              t("cv.experience.teamSize"),
              t("cv.experience.projectDescription"),
              t("cv.experience.achievements"),
              t("cv.experience.technologies")
            );
          }),
        };
      });

      const skillsTable = createSkillsTable(tableRows);

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              },
            },
            children: [mainPage],
          },
          ...experiencePages,
          {
            properties: {
              page: {
                margin: {
                  top: 360,
                  bottom: 360,
                  left: 360,
                  right: 360,
                },
              },
            },
            children: [skillsTable],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(
          blob,
          `${personalData.firstName} ${personalData.secondName[0]}.docx`
        );
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
          disabled={!personalData.firstName && !personalData.secondName}
          handleClick={handleDownloadPdf}
        >
          {t("cv.downloadPdf")}
        </ButtonAdd>
        <ButtonAdd
          disabled={!personalData.firstName && !personalData.secondName}
          handleClick={handleDownloadDocx}
        >
          {t("cv.downloadDocx")}
        </ButtonAdd>
      </Stack>
    </>
  );
});
