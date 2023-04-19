import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const generateDocx = (state) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun(state.card1Input2),
              new TextRun("Hello World"),
              new TextRun({
                text: state.card1Input1,
                bold: true,
              }),
              new TextRun({
                text: "\t Github is the best",
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
};
export default generateDocx;
