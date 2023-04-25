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
  family: "Open Sans",
  fonts: [
    {
      src: "/fonts/Open_Sans/static/OpenSans/OpenSans-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/Open_Sans/static/OpenSans/OpenSans-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TextRTL = ({ children, isRTL, style }) => {
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
      {children
        .toString()
        .split(" ")
        .map((item, index) => (
          <Text style={[styles.text, style]} key={index}>
            {item}
          </Text>
        ))}
    </View>
  );
};
TextRTL.defaultProps = {
  isRTL: true,
};

// Create styles
const styles = StyleSheet.create({
  page: {
    writingMode: "vertical-rl", // set writing mode to vertical right-to-left
    direction: "rtl", // set text direction to right-to-left
    fontFamily: "Open Sans",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontSize: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  section: {
    writingMode: "horizontal-tb", // revert writing mode to horizontal left-to-right
    // direction: "ltr", // revert text direction to left-to-right
    fontFamily: "Open Sans",
    margin: 10,
    padding: 10,
    textAlign: "right",
  },
  text: {
    writingMode: "horizontal-tb", // revert writing mode to horizontal left-to-right
    // direction: "ltr", // revert text direction to left-to-right
    fontFamily: "Open Sans",
    textAlign: "right",
  },
  centered: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 12,
  },
});
// Create Document Component
const PDFDoc = ({ state }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.centered}>
        <TextRTL style={{ fontWeight: "bold", fontSize: 20 }}>
          הסכם שכירות
        </TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>בין</TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>מר\גברת _____</TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>ת.ז _____</TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>מרחוב _____</TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>טלפון</TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>) להלן : " המשכיר " (</TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>ובין</TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL>) להלן : " השוכר/ים " (</TextRTL>
      </View>
      <View style={[styles.centered, { margin: 10, padding: 10 }]}>
        <TextRTL>
          {`הואיל והמשכיר הינו בעל הזכויות הרשום והבלעדי של דירה בת ${state.card1Input5} חדרים ברחוב ${state.card1Input2} , מספר ${state.card1Input3}, דירה ${state.card1Input4} בעיר ${state.card1Input1} ) להלן " הדירה " .( והואיל והצדדים מעוניינים להתקשר בהסכם זה, לפיו ישכור השוכר את הדירה מאת המשכיר.`}
        </TextRTL>
      </View>
      <View style={styles.centered}>
        <TextRTL style={{ fontWeight: "bold" }}>
          לפיכך, הוצהר, הותנה והוסכם בין הצדדים, כדלקמן:
        </TextRTL>
      </View>
      <View style={styles.section}>
        <TextRTL style={{ fontWeight: "bold" }}>
          .1 תקופת השכירות וסיומה
        </TextRTL>

        <TextRTL>
          {`1.1 המשכיר משכיר בזה לשוכר, והשוכר שוכר בזה מהמשכיר את הדירה, החל מתאריך ${state.card2Input1} ועד לתאריך ${state.card2Input2} ) להלן : " תקופת השכירות " (`}
        </TextRTL>

        <TextRTL>
          1.2 השוכר רשאי לסיים את תקופת השכירות בכל עת, בהודעה של שישים (60)
          ימים מראש, וזאת בתנאי שהציע למשכיר שוכר חלופי שקיבל על עצמו בכתב את כל
          התחייבויות השוכר לפי הסכם זה לתקופת השכירות הנותרת. המשכיר לא יסרב
          לאשר את השוכר החליפי, אלא מטעמים סבירים.
        </TextRTL>
        <TextRTL>
          1.3 אם השוכר יפנה את הדירה לפני תום תקופת השכירות בניגוד להוראות הסכם
          זה, יהיה עליו להמשיך לעמוד בכל התחייבויותיו לפי הסכם זה, לרבות תשלום
          מלוא דמי השכירות וכל התשלומים השוטפים עד לתום תקופת השכירות.
        </TextRTL>
        <TextRTL>
          1.4 המשכיר יהיה רשאי לסיים את תקופת השכירות באופן מיידי במקרה של הפרה
          יסודית של הסכם זה על ידי השוכר אשר לא תוקנה תוך ארבע עשר (14) ימים
          ממועד מסירת דרישה בכתב לשוכר לתיקון ההפרה.
        </TextRTL>
        <TextRTL>
          1.5 במהלך תקופה של תשעים (90) ימים לפני תום תקופת השכירות, יהיה רשאי
          המשכיר להראות את הדירה לשוכרים פוטנציאליים, בתיאום מראש עם השוכר.
        </TextRTL>
      </View>

      <View style={styles.section}>
        <TextRTL style={{ fontWeight: "bold" }}>.2 דמי השכירות</TextRTL>
        <TextRTL>
          {`2.1 השוכר ישלם למשכיר, במהלך תקופת השכירות, דמי שכירות חודשיים בסך ${formatNumberWithCommas(
            state.card3Input1
          )} ש"ח ) להלן: " דמי השכירות " ( . דמי השכירות ישולמו על ידי השוכר למשכיר מידי חודש בחודשו במהלך תקופת השכירות, ב- ${
            state.card3Input3
          } לכל חודש.`}
        </TextRTL>
        {state.card3Input2 > 1 && (
          <View>
            <TextRTL>מוסכם כי דמי השכירות יחולקו באופן הבא:</TextRTL>
            <TextRTL>שוכר 1 - יושלם בהמשך.</TextRTL>
            <TextRTL>שוכר 2 - יושלם בהמשך.</TextRTL>
          </View>
        )}
        {state.card3Input2 > 2 && <TextRTL>שוכר 3 - יושלם בהמשך.</TextRTL>}
        <TextRTL>
          מוסכם, כי אי תשלום דמי השכירות במלואם ובמועדם ייחשב להפרה יסודית של
          השוכר.
        </TextRTL>
        <TextRTL>
          2.2 הצדדים מאשרים כי דמי השכירות נקבעו לאחר שניתן לשוכר מידע בדבר דמי
          השכירות ששולמו בגין השכרת הדירה בשנים עשר (12) החודשים שקדמו למועד
          החתימה על הסכם זה, ככל שהשוכר ביקש לקבל מידע זה.
        </TextRTL>
        <TextRTL>
          2.3 בכל מקרה של אי תשלום בפועל של דמי השכירות, במלואם ובמועדם, השוכר
          מתחייב להסדיר באופן מידי את התשלום במלואו. מבלי לגרוע מיתר הוראות הסכם
          זה, במקרה שדמי השכירות לא שולמו תוך שבעה (7) ימים מהמועד שנקבע
          לתשלומם, יתווסף לכל חלק מדמי השכירות שטרם שולם פיצוי מוסכם בסך 150 ש"ח
          עבור כל יום נוסף בו לא הוסדר התשלום.
        </TextRTL>
      </View>
      <View style={styles.section}>
        <TextRTL style={{ fontWeight: "bold" }}>.3 תקופת האופציה</TextRTL>

        {!state.card2Input3 ? (
          <TextRTL>ללא תקופת אופציה</TextRTL>
        ) : (
          <TextRTL>
            {`3.1 השוכר רשאי להאריך את תוקף הסכם זה ממועד סיום תקופת השכירות, קרי תאריך ${state.card2Input2} ועד לתאריך ${state.card2Input4} ") להלן: " האופציה " ו " תקופת האופציה " ( , באמצעות הודעה בכתב למשכיר לפחות שישי (60) ימים טרם תום תקופת השכירות, והכל בכפוף לכך שהשוכר עמד במלוא התחייבויותיו על פי הסכם זה ולא הפר אותו בתקופת השכירות. המשכיר יהיה רשאי להעלות את דמי השכירות בתקופת האופציה בלא יותר משלושה אחוזים (3%) לשנה או גובה שיעור השינוי במדד המחירים לצרכן על פני תקופת השכירות, הגבוה מביניהם.`}
          </TextRTL>
        )}
      </View>
    </Page>
  </Document>
);

export default PDFDoc;
