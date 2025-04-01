import { Paragraph, TextRun } from "docx";

export function createParagraphs(text: string) {
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
