import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  TabStopType,
  TabStopPosition,
} from "docx";

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
    createTextRun({ text: "מר / גברת __________", break: true }),
    createTextRun({ text: "ת.ז. __________", break: true }),
    createTextRun({ text: "מרחוב __________", break: true }),
    createTextRun({ text: "טלפון __________", break: true }),
    createTextRun({ text: '(להלן : "המשכיר") __________', break: true }),
    createTextRun({ text: "ובין __________", break: true }),
    createTextRun({ text: '(להלן : "השוכר/ים") __________', break: true }),
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
      text: "4.2 השוכר מתחייב להעביר על שמו, מיד עם תחילת תקופת השכירות ולא יאוחר מ-30 יום מתחילתה, את כל החשבונות בכל הגופים והרשויות המתאימים, כפי שמופיעים בסעיף 4.1, וחשבונות אלו יישארו רשומים על שם השוכר עד תום תקופת השכירות. השוכר מתחייב להמציא למשכיר, מיד עם תום תקופת השכירות ואו בכל מקרה שהמשכיר ידרוש זאת מהשוכר, קבלות המעידות על ביצוע כל התשלומים השוטפים ואלו החלים עליו כאמור בהסכם זה.",
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
      break:
        state.card3Includes.arnona ||
        state.card3Includes.gas ||
        state.card3Includes.electricity ||
        state.card3Includes.internet ||
        state.card3Includes.water ||
        state.card3Includes.heat ||
        state.card3Includes.vaad ||
        state.card3Includes.tv
          ? 2
          : false,
    }),
  ];

  const paragraph4 = createParagraph({
    children: p4TextRuns,
  });

  const p5TextRuns = [
    createTextRun({
      text: "5. מצב הדירה",
      bold: true,
      break: true,
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

  const p6TextRuns = [
    createTextRun({
      text: "6 השימוש בדירה",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: "6.1 השוכר מתחייב להשתמש בדירה לצרכי מגורים בלבד ולא לכל צורך אחר. השוכר מתחייב לא למסור, לשעבד או להעביר בכל דרך אחרת את זכויותיו לפי הסכם זה, או להרשות לאחרים להשתמש בדירה או בכל חלק ממנה, בתמורה או שלא בתמורה, ללא הסכמת המשכיר מראש ובכתב. הוראה זו הינה הוראה יסודית והפרתה תיחשב להפרה יסודית של השוכר.",
    }),
    createTextRun({
      text: '6.2 על אף האמור בסעיף 6.1 לעיל השוכר יוכל להשכיר את הדירה בשכירות משנה ("סאבלט") רק לאחר קבלת הסכמה מפורשת בכתב מהמשכיר.',
    }),
    createTextRun({
      text: "6.3 השוכר מתחייב להשתמש בדירה, על מערכותיה, מתקניה ותכולתה, באופן זהיר וסביר, ולשמור על ניקיונה ועל ניקיון הבניין. השוכר לא יעשה בדירה, או בכל חלק ממנה, כל שימוש אשר יכול לגרום נזק, הטרדה או רעש בלתי סבירים, וכן יציית וימלא בדייקנות את כל הוראות החוק, הוראות כל רשות מוסמכת והוראות ועד הבית.",
    }),
    createTextRun({
      text: `${
        state.card6Switch3
          ? "כמו כן מוסכם על הצדדים כי חוזה זה אינו יחול על החניה והיא לא תחשב כחלק ממתקני הדירה שמוקצים לשימוש הושכר."
          : ""
      }`,
      break: `${state.card6Switch3 ? 2 : false}`,
    }),
    createTextRun({
      text: `${
        state.card6Switch4
          ? "כמו כן מוסכם על הצדדים כי חוזה זה אינו יחול על המחסן והיא לא תחשב כחלק ממתקני הדירה שמוקצים לשימוש הושכר."
          : ""
      }`,
      break: `${state.card6Switch4 ? 2 : false}`,
    }),
    createTextRun({
      text: `6.4 ${
        !state.card6Switch1
          ? "השוכר מתחייב שלא להכניס בעלי חיים לדירה."
          : "מוסכם כי השוכר יהיה רשאי להחזיק בדירה חיית מחמד, בכפוף לכך שהשוכר מאשר כי האמור בסעיף 6.3 לעיל יחול ויחייב אותו גם בכל הקשור להחזקת חיית המחמד."
      }`,
    }),
    createTextRun({
      text: "6.5 השוכר יאפשר למשכיר ולמי מטעמו להיכנס לדירה בזמנים סבירים, בתיאום מראש עם המשכיר.",
    }),
    createTextRun({
      text: `${
        state.card7Switch1
          ? '6.6 המשכיר מתחייב לעדכן את השוכר בכל שינוי / התקדמות משמעותיים במסגרת תמ"א 38 או תוכנית פינוי-בינוי שהדירה עתידה לעבור כגון: חתימה על הסכם עם יזם, קבלת היתר בניה, קבלת הודעת פינוי וכדומה. המשכיר מתחייב להודיע בכתב לשוכר עד 60 יום לפני תחילת ביצוע העבודות מתוקף תוכניות אלו ולאפשר לשוכר במידה ויבחר להביא חוזה זה לסיומו, לאף אחד מהצדדים לא תהיה טענה בדבר עניין זה.'
          : ""
      }`,
      break: `${state.card7Switch1 ? 2 : false}`,
    }),
    createTextRun({
      text: `${
        state.card7Switch2 && state.card7Switch1
          ? `במידה ויבחר השוכר להמשיך ולשכור את הדירה מתוקף חוזה זה יופחת שכ"ד המשולם על ידו ל- ${formatNumberWithCommas(
              state.card7Input3
            )} ש"ח לחודש (במידה וישנם מספר שוכרים - תישמר יחסיות התשלום), למשך תקופת הבנייה.`
          : ""
      }`,
      break: `${state.card7Switch2 && state.card7Switch1 ? 2 : false}`,
    }),
  ];
  const paragraph6 = createParagraph({
    children: p6TextRuns,
  });

  const p7TextRuns = [
    createTextRun({
      text: "7. נזקים וליקויים לדירה; שינויים בדירה",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: "המשכיר יתקן, על חשבונו, כל נזק וקלקול שסיבתם בלאי סביר, תוך זמן סביר ולא יאוחר מארבע עשר (14) ימים מדרישת השוכר בכתב, ובמקרה של תקלה שאינה מאפשרת מגורים סבירים בדירה - באופן מידי, ולא יאוחר משלושה (3) ימים מדרישת השוכר בכתב, ובלבד שניתן לבצע את התיקון במסגרת לוחות הזמנים האמורים. בנוסף לאמור לעיל בסעיף זה, תנאים מצטברים לחובות המשכיר לביצוע התיקונים כאמור הם: (1) השוכר הודיע למשכיר על הנזק או הקלקול בסמוך לאחר גילויו; (2) השוכר פירט באופן סביר לגבי הנזק או הקלקול; (3) השוכר איפשר למשכיר לתקנו. על אף האמור לעיל, המשכיר לא יהיה חייב בתיקון נזק או קלקול קלי ערך, שתיקונם אינו מצריך בדרך כלל עבודת בעל מקצוע, וכן נזק או קלקול שייגרמו לדירה ולכל חלק ממנה (לרבות הציוד), בגין שימוש לא סביר. במקרה שמי מהצדדים לא יקיים את התחייבותו לתיקון התיקונים החלים עליו, יהיה רשאי הצד השני (אך לא חייב) לבצע בעצמו תיקונים אלו, על חשבון הצד השני.",
    }),
    createTextRun({
      text: "7.2 השוכר מתחייב שלא לבצע שינויים או תוספות כלשהן במבנה הדירה ולא להוסיף לדירה כל מבנה, תוספת או שיכלול, או להסיר כל חלק מהדירה, ללא הסכמת המשכיר בכתב ומראש. מבלי לגרוע מזכות המשכיר לסעד אחר, במקרה שביצע השוכר שינויים כאמור, יהיה רשאי המשכיר להורות לשוכר להחזיר את מצב הדירה לקדמותו על חשבון השוכר ובאחריותו, או להורות לשוכר להותיר את השינויים, אשר יהפכו לקניין המשכיר מבלי שיהיה עליו לשלם בגינם. במקרה שהשוכר לא החזיר את מצב הדירה לקדמותו בניגוד להוראות סעיף זה, יהיה רשאי המשכיר (אך לא חייב) לעשות כן, על חשבון השוכר.",
    }),
  ];

  const paragraph7 = createParagraph({
    children: p7TextRuns,
  });

  const p8TextRuns = [
    createTextRun({
      text: "8. מסירת הדירה ופינויה",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: "8.1 המשכיר מתחייב למסור את הדירה לשוכר, בתחילת תקופת השכירות, כשהיא פנויה וחופשייה מכל אדם וחפץ (למעט אלו המוזכרים בהסכם), במצב טוב ותקין, נקייה ומסודרת.",
    }),
    createTextRun({
      text: "8.2 במועד תום תקופת השכירות או בכל מועד בו תבוא השכירות לסיומה על פי הוראות הסכם זה (לרבות לפי סעיפים 1.2 ו-1.3 לעיל) לפי המוקדם, יפנה השוכר את הדירה וימסור אותה בחזרה למשכיר או למי שיורה המשכיר, כשהיא פנויה וחופשייה מכל אדם וחפץ השייך לשוכר, במצב טוב ותקין, נקיה ומסודרת כפי שנמסרה לו.",
    }),
    createTextRun({
      text: `${
        state.card6Switch2
          ? "מוסכם, כי במקרה שהדירה נצבעה לפני תחילת תקופת השכירות, השוכר ידאג לצבוע, על חשבונו, את הדירה ברמה טובה ומספקת. במעמד פינוי הדירה, הצדדים יערכו פרוטוקול מסירת דירה אשר יהווה אסמכתא לכך שהשוכר קיים את התחייבויותיו וכי למשכיר אין טענות כלפיו."
          : ""
      }`,
      break: state.card6Switch2 ? 2 : false,
    }),
  ];
  const paragraph8 = createParagraph({
    children: p8TextRuns,
  });

  const p9TextRuns = [
    createTextRun({
      text: "9. בטחונות",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: "9.1 השוכר יפקיד בידי המשכיר בסמוך לאחר מועד חתימת הסכם זה ולא יאוחר ממועד הכניסה לדירה, המחאות חתומות ללא סכום ותאריך לפקודות השירותים המצוינים בסעיף 4.1, אשר תשמשנה כביטחון לתשלום התשלומים השוטפים. המשכיר יהיה רשאי לעשות שימוש בהמחאות אלו לפירעון התשלומים השוטפים, במידה והשוכר לא מילא את התחייבותיו לתשלומם.",
    }),
    createTextRun({
      text: "9.2 להבטחת מילוי התחייבויות השוכר על פי הסכם זה, יפקיד השוכר בידי המשכיר בסמוך לאחר מועד חתימה הסכם זה ולא יאוחר ממועד הכניסה לדירה את הבטוחות הבאות:",
    }),
    createTextRun({
      text: `${
        state.card4Switch1
          ? `המחאה על סך ${formatNumberWithCommas(
              state.card4Input1
            )} ש"ח חתומה על ידי ${
              state.card4SignBy
            }. ככל שבתום תקופת השכירות מילא השוכר אחר כל התחייבויותיו על פי הסכם זה, יחזיר המשכיר לשוכר את ההמחאות או ישמיד אותן, בהתאם להסכמת הצדדים, וזאת לא יאוחר משלושים (30) ימים מתום תקופת ההסכם.`
          : ""
      }`,
      break: state.card4Switch1 ? 2 : false,
    }),
    createTextRun({
      text: `${
        state.card4Switch2
          ? `ערבות בנקאית, בסך ${formatNumberWithCommas(
              state.card4Input2
            )} ש"ח, ככל שבתום תקופת השכירות מילא השוכר אחר כל התחייבויותיו לפי הסכם זה, יחזיר המשכיר לשוכר את הערבות, לא יאוחר משלושים (30) ימים מתום תקופת ההסכם`
          : ""
      }`,
      break: state.card4Switch2 ? 2 : false,
    }),
    createTextRun({
      text: `${
        state.card4Switch3
          ? `פיקדון בסך ${formatNumberWithCommas(
              state.card4Input3
            )} ש"ח, שיופקד בפק"מ בחשבון הבנק של המשכיר אשר פרטיו יועברו על ידי המשכיר. ככל שבתום תקופת השכירות מילא השוכר אחר כל התחייבויותיו על פי הסכם זה, יחזיר המשכיר לשוכר את ההמחאות או ישמיד אותן, בהתאם להסכמת הצדדים, וזאת לא יאוחר משלושים (30) ימים מתום תקופת ההסכם`
          : ""
      }`,
      break: state.card4Switch3 ? 2 : false,
    }),
    createTextRun({
      text: `${
        state.card4Switch4
          ? `שטר חוב בסך ${formatNumberWithCommas(
              state.card4Input4
            )} ש"ח, חתום על ידי השוכר וערב מטעמו. ככל שבתום תקופת השכירות מילא השוכר אחר כל התחייבויותיו על פי הסכם זה, יחזיר המשכיר לשוכר את שטר החוב או ישמיד אותו, בהתאם להסכמת הצדדים, וזאת לא יאוחר משלושים (30) ימים מתום תקופת ההסכם.`
          : ""
      }`,
      break: state.card4Switch4 ? 2 : false,
    }),
    createTextRun({
      text: `${
        state.card4Switch5
          ? `צ'ק בנקאי, על סך ${formatNumberWithCommas(
              state.card4Input5
            )} ש"ח, ככל שבתום תקופת השכירות מילא השוכר אחר כל התחייבויותיו לפי הסכם זה, יחזיר המשכיר לשוכר את הצ'ק הבנקאי, לא יאוחר משלושים (30) ימים מתום תקופת ההסכם`
          : ""
      }`,
      break: state.card4Switch5 ? 2 : false,
    }),
  ];
  const paragraph9 = createParagraph({
    children: p9TextRuns,
  });

  const p10TextRuns = [
    createTextRun({
      text: "10. אחריות",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: "10.1 בכפוף להוראות כל דין, השוכר אחראי כלפי המשכיר וכלפי כל צד שלישי שהוא לכל נזק, דרישה או עילת תביעה מכל מין וסוג שהוא, לרבות נזק לגוף או לרכוש, שיגרם בקשר עם השימוש בדירה על ידי השוכר. השוכר יפצה את המשכיר וישפה אותו בגין כל נזק או הוצאה, לרבות הוצאות משפט, שייגרמו למשכיר בשל תביעה שתוגש נגד המשכיר, ככל שהתביעה נובעת מאי מילוי או הפרה של התחייבויות השוכר לפי הסכם זה או הוראות כל דין.",
    }),
    createTextRun({
      text: `${
        state.card7Switch4
          ? "10.2 מובהר ומוסכם על הצדדים, כי כחלק מהמחויבויות החלות על הצדדים מתוקף חוזה זה, מתחייב המשכיר לערוך ביטוח נכס שכולל סעיף צד ג' ואילו השוכר מתחייב לערוך ביטוח תכולה שכולל סעיף צד ג'. אין בעריכת ביטוחים אלו לקיחת אחריות לנזקיו של הצד השני."
          : ""
      }`,
      break: state.card7Switch4 ? 2 : false,
    }),
  ];

  const paragraph10 = createParagraph({
    children: p10TextRuns,
  });

  const p11TextRuns = [
    createTextRun({
      text: "11. כללי",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: "11.1 כתובות הצדדים לצרכי הסכם זה הם כמפורט במבוא או כל כתובת אחרת עליה יודיעו הצדדים. כל הודעה ששלח צד להסכם תיחשב כאילו הגיעה לצד השני תוך שלושה (3) ימי עסקים - אם שוגרה בדואר רשום; בעת מסירתה ובלבד שנתקבל אישור קבלה בהודעה חוזרת - אם נשלחה בדואר-אלקטרוני.",
    }),
    createTextRun({
      text: '11.2 במקרה שלפי הסכם זה הדירה מושכרת למספר שוכרים, יחולו על כל אחד מהם כל הוראות הסכם זה, וכולם יחדיו יחשבו כ"שוכר".',
    }),
    createTextRun({
      text: `${state.card7Input6 ? `11.3 ${state.card7Input6}` : ""}`,
      break: state.card7Input6 ? 2 : false,
    }),
  ];
  const paragraph11 = createParagraph({
    children: p11TextRuns,
  });

  const p12TextRuns = [
    createTextRun({
      text: "12. שונות",
      bold: true,
      break: true,
    }),
    createTextRun({
      text: "12.1 המבוא להסכם זה מהווה חלק בלתי נפרד ממנו.",
    }),
    createTextRun({
      text: '12.2 על הסכם זה ועל הדירה לא יחולו הוראות חוק הגנת הדיר (נוסח משולב) תשל"ב - 1972 (להלן "חוק הגנת הדייר"), התקנות מתוקפו או כל חוק או תקנה שיבואו במקומם, והשוכר מוותר בזאת על כל טענה, דרישה או עילת תביעה מכוחם. הצדדים מאשרים כי הושכר לא שילם כל תשלום כדמי מפתח עבור הדירה, לא השתתף ולא ישתתף בחלק כלשהו בהוצאות הבניה של הדירה, וכי הסכם זה אינו יוצר ולא יצור יחסים המקנים זכות כלשהי לקבלת דמי מפתח לפי חוק הגנת הדייר או כל חוק אחר שיבוא במקומו.',
    }),
    createTextRun({
      text: "12.3 המשכיר רשאי להעביר לאחר את זכויותיו בדירה, כולן או חלקן, ללא צורך בהסכמת השוכר, ובלבד שיודיע על כך לשוכר בסמוך לאחר ביצוע העברת הזכויות (לרבות מסירת פרטי הנעבר לשוכר) ובתנאי שלא יפגעו זכויות השוכר על פי הסכם זה עקב העברת הזכויות.",
    }),
    createTextRun({
      text: "12.4 אם יקבע כי הוראה מהוראות ההסכם אינה בלתי אכיפה או בטלה מסיבה כלשהי לא יהיה בכך כדי לפגוע ביתר הוראותיו של ההסכם, והצדדים יפעלו על מנת ליישם את ההסכם כרוחו וכלשונו, לרבות החלפת ההוראה הבלתי אכיפה או בטלה כאמור בהוראה חלופית שתוצאה ופעולתה זהות בעיקרן.",
    }),
    createTextRun({
      text: "12.5 הסכם זה קובע באופן בלעדי את תנאי ההתקשרות בין הצדדים ולא יחולו עליהם הסכמים או הסדרים אחרים, מכל סוג, שבוצעו בעל פה. כל שינוי, ויתור או מתן ארכה לא יהיה להם תוקף אלא אם נערכו בכתב ונחתמו על-ידי צדדים. ויתר צד להסכם על קיום הוראה מהוראות הסכם זה, יהא ויתור זה חד פעמי ולא יהווה תקדים לוויתור על קיום כל הוראה שהיא.",
    }),
    createTextRun({
      text: "12.6 הצדדים מאשרים כי הסכם זה ייחתם בחתימה אלקטרונית, באמצעות אתר Diffe-rent.co.il וכי עותקים חתומים שלו יוחזקו על ידי כל אחד מהצדדים.",
    }),
    createTextRun({
      text: "12.7 על הסכם זה יחולו דיני מדינת ישראל. סמכות השיפוט הייחודית והבלעדית בכל מחלוקת שתתעורר בין הצדדים תהא נתונה לבית המשפט המוסמך במחוז השיפוט שבה ממוקמת הדירה.",
    }),
  ];
  const paragraph12 = createParagraph({
    children: p12TextRuns,
  });

  const lastParagraphTextRuns = [
    createTextRun({
      text: "ולראייה באו הצדדים על החתום :",
    }),
  ];
  const lastParagraph = createParagraph({
    children: lastParagraphTextRuns,
    alignment: "center",
  });

  const finalParagraph = (a, b) => {
    return new Paragraph({
      font: "Arial",
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: b,
          font: "Arial",
          size: 20,
          rightToLeft: true,
        }),
        new TextRun({
          text: `\t${a}`,
          font: "Arial",
          size: 20,
          rightToLeft: true,
        }),
      ],
    });
  };

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
          paragraph6,
          paragraph7,
          paragraph8,
          paragraph9,
          paragraph10,
          paragraph11,
          paragraph12,
          lastParagraph,
          finalParagraph("בעל הנכס", "הדיירים"),
          finalParagraph(
            `שם בעל הנכס: ${state.card8Input1}`,
            `שם הדיירים: ${state.card9Input1}`
          ),
          finalParagraph(
            `${state.card8Input2} : אי מייל`,
            `${state.card9Input2} : אי מייל`
          ),
          finalParagraph(
            `תעודת זהות: ${state.card8Input3}`,
            `תעודת זהות: ${state.card9Input3}`
          ),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    window.saveAs(blob, "הסכם-שכירות.docx");
  });

};

export default generateDocx;
