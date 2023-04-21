import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const createTextRun = (options) => {
  return new TextRun({
    font: "Arial",
    rightToLeft: true,
    break: 2,
    ...options,
  });
};

const createParagraph = (options) => {
  return new Paragraph({
    font: "Arial",
    alignment: "right",
    spacing: { after: 120 },
    ...options,
  });
};

const generateDocx = (state) => {
  const titleTextRun = createTextRun({
    text: "הסכם שכירות",
    bold: true,
    size: 28,
    break: false,
  });
  const titleParagraph = createParagraph({
    children: [titleTextRun],
    alignment: "center",
  });

  const introTextRuns = [
    createTextRun({ text: "בין", break: true }),
    createTextRun({ text: "מר / גברת", break: true }),
    createTextRun({ text: "ת.ז.", break: true }),
    createTextRun({ text: "מרחוב", break: true }),
    createTextRun({ text: "טלפון", break: true }),
    createTextRun({ text: '(להלן : "המשכיר")', break: true }),
    createTextRun({ text: "ובין", break: true }),
    createTextRun({ text: '(להלן : "השוכר/ים")', break: true }),
  ];

  const introPparagraph = createParagraph({
    children: introTextRuns,
    alignment: "center",
  });

  const paragraph0 = createParagraph({
    children: [
      createTextRun({
        text: `הואיל והמשכיר הינו בעל הזכויות הרשום והבלעדי של דירה בת ${state.card1Input5} חדרים ברחוב ${state.card1Input2} , מספר ${state.card1Input3}, דירה ${state.card1Input4} בעיר ${state.card1Input1} (להלן "הדירה"); והואיל והצדדים מעוניינים להתקשר בהסכם זה, לפיו ישכור השוכר את הדירה מאת המשכיר. `,
      }),
    ],
  });
  const subTitleParagraph = createParagraph({
    children: [
      createTextRun({
        text: "לפיכך, הוצהר, הותנה והוסכם בין הצדדים, כדלקמן:",
        bold: true,
        size: 22,
        break: true,
      }),
    ],
    alignment: "center",
  });

  const p1TextRuns = [
    createTextRun({
      text: "1. תקופת השכירות וסיומה",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: `1.1 המשכיר משכיר בזה לשוכר, והשוכר שוכר בזה מהמשכיר את הדירה, החל
  מתאריך ${state.card2Input1} ועד לתאריך
  ${state.card2Input2} (להלן: "תקופת השכירות")`,
    }),
    createTextRun({
      text: "1.2 השוכר רשאי לסיים את תקופת השכירות בכל עת, בהודעה של שישים (60) ימים מראש, וזאת בתנאי שהציע למשכיר שוכר חלופי שקיבל על עצמו בכתב את כל התחייבויות השוכר לפי הסכם זה לתקופת השכירות  הנותרת. המשכיר לא יסרב לאשר את השוכר החליפי, אלא מטעמים סבירים.",
    }),
    createTextRun({
      text: "1.3 אם השוכר יפנה את הדירה לפני תום תקופת השכירות בניגוד להוראות הסכם זה, יהיה עליו להמשיך לעמוד בכל התחייבויותיו לפי הסכם זה, לרבות תשלום מלוא דמי השכירות וכל התשלומים השוטפים עד לתום תקופת השכירות.",
    }),
    createTextRun({
      text: "1.4 המשכיר יהיה רשאי לסיים את תקופת השכירות באופן מיידי במקרה של הפרה יסודית של הסכם זה על ידי השוכר אשר לא תוקנה תוך ארבע עשר (14) ימים ממועד מסירת דרישה בכתב לשוכר לתיקון ההפרה.",
    }),
    createTextRun({
      text: " 1.5 במהלך תקופה של תשעים (90) ימים לפני תום תקופת השכירות, יהיה רשאי המשכיר להראות את הדירה לשוכרים פוטנציאליים, בתיאום מראש עם השוכר.",
    }),
  ];

  const paragraph1 = createParagraph({
    children: p1TextRuns,
  });

  const p2TextRuns = [
    createTextRun({
      text: "2. דמי השכירות",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: `2.1 השוכר ישלם למשכיר, במהלך תקופת השכירות, דמי שכירות חודשיים בסך ${formatNumberWithCommas(
        state.card3Input1
      )} ש"ח (להלן: "דמי השכירות"). דמי השכירות ישולמו על ידי השוכר למשכיר מידי חודש בחודשו במהלך תקופת השכירות, ב- ${
        state.card3Input3
      } לכל חודש.`,
    }),
    //TODO add renter 2 and 3
    createTextRun({
      text: `${
        state.card3Input2 > 1
          ? "מוסכם כי דמי השכירות ייחולקו בין השוכרים באופן הבא : ______"
          : ""
      }`,
    }),
    createTextRun({
      text: "מוסכם, כי אי תשלום דמי השכירות במלואם ובמועדם ייחשב להפרה יסודית של השוכר.",
      break: state.card3Input2 > 1 ? 2 : false,
    }),
    createTextRun({
      text: "2.2 הצדדים מאשרים כי דמי השכירות נקבעו לאחר שניתן לשוכר מידע בדבר דמי השכירות ששולמו בגין השכרת הדירה בשנים עשר (12) החודשים שקדמו למועד החתימה על הסכם זה, ככל שהשוכר ביקש לקבל מידע זה.",
    }),
    createTextRun({
      text: '2.3 בכל מקרה של אי תשלום בפועל של דמי השכירות, במלואם ובמועדם, השוכר מתחייב להסדיר באופן מידי את התשלום במלואו. מבלי לגרוע מיתר הוראות הסכם זה, במקרה שדמי השכירות לא שולמו תוך שבעה (7) ימים מהמועד שנקבע לתשלומם, יתווסף לכל חלק מדמי השכירות שטרם שולם פיצוי מוסכם בסך 150 ש"ח עבור כל יום נוסף בו לא הוסדר התשלום.',
    }),
  ];

  const paragraph2 = createParagraph({
    children: p2TextRuns,
  });

  const optionTextRuns = [
    createTextRun({
      text: `3.1 השוכר רשאי להאריך את תוקף הסכם זה ממועד סיום תקופת השכירות, קרי תאריך ${state.card2Input2} ועד לתאריך ${state.card2Input4} (להלן: "האופציה" ו"תקופת האופציה"), באמצעות הודעה בכתב למשכיר לפחות שישי (60) ימים טרם תום תקופת השכירות, והכל בכפוף לכך שהשוכר עמד במלוא התחייבויותיו על פי הסכם זה ולא הפר אותו בתקופת השכירות. המשכיר יהיה רשאי להעלות את דמי השכירות בתקופת האופציה בלא יותר משלושה אחוזים (3%) לשנה או גובה שיעור השינוי במדד המחירים לצרכן על פני תקופת השכירות, הגבוה מביניהם.`,
    }),
    createTextRun({
      text: "3.2 במקרה של מימוש האופציה על ידי השוכר, יחתמו השוכר והמשכיר, לפחות ארבעים וחמישה (45) ימים טרם תחילת תקופת האופציה, על חוזה שכירות. בתקופת האופציה יחולו על הצדדים כל הוראות הסכם זה, בשינויים המחויבים, לרבות כל הוראות ההסכם הנוגעות לתשלום דמי השכירות ותשלומים נוספים.",
    }),
  ];

  const p3TextRuns = [
    createTextRun({
      text: "3. תקופת האופציה",
      bold: true,
      break: true,
    }),
    !state.card2Input3
      ? createTextRun({
          text: "ללא תקופת אופציה",
        })
      : createParagraph({
          children: optionTextRuns,
        }),
  ];

  const paragraph3 = createParagraph({
    children: p3TextRuns,
  });

  const includesPayments = () => {
    let paymentString = "";

    if (state.card3Includes.arnona) {
      paymentString += "ארנונה, ";
    }
    if (state.card3Includes.gas) {
      paymentString += "גז, ";
    }
    if (state.card3Includes.electricity) {
      paymentString += "חשמל, ";
    }
    if (state.card3Includes.internet) {
      paymentString += "אינטרנט, ";
    }
    if (state.card3Includes.water) {
      paymentString += "מים, ";
    }
    if (state.card3Includes.heat) {
      paymentString += "חימום, ";
    }
    if (state.card3Includes.vaad) {
      paymentString += "ועד בית ודמי ניהול, ";
    }
    if (state.card3Includes.tv) {
      paymentString += "טלויזיה בלווין / כבלים, ";
    }

    // Remove the trailing comma and space
    if (paymentString.length > 0) {
      paymentString = paymentString.slice(0, -2);
    }

    return paymentString;
  };

  const p4TextRuns = [
    createTextRun({
      text: "4. מיסים ותשלומים אחרים",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: '4.1 במהלך תקופת השכירות יישא השוכר בכל מס, חיוב, היטל או תשלום אחר בקשר עם החזקת הדירה והשימוש השוטף בה, לרבות ארנונה; גז; חשמל;  אינטרנט; מים; חימום; ועד בית ודמי ניהול; טלויזיה בלוויןכבלים; (להלן ביחד: "התשלומים השוטפים"), ובכל מקרה, למעט תשלומים החלים לפי כל דין על בעל הדירה ואשר לא נקבע במפורש בהסכם זה כי ישולמו על ידי המשכיר. מוסכם, כי אי תשלום התשלומים השוטפים במלואם ובמועדם ייחשב להפרה יסודית של הסכם זה על-ידי השוכר.',
    }),
    createTextRun({
      text: "4.3 השוכר לא יישא בכל מס, חיוב, היטל או תשלום המיועד או קשור לרכישה או לשדרוג של מערכות או מתקנים קבועים המשרתים את הדירה, או את הבית המשותף, למעט התאמות מיוחדות או שיפורים שבוצעו לפי דרישת השוכר, ובכפוף להסכמת המשכיר.",
    }),
    createTextRun({
      text: `${
        state.card3Includes.arnona ||
        state.card3Includes.gas ||
        state.card3Includes.electricity ||
        state.card3Includes.internet ||
        state.card3Includes.water ||
        state.card3Includes.heat ||
        state.card3Includes.vaad ||
        state.card3Includes.tv
          ? `4.4 מוסכם בין הצדדים כי דמי השכירות כוללים בתוכם ${includesPayments()}`
          : ""
      }`,
    }),
  ];

  const paragraph4 = createParagraph({
    children: p4TextRuns,
  });

  const p5TextRuns = [
    createTextRun({
      text: "5. מצב הדירה",
      bold: true,
      break:
        state.card3Includes.arnona ||
        state.card3Includes.gas ||
        state.card3Includes.electricity ||
        state.card3Includes.internet ||
        state.card3Includes.water ||
        state.card3Includes.heat ||
        state.card3Includes.vaad ||
        state.card3Includes.tv
          ? true
          : false,
    }),
    createTextRun({
      text: "5.1 המשכיר מצהיר בזאת כי הדירה ראויה למגורים, ועומדת, בין היתר, בתנאים הבאים: (א) בניית הדירה הושלמה; (ב) לשוכר יש ותהיה גישה חופשית לדירה לאורך כל תקופת השכירות; הדירה כוללת מטבח וחדר שירותים ורחצה (ג) הדירה כוללת מערכות תקינות לאספקת מי שתייה ומי רחצה (כולל מים חמים), ניקוד, חשמל ותאורה; (ד) בדירה יש פתחי אוורור ומכלולים לסגירת פתחים אלו, לרבות דלת כניסה ראשית בעלת אמצעי נעילה; ו-(ה) אין בדירה גורם סיכון בלתי סביר לבריאות או או לביטחון השוכר. הוראה זו הינה הוראה יסודית והפרתה תיחשב להפרה יסודית של הסכם זה על-ידי המשכיר.",
    }),
    createTextRun({
      text: `${
        state.card5Input2 || state.card5Input3
          ? "5.2 השוכר מצהיר כי טרם החתימה על הסכם זה הוא ראה ובדק את הדירה, הבניין ותנאי סביבתם, ועל אף הליקויים והפגמים המפורטים בהמשך, מצא אותם ראויים ומתאימים למטרותיו. השוכר מצהיר כי למעט כמפורט בסעיף 5 זה, הוא שוכר את הדירה כפי שהיא (As is), והוא מוותר על כל טענה לאי-התאמה או פגם, למעט פגמים נסתרים שיש בהם משום הפרעה ממשית לשימוש בדירה ולמעט פגמים שהמשכיר התחייב לתקן בהסכם זה."
          : "5.2 השוכר מצהיר כי טרם החתימה על הסכם זה הוא ראה ובדק את הדירה, הבניין ותנאי סביבתם, מצא אותם ראויים ומתאימים למטרותיו. השוכר מצהיר כי למעט כמפורט בסעיף 5 זה, הוא שוכר את הדירה כפי שהיא (As is), והוא מוותר על כל טענה לאי-התאמה או פגם, למעט פגמים נסתרים שיש בהם משום הפרעה ממשית לשימוש בדירה ולמעט פגמים שהמשכיר התחייב לתקן בהסכם זה."
      }`,
    }),
    createTextRun({
      text: `${
        state.card5Input2
          ? `5.3 ידוע למשכיר ולשוכר כי במועד החתימה על הסכם זה קיימים בדירה הליקויים והפגמים המפורטים להלן, ומוסכם על הצדדים כי הם יתוקנו על ידי המשכיר במהלך תקופה של ארבעה עשר (14) יום מיום תחילת השכירות: ${state.card5Input2}`
          : ""
      }`,
      break: `${state.card5Input2 ? 2 : false}`,
    }),
    createTextRun({
      text: `${
        state.card5Input3
          ? `5.4 ידוע למשכיר ולשוכר כי במועד החתימה על הסכם זה קיימים בדירה הליקויים והפגמים המפורטים להלן, ומוסכם על הצדדים כי המשכיר לא מתחייב לתקנם: ${state.card5Input3}`
          : ""
      }`,
      break: `${state.card5Input3 ? 2 : false}`,
    }),
    createTextRun({
      text: `${
        state.card5Input1
          ? `5.5 הצדדים מאשרים כי עם מסירת החזקה בדירה לשוכר, תכולת הדירה תכלול את הפריטים ואת הציוד שלהלן ("הציוד"), והשוכר מתחייב לא להוציאם מהדירה או למסור אותם לאחרים ולבצע בהם שימוש סביר ולא להסב להם נזק מלבד בלאי סביר:  ${state.card5Input1}`
          : ""
      }`,
      break: `${state.card5Input1 ? 2 : false}`,
    }),
  ];
  const paragraph5 = createParagraph({
    children: p5TextRuns,
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          titleParagraph,
          introPparagraph,
          paragraph0,
          subTitleParagraph,
          paragraph1,
          paragraph2,
          paragraph3,
          paragraph4,
          paragraph5,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "הסכם-שכירות.docx");
  });
};

export default generateDocx;
