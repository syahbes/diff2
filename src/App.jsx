import React, { useState, useReducer, useRef } from "react";
import { Card1, Card2, Card3, Card4, Card5, Card6, Card7 } from "./cards/cards";

import { CardContext } from "./context";
import "./App.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const cards = [
  <Card1 />,
  <Card2 />,
  <Card3 />,
  <Card4 />,
  <Card5 />,
  <Card6 />,
  <Card7 />,
];

const initialState = {
  card1Input1: "",
  card1Input2: "",
  card1Input3: "",
  card1Input4: "",
  card1Input5: "",

  card2Input1: "",
  card2Input2: "",
  card2Input3: false,
  card2Input4: "",

  card3Input1: "",
  card3Input2: "",
  card3Input3: "",
  card3Input4: false,
  card3Includes: {
    arnona: false,
    gas: false,
    electricity: false,
    internet: false,
    water: false,
    heat: false,
    vaad: false,
    tv: false,
  },
  card5Input1: "",
  card5Input2: "",
  card5Input3: "",
};

function App() {
  const [dateRef, optionRef, rentRef, includeRef, equipmentRef] = [
    "dateRef",
    "optionRef",
    "rentRef",
    "includeRef",
    "equipmentRef",
  ].map(() => useRef(null));

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_INPUT_VALUE":
        return { ...state, [action.payload.name]: action.payload.value };
      case "SCROLL_INTO": {
        scrollToDisplay(action.payload);
        return state;
      }
      case "SET_CHECK_VALUE":
        return {
          ...state,
          card3Includes: {
            ...state.card3Includes,
            [action.payload.name]: action.payload.value,
          },
        };
      case "RESET_CARD_3_INCLUDES":
        return {
          ...state,
          card3Includes: {
            arnona: false,
            gas: false,
            electricity: false,
            internet: false,
            water: false,
            heat: false,
            vaad: false,
            tv: false,
          },
        };
      default:
        return state;
    }
  };
  const [currentCard, setCurrentCard] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  function scrollToDisplay(props) {
    const refMap = {
      dateRef: dateRef,
      optionRef: optionRef,
      rentRef: rentRef,
      includeRef: includeRef,
      equipmentRef: equipmentRef,
    };
    const targetRef = refMap[props];
    if (targetRef) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleLastCard = () => {
    console.log("LAST");
  };
  function handleNext() {
    if (currentCard === cards.length - 1) {
      handleLastCard();
    } else if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  }
  const handlePrev = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const isLastCard = currentCard === cards.length - 1;
  const isFirstCard = currentCard === 0;

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      <div className="app-container">
        {/* cards */}
        <div className="cards-container">
          {cards[currentCard]}
          <div className="btn-group">
            <Button
              variant="outlined"
              onClick={handlePrev}
              disabled={isFirstCard}
            >
              חזור
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              // disabled={isLastCard}
            >
              {isLastCard ? "סיום" : "הבא"}
            </Button>
          </div>
        </div>
        {/* display */}
        <div className="display-container">
          <div className="sectionA">
            <Typography variant="h5" mb={3}>
              <strong>הסכם שכירות</strong>
            </Typography>
            <Typography variant="body2" mb={2}>
              בין
            </Typography>
            <Typography variant="body2">מר/גברת _____</Typography>
            <Typography variant="body2">ת.ז _____</Typography>
            <Typography variant="body2">מרחוב _____</Typography>
            <Typography variant="body2">טלפון</Typography>
            <Typography variant="body2">(להלן: "המשכיר")</Typography>
            <Typography variant="body2">ובין</Typography>
            <Typography variant="body2" mb={2}>
              (להלן:"השוכר\ים")
            </Typography>
            <Typography variant="body2" mb={2}>
              הואיל והמשכיר הינו בעל הזכויות הרשום והבלעדי של דירה בת{" "}
              <mark>{state.card1Input5}</mark> חדרים ברחוב{" "}
              <mark>{state.card1Input2}</mark> , מספר{" "}
              <mark>{state.card1Input3}</mark>, דירה{" "}
              <mark>{state.card1Input4}</mark> בעיר{" "}
              <mark>{state.card1Input1}</mark> (להלן "הדירה"); והואיל והצדדים
              מעוניינים להתקשר בהסכם זה, לפיו ישכור השוכר את הדירה מאת המשכיר.
            </Typography>
          </div>

          <div>
            <Typography variant="body2" mb={2}>
              <strong>לפיכך, הוצהר, הותנה והוסכם בין הצדדים, כדלקמן:</strong>
            </Typography>
          </div>
          <div style={{ width: "100%" }}>
            <div ref={dateRef} />
            <Typography variant="body2" gutterBottom>
              <strong>1. תקופת השכירות וסיומה</strong>
            </Typography>
            <Typography variant="body2" mb={2}>
              1.1 המשכיר משכיר בזה לשוכר, והשוכר שוכר בזה מהמשכיר את הדירה, החל
              מתאריך <mark>{state.card2Input1}</mark> ועד לתאריך{" "}
              <mark>{state.card2Input2}</mark> (להלן: "תקופת השכירות")
            </Typography>
            <Typography variant="body2" mb={2}>
              1.2 השוכר רשאי לסיים את תקופת השכירות בכל עת, בהודעה של שישים (60)
              ימים מראש, וזאת בתנאי שהציע למשכיר שוכר חלופי שקיבל על עצמו בכתב
              את כל התחייבויות השוכר לפי הסכם זה לתקופת השכירות הנותרת. המשכיר
              לא יסרב לאשר את השוכר החליפי, אלא מטעמים סבירים.
            </Typography>
            <Typography variant="body2" mb={2}>
              1.3 אם השוכר יפנה את הדירה לפני תום תקופת השכירות בניגוד להוראות
              הסכם זה, יהיה עליו להמשיך לעמוד בכל התחייבויותיו לפי הסכם זה,
              לרבות תשלום מלוא דמי השכירות וכל התשלומים השוטפים עד לתום תקופת
              השכירות.
            </Typography>
            <Typography variant="body2" mb={2}>
              1.4 המשכיר יהיה רשאי לסיים את תקופת השכירות באופן מיידי במקרה של
              הפרה יסודית של הסכם זה על ידי השוכר אשר לא תוקנה תוך ארבע עשר (14)
              ימים ממועד מסירת דרישה בכתב לשוכר לתיקון ההפרה.
            </Typography>
            <Typography variant="body2" mb={2}>
              1.5 במהלך תקופה של תשעים (90) ימים לפני תום תקופת השכירות, יהיה
              רשאי המשכיר להראות את הדירה לשוכרים פוטנציאליים, בתיאום מראש עם
              השוכר.
            </Typography>

            <div ref={rentRef} />
            <Typography variant="body2">
              <strong>2. דמי השכירות</strong>
            </Typography>

            <Typography variant="body2" mb={1}>
              2.1 השוכר ישלם למשכיר, במהלך תקופת השכירות, דמי שכירות חודשיים בסך{" "}
              <mark>{formatNumberWithCommas(state.card3Input1)}</mark> ש"ח
              (להלן: "דמי השכירות"). דמי השכירות ישולמו על ידי השוכר למשכיר מידי
              חודש בחודשו במהלך תקופת השכירות, ב-
              <mark>{state.card3Input3}</mark> לכל חודש.
            </Typography>
            <Typography variant="body2" mb={2}>
              {state.card3Input2 > 1 && (
                <>
                  מוסכם כי דמי השכירות יחולקו באופן הבא:
                  <br />
                  שוכר 1 - יושלם בהמשך.
                  <br />
                  שוכר 2 - יושלם בהמשך.
                </>
              )}
              {state.card3Input2 > 2 && (
                <>
                  <br />
                  שוכר 3 - יושלם בהמשך.
                  <br />
                </>
              )}
              מוסכם, כי אי תשלום דמי השכירות במלואם ובמועדם ייחשב להפרה יסודית
              של השוכר.
            </Typography>
            <Typography variant="body2" mb={2}>
              2.2 הצדדים מאשרים כי דמי השכירות נקבעו לאחר שניתן לשוכר מידע בדבר
              דמי השכירות ששולמו בגין השכרת הדירה בשנים עשר (12) החודשים שקדמו
              למועד החתימה על הסכם זה, ככל שהשוכר ביקש לקבל מידע זה.
            </Typography>
            <Typography variant="body2" mb={2}>
              2.3 בכל מקרה של אי תשלום בפועל של דמי השכירות, במלואם ובמועדם,
              השוכר מתחייב להסדיר באופן מידי את התשלום במלואו. מבלי לגרוע מיתר
              הוראות הסכם זה, במקרה שדמי השכירות לא שולמו תוך שבעה (7) ימים
              מהמועד שנקבע לתשלומם, יתווסף לכל חלק מדמי השכירות שטרם שולם פיצוי
              מוסכם בסך 150 ש"ח עבור כל יום נוסף בו לא הוסדר התשלום.
            </Typography>

            <div ref={optionRef} />
            <Typography variant="body2">
              <strong>3. תקופת האופציה</strong>
            </Typography>

            {!state.card2Input3 ? (
              <Typography variant="body2">ללא תקופת אופציה</Typography>
            ) : (
              <>
                <Typography variant="body2" mb={2}>
                  3.1 השוכר רשאי להאריך את תוקף הסכם זה ממועד סיום תקופת
                  השכירות, קרי תאריך <mark>{state.card2Input2}</mark> ועד לתאריך{" "}
                  <mark>{state.card2Input4}</mark> (להלן: "האופציה" ו"תקופת
                  האופציה"), באמצעות הודעה בכתב למשכיר לפחות שישי (60) ימים טרם
                  תום תקופת השכירות, והכל בכפוף לכך שהשוכר עמד במלוא
                  התחייבויותיו על פי הסכם זה ולא הפר אותו בתקופת השכירות. המשכיר
                  יהיה רשאי להעלות את דמי השכירות בתקופת האופציה בלא יותר משלושה
                  אחוזים (3%) לשנה או גובה שיעור השינוי במדד המחירים לצרכן על
                  פני תקופת השכירות, הגבוה מביניהם.
                </Typography>
                <Typography variant="body2" mb={2}>
                  3.2 במקרה של מימוש האופציה על ידי השוכר, יחתמו השוכר והמשכיר,
                  לפחות ארבעים וחמישה (45) ימים טרם תחילת תקופת האופציה, על חוזה
                  שכירות. בתקופת האופציה יחולו על הצדדים כל הוראות הסכם זה,
                  בשינויים המחויבים, לרבות כל הוראות ההסכם הנוגעות לתשלום דמי
                  השכירות ותשלומים נוספים.
                </Typography>
              </>
            )}

            <Typography variant="body2">
              <strong>4. מיסים ותשלומים אחרים</strong>
            </Typography>
            <Typography variant="body2" mb={2}>
              4.1 במהלך תקופת השכירות יישא השוכר בכל מס, חיוב, היטל או תשלום אחר
              בקשר עם החזקת הדירה והשימוש השוטף בה, לרבות ארנונה; גז; חשמל;
              אינטרנט; מים; חימום; ועד בית ודמי ניהול; טלויזיה בלווין\כבלים;
              (להלן ביחד: "התשלומים השוטפים"), ובכל מקרה, למעט תשלומים החלים לפי
              כל דין על בעל הדירה ואשר לא נקבע במפורש בהסכם זה כי ישולמו על ידי
              המשכיר. מוסכם, כי אי תשלום התשלומים השוטפים במלואם ובמועדם ייחשב
              להפרה יסודית של הסכם זה על-ידי השוכר.
            </Typography>
            <Typography variant="body2" mb={2}>
              4.2 השוכר מתחייב להעביר על שמו, מיד עם תחילת תקופת השכירות ולא
              יאוחר מ-30 יום מתחילתה, את כל החשבונות בכל הגופים והרשויות
              המתאימים, כפי שמופיעים בסעיף 4.1, וחשבונות אלו יישארו רשומים על שם
              השוכר עד תום תקופת השכירות. השוכר מתחייב להמציא למשכיר, מיד עם תום
              תקופת השכירות ו\או בכל מקרה שהמשכיר ידרוש זאת מהשוכר, קבלות
              המעידות על ביצוע כל התשלומים השוטפים ואלו החלים עליו כאמור בהסכם
              זה.
            </Typography>
            <div ref={includeRef} />
            <Typography variant="body2" mb={2}>
              4.3 השוכר לא יישא בכל מס, חיוב, היטל או תשלום המיועד או קשור
              לרכישה או לשדרוג של מערכות או מתקנים קבועים המשרתים את הדירה, או
              את הבית המשותף, למעט התאמות מיוחדות או שיפורים שבוצעו לפי דרישת
              השוכר, ובכפוף להסכמת המשכיר.
            </Typography>
            <Typography variant="body2" mb={2}>
              {state.card3Includes.arnona ||
              state.card3Includes.gas ||
              state.card3Includes.electricity ||
              state.card3Includes.internet ||
              state.card3Includes.water ||
              state.card3Includes.heat ||
              state.card3Includes.vaad ||
              state.card3Includes.tv
                ? "4.4 מוסכם בין הצדדים כי דמי השכירות כוללים בתוכם "
                : ""}
              <mark>
                {state.card3Includes.arnona && "ארנונה, "}
                {state.card3Includes.gas && "גז, "}
                {state.card3Includes.electricity && "חשמל, "}
                {state.card3Includes.internet && "אינטרנט, "}
                {state.card3Includes.water && "מים, "}
                {state.card3Includes.heat && "חימום, "}
                {state.card3Includes.vaad && "ועד בית ודמי ניהול, "}
                {state.card3Includes.tv && "טלויזיה בלווין / כבלים, "}
              </mark>
            </Typography>
            <div ref={equipmentRef} />
            <Typography variant="body2">
              <strong> 5. מצב הדירה</strong>
            </Typography>
            <Typography variant="body2">
              5.1 המשכיר מצהיר בזאת כי הדירה ראויה למגורים, ועומדת, בין היתר,
              בתנאים הבאים: (א) בניית הדירה הושלמה; (ב) לשוכר יש ותהיה גישה
              חופשית לדירה לאורך כל תקופת השכירות; הדירה כוללת מטבח וחדר שירותים
              ורחצה (ג) הדירה כוללת מערכות תקינות לאספקת מי שתייה ומי רחצה (כולל
              מים חמים), ניקוד, חשמל ותאורה; (ד) בדירה יש פתחי אוורור ומכלולים
              לסגירת פתחים אלו, לרבות דלת כניסה ראשית בעלת אמצעי נעילה; ו-(ה)
              אין בדירה גורם סיכון בלתי סביר לבריאות או או לביטחון השוכר. הוראה
              זו הינה הוראה יסודית והפרתה תיחשב להפרה יסודית של הסכם זה על-ידי
              המשכיר.
            </Typography>
            <Typography variant="body2">
              5.2 השוכר מצהיר כי טרם החתימה על הסכם זה הוא ראה ובדק את הדירה,
              הבניין ותנאי סביבתם,
              {state.card5Input2 || state.card5Input3 ? (
                <mark>ועל אף הליקויים והפגמים המפורטים בהמשך</mark>
              ) : (
                ""
              )}
              , מצא אותם ראויים ומתאימים למטרותיו. השוכר מצהיר כי למעט כמפורט
              בסעיף 5 זה, הוא שוכר את הדירה כפי שהיא (As is), והוא מוותר על כל
              טענה לאי-התאמה או פגם, למעט פגמים נסתרים שיש בהם משום הפרעה ממשית
              לשימוש בדירה ולמעט פגמים שהמשכיר התחייב לתקן בהסכם זה.
            </Typography>
            {state.card5Input2 && (
              <Typography variant="body2">
                <mark>
                  5.3 ידוע למשכיר ולשוכר כי במועד החתימה על הסכם זה קיימים בדירה
                  הליקויים והפגמים המפורטים להלן, ומוסכם על הצדדים כי הם יתוקנו
                  על ידי המשכיר במהלך תקופה של ארבעה עשר (14) יום מיום תחילת
                  השכירות: {state.card5Input2}
                </mark>
              </Typography>
            )}
            {state.card5Input3 && (
              <Typography variant="body2">
                <mark>
                  5.4 ידוע למשכיר ולשוכר כי במועד החתימה על הסכם זה קיימים בדירה
                  הליקויים והפגמים המפורטים להלן, ומוסכם על הצדדים כי המשכיר לא
                  מתחייב לתקנם: {state.card5Input3}
                </mark>
              </Typography>
            )}
            {state.card5Input1 && (
              <Typography variant="body2">
                <mark>
                  5.5 הצדדים מאשרים כי עם מסירת החזקה בדירה לשוכר, תכולת הדירה
                  תכלול את הפריטים ואת הציוד שלהלן ("הציוד"), והשוכר מתחייב לא
                  להוציאם מהדירה או למסור אותם לאחרים ולבצע בהם שימוש סביר ולא
                  להסב להם נזק מלבד בלאי סביר: {state.card5Input1}
                </mark>
              </Typography>
            )}
            <Typography variant="body2">
              <strong>6. השימוש בדירה</strong>
            </Typography>
            <Typography variant="body2">
              6.1 השוכר מתחייב להשתמש בדירה לצרכי מגורים בלבד ולא לכל צורך אחר.
              השוכר מתחייב לא למסור, לשעבד או להעביר בכל דרך אחרת את זכויותיו
              לפי הסכם זה, או להרשות לאחרים להשתמש בדירה או בכל חלק ממנה, בתמורה
              או שלא בתמורה, ללא הסכמת המשכיר מראש ובכתב. הוראה זו הינה הוראה
              יסודית והפרתה תיחשב להפרה יסודית של השוכר.
            </Typography>
            <Typography variant="body2">
              6.2 על אף האמור בסעיף 6.1 לעיל השוכר יוכל להשכיר את הדירה בשכירות
              משנה ("סאבלט") רק לאחר קבלת הסכמה מפורשת בכתב מהמשכיר.
            </Typography>
            <Typography variant="body2">
              6.3 השוכר מתחייב להשתמש בדירה, על מערכותיה, מתקניה ותכולתה, באופן
              זהיר וסביר, ולשמור על ניקיונה ועל ניקיון הבניין. השוכר לא יעשה
              בדירה, או בכל חלק ממנה, כל שימוש אשר יכול לגרום נזק, הטרדה או רעש
              בלתי סבירים, וכן יציית וימלא בדייקנות את כל הוראות החוק, הוראות כל
              רשות מוסמכת והוראות ועד הבית.
            </Typography>

            <Typography variant="body2">
              <strong>7. נזקים וליקויים לדירה; שינויים בדירה</strong>
            </Typography>
            <Typography variant="body2">
              המשכיר יתקן, על חשבונו, כל נזק וקלקול שסיבתם בלאי סביר, תוך זמן
              סביר ולא יאוחר מארבע עשר (14) ימים מדרישת השוכר בכתב, ובמקרה של
              תקלה שאינה מאפשרת מגורים סבירים בדירה - באופן מידי, ולא יאוחר
              משלושה (3) ימים מדרישת השוכר בכתב, ובלבד שניתן לבצע את התיקון
              במסגרת לוחות הזמנים האמורים. בנוסף לאמור לעיל בסעיף זה, תנאים
              מצטברים לחובות המשכיר לביצוע התיקונים כאמור הם: (1) השוכר הודיע
              למשכיר על הנזק או הקלקול בסמוך לאחר גילויו; (2) השוכר פירט באופן
              סביר לגבי הנזק או הקלקול; (3) השוכר איפשר למשכיר לתקנו. על אף
              האמור לעיל, המשכיר לא יהיה חייב בתיקון נזק או קלקול קלי ערך,
              שתיקונם אינו מצריך בדרך כלל עבודת בעל מקצוע, וכן נזק או קלקול
              שייגרמו לדירה ולכל חלק ממנה (לרבות הציוד), בגין שימוש לא סביר.
              במקרה שמי מהצדדים לא יקיים את התחייבותו לתיקון התיקונים החלים
              עליו, יהיה רשאי הצד השני (אך לא חייב) לבצע בעצמו תיקונים אלו, על
              חשבון הצד השני.
            </Typography>
            <Typography variant="body2">
              7.2 השוכר מתחייב שלא לבצע שינויים או תוספות כלשהן במבנה הדירה ולא
              להוסיף לדירה כל מבנה, תוספת או שיכלול, או להסיר כל חלק מהדירה, ללא
              הסכמת המשכיר בכתב ומראש. מבלי לגרוע מזכות המשכיר לסעד אחר, במקרה
              שביצע השוכר שינויים כאמור, יהיה רשאי המשכיר להורות לשוכר להחזיר את
              מצב הדירה לקדמותו על חשבון השוכר ובאחריותו, או להורות לשוכר להותיר
              את השינויים, אשר יהפכו לקניין המשכיר מבלי שיהיה עליו לשלם בגינם.
              במקרה שהשוכר לא החזיר את מצב הדירה לקדמותו בניגוד להוראות סעיף זה,
              יהיה רשאי המשכיר (אך לא חייב) לעשות כן, על חשבון השוכר.
            </Typography>
            <Typography variant="body2">
              <strong>8. מסירת הדירה ופינויה</strong>
            </Typography>
            <Typography variant="body2">
              8.1 המשכיר מתחייב למסור את הדירה לשוכר, בתחילת תקופת השכירות,
              כשהיא פנויה וחופשייה מכל אדם וחפץ (למעט אלו המוזכרים בהסכם), במצב
              טוב ותקין, נקייה ומסודרת.
            </Typography>
            <Typography variant="body2">
              8.2 במועד תום תקופת השכירות או בכל מועד בו תבוא השכירות לסיומה על
              פי הוראות הסכם זה (לרבות לפי סעיפים 1.2 ו-1.3 לעיל) לפי המוקדם,
              יפנה השוכר את הדירה וימסור אותה בחזרה למשכיר או למי שיורה המשכיר,
              כשהיא פנויה וחופשייה מכל אדם וחפץ השייך לשוכר, במצב טוב ותקין,
              נקיה ומסודרת כפי שנמסרה לו.
            </Typography>
            <Typography variant="body2">
              <strong>9. בטחונות</strong>
            </Typography>
            <Typography variant="body2">
              9.1 השוכר יפקיד בידי המשכיר בסמוך לאחר מועד חתימת הסכם זה ולא
              יאוחר ממועד הכניסה לדירה, המחאות חתומות ללא סכום ותאריך לפקודות
              השירותים המצוינים בסעיף 4.1, אשר תשמשנה כביטחון לתשלום התשלומים
              השוטפים. המשכיר יהיה רשאי לעשות שימוש בהמחאות אלו לפירעון התשלומים
              השוטפים, במידה והשוכר לא מילא את התחייבותיו לתשלומם.
            </Typography>
            <Typography variant="body2">XXX</Typography>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
          <div>
            <p>HI</p>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum
            architecto odio illo ut laboriosam ex nemo eum, adipisci sunt
            molestiae labore enim corporis. Necessitatibus autem quam culpa
            optio quos?
          </p>
        </div>
      </div>
    </CardContext.Provider>
  );
}

export default App;
