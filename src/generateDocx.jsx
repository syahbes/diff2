import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const createTextRun = (options) => {
  return new TextRun({ font: "Arial", rightToLeft: true, break: true, ...options });
};

const createParagraph = (options) => {
  return new Paragraph({ font: "Arial", spacing: { after: 120 }, alignment: "center", ...options });
};

const generateDocx = (state) => {
  const titleTextRun = createTextRun({ text: "הסכם שכירות", bold: true, size: 28 });
  const titleParagraph = createParagraph({ children: [titleTextRun], spacing: { after: 240 } });

  const textRuns = [
    createTextRun({ text: "בין" }),
    createTextRun({ text: "מר / גברת" }),
    createTextRun({ text: "ת.ז." }),
    createTextRun({ text: "מרחוב" }),
    createTextRun({ text: "טלפון" }),
    createTextRun({ text: '(להלן : "המשכיר")' }),
    createTextRun({ text: "ובין" }),
    createTextRun({ text: '(להלן : "השוכר/ים")' }),
  ];

  const mainParagraph = createParagraph({ children: textRuns });

  // const firstParagraph = createParagraph({ children: [createTextRun({ text: "הסכם שכירות" })], spacing: { after: 120 } });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          titleParagraph,
          mainParagraph,
          // firstParagraph,
          // Other Paragraphs, tables, etc.
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "הסכם-שכירות.docx");
  });
};

export default generateDocx;