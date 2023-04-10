import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const DocxPage = () => {

  const generate = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Hello World"),
                new TextRun({
                  text: "Foo Bar",
                  bold: true,
                }),
                new TextRun({
                  text: "\tGithub is the best",
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

  return (
    <div>
      <h1>DocxPage</h1>
      <button onClick={generate}>Generate</button>
    </div>

  )
};
export default DocxPage;