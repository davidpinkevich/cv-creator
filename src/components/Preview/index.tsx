import { useRef } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { observer } from "mobx-react-lite";
import { Box, Stack } from "@mui/material";

import { experiencesForPage } from "../../helpers/experiences-for-page";
import { experienceDataStore } from "../../stores/experience-store";
import { personalDataStore } from "../../stores/personal-data-store";
import { ButtonAdd } from "../ButtonAdd";
import { ExperiencesPage } from "./ExperiencesPage";
import { MainPage } from "./MainPage";
import { SkillsPage } from "./SkillsPage";
import { stylesPage } from "./styles";

export const Preview = observer(() => {
  const { t } = useTranslation();
  const mainPageRef = useRef<HTMLDivElement>(null);
  const experiencesPageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillsPageRef = useRef<HTMLDivElement>(null);

  const { dataExperience } = experienceDataStore;
  const {
    personalData: { firstName, secondName },
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
      </Stack>
    </>
  );
});
