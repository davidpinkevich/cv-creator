import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { type Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { createTableRows } from "../../../helpers/create-table-rows";
import { skillsDataStore } from "../../../stores/skills-store";
import { Typography } from "../../Typography";
import { stylesPage } from "../styles";

export const SkillsPage = observer(() => {
  const { t } = useTranslation();
  const { dataSkills } = skillsDataStore;

  const tableRows = createTableRows(dataSkills);

  console.log("tableRows: ", tableRows);

  return (
    <Box sx={{ ...stylesPage, padding: "20px" }}>
      <Typography color="#878787" fsz={14} fw={700}>
        {t("cv.skillsPage.title")}
      </Typography>
      <Box
        mb={1.5}
        sx={{
          backgroundColor: "#D9D9D9",
          height: "4px",
        }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ padding: "120px" }}>
          <TableHead>
            <TableRow>
              <TableCell
                padding="none"
                align="left"
                sx={{ paddingLeft: "0.5rem" }}
              >
                <Typography fsz={12} fw={700}>
                  {t("cv.skillsPage.skills")}
                </Typography>
              </TableCell>
              <TableCell padding="none" align="left">
                <Typography fsz={12} fw={700}>
                  {t("cv.skillsPage.level")}
                </Typography>
              </TableCell>
              <TableCell padding="none" align="left">
                <Typography fsz={12} fw={700}>
                  {t("cv.skillsPage.experienceYears")}
                </Typography>
              </TableCell>
              <TableCell padding="none" align="left">
                <Typography fsz={12} fw={700}>
                  {t("cv.skillsPage.year")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map(([group, items], i) => (
              <Fragment key={i}>
                <TableRow
                  sx={{ fontStyle: "italic", backgroundColor: "#F2F2F2" }}
                >
                  <TableCell
                    colSpan={4}
                    padding="none"
                    align="left"
                    sx={{ paddingLeft: "0.5rem" }}
                  >
                    <Typography fsz={12} fw={700} sx={{ fontStyle: "italic" }}>
                      {group}
                    </Typography>
                  </TableCell>
                </TableRow>
                {items.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell
                        width="25%"
                        padding="none"
                        align="left"
                        sx={{ paddingLeft: "0.5rem" }}
                      >
                        <Typography fsz={12} sx={{ fontStyle: "italic" }}>
                          {item.skill}
                        </Typography>
                      </TableCell>
                      <TableCell width="25%" padding="none" align="left">
                        <Typography fsz={12} sx={{ fontStyle: "italic" }}>
                          {item.level}
                        </Typography>
                      </TableCell>
                      <TableCell width="25%" padding="none" align="left">
                        <Typography fsz={12} sx={{ fontStyle: "italic" }}>
                          {item.experienceYears}
                        </Typography>
                      </TableCell>
                      <TableCell width="25%" padding="none" align="left">
                        <Typography fsz={12} sx={{ fontStyle: "italic" }}>
                          {(item.year as Dayjs).year()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});
