import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Rubik",
  src: "/4sMyW_teKWHB3K8Hm-Il6A.ttf",
});

const TextRTL = ({ text, isRTL }) => {
  const styles = StyleSheet.create({
    textContainer: {
      display: "flex",
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      marginBottom: "10px",
    },
    text: {
      ...(isRTL ? { marginLeft: 2.5 } : { marginRight: 2.5 }),
    },
  });
  return (
    <View style={styles.textContainer}>
      {text.split(" ").map((item) => (
        <Text style={styles.text}>{item}</Text>
      ))}
    </View>
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    writingMode: "vertical-rl", // set writing mode to vertical right-to-left
    direction: "rtl", // set text direction to right-to-left
    fontFamily: "Rubik",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontSize: 12
  },
  section: {
    writingMode: "horizontal-tb", // revert writing mode to horizontal left-to-right
    direction: "ltr", // revert text direction to left-to-right
    fontFamily: "Rubik",
    margin: 10,
    padding: 10,
    textAlign: "right",
  },
  text: {
    writingMode: "horizontal-tb", // revert writing mode to horizontal left-to-right
    direction: "ltr", // revert text direction to left-to-right
    fontFamily: "Rubik",
    textAlign: "right",
  },
});
// Create Document Component
const PDFDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>קצת טקטס בעברית!</Text>
      </View>

      <View style={styles.section}>

      <TextRTL
          text='1.1 המשכיר משכיר בזה לשוכר, והשוכר שוכר בזה מהמשכיר את הדירה, החל  מתאריך ועד לתאריך 28.04.2023 להלן: "תקופת השכירות"'
          isRTL={true}
        />


        <TextRTL
          text="1.2 השוכר רשאי לסיים את תקופת השכירות בכל עת, בהודעה של שישים (60) ימים מראש, וזאת בתנאי שהציע למשכיר שוכר חלופי שקיבל על עצמו בכתב את כל התחייבויות השוכר לפי הסכם זה לתקופת השכירות הנותרת. המשכיר לא יסרב לאשר את השוכר החליפי, אלא מטעמים סבירים."
          isRTL={true}
        />
      </View>
    </Page>
  </Document>
);

export default PDFDoc;
