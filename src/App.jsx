import React, { useState, useReducer, useRef } from "react";
import { Card1, Card2, Card3, Card4, Card5, Card6 } from "./cards/cards";

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
};

function App() {
  const [dateRef, optionRef, rentRef,includeRef] = ["dateRef", "optionRef", "rentRef","includeRef"].map(
    () => useRef(null)
  );

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
    };
    const targetRef = refMap[props];
    if (targetRef) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleNext() {
    if (currentCard < cards.length - 1) {
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
              disabled={isLastCard}
            >
              המשך
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
                  <mark>
                    3.1 השוכר רשאי להאריך את תוקף הסכם זה ממועד סיום תקופת
                    השכירות, קרי תאריך 10.09.2020 ועד לתאריך 10.09.2021 (להלן:
                    "האופציה" ו"תקופת האופציה"), באמצעות הודעה בכתב למשכיר לפחות
                    שישי (60) ימים טרם תום תקופת השכירות, והכל בכפוף לכך שהשוכר
                    עמד במלוא התחייבויותיו על פי הסכם זה ולא הפר אותו בתקופת
                    השכירות. המשכיר יהיה רשאי להעלות את דמי השכירות בתקופת
                    האופציה בלא יותר משלושה אחוזים (3%) לשנה או גובה שיעור
                    השינוי במדד המחירים לצרכן על פני תקופת השכירות, הגבוה
                    מביניהם.
                  </mark>
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

            <div ref={includeRef}
            />
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
            <Typography variant="body2" mb={2}>
              4.3 השוכר לא יישא בכל מס, חיוב, היטל או תשלום המיועד או קשור
              לרכישה או לשדרוג של מערכות או מתקנים קבועים המשרתים את הדירה, או
              את הבית המשותף, למעט התאמות מיוחדות או שיפורים שבוצעו לפי דרישת
              השוכר, ובכפוף להסכמת המשכיר.
            </Typography>
            <Typography variant="body2" mb={2}>
              <mark>
            {state.card3Includes.arnona || 
              state.card3Includes.gas || 
              state.card3Includes.electricity || 
              state.card3Includes.internet || 
              state.card3Includes.water || 
              state.card3Includes.heat || 
              state.card3Includes.vaad || 
              state.card3Includes.tv ? "4.4 מוסכם בין הצדדים כי דמי השכירות כוללים בתוכם " : ""}

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
