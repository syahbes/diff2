import React, { useState, useReducer, useRef } from "react";
import Card1 from "./cards/Card1";
import Card2 from "./cards/Card2";
import Card3 from "./cards/Card3";
import { CardContext } from "./context";
import "./App.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
};

function App() {
  const [dateRef, optionRef, anotherRef] = [
    "dateRef",
    "optionRef",
    "anotherRef",
  ].map(() => useRef(null));

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_INPUT_VALUE":
        return { ...state, [action.payload.name]: action.payload.value };
      case "SCROLL_INTO": {
        scrollToDisplay(action.payload)
        return state;
      }
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
    };
    const targetRef = refMap[props];
    if (targetRef) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const cards = [
    <Card1 />,
    <Card2 />,
    <Card3 scrollToDisplay={scrollToDisplay} />,
  ];

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
          <Typography variant="h5">
            <strong>הסכם שכירות</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            בין
          </Typography>
          <Typography variant="body2">מר/גברת _____</Typography>
          <Typography variant="body2">ת.ז _____</Typography>
          <Typography variant="body2">מרחוב _____</Typography>
          <Typography variant="body2">טלפון</Typography>
          <Typography variant="body2">(להלן: "המשכיר")</Typography>
          <Typography variant="body2">ובין</Typography>
          <Typography variant="body2">(להלן:"השוכר\ים")</Typography>
          <Typography variant="body2">
            הואיל והמשכיר הינו בעל הזכויות הרשום והבלעדי של דירה בת{" "}
            <mark>{state.card1Input5}</mark> חדרים ברחוב{" "}
            <mark>{state.card1Input2}</mark> , מספר{" "}
            <mark>{state.card1Input3}</mark>, דירה{" "}
            <mark>{state.card1Input4}</mark> בעיר{" "}
            <mark>{state.card1Input1}</mark> (להלן "הדירה"); והואיל והצדדים
            מעוניינים להתקשר בהסכם זה, לפיו ישכור השוכר את הדירה מאת המשכיר.
          </Typography>
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
              מתאריך
              <mark>{state.card2Input1}</mark> ועד לתאריך
              <mark>{state.card2Input2}</mark> (להלן: "תקופת השכירות")
            </Typography>
            <Typography variant="body2" mb={2}>
              1.2 השוכר רשאי לסיים את תקופת השכירות בכל עת, בהודעה של שישים (60)
              ימים מראש, וזאת בתנאי שהציע למשכיר שוכר חלופי שקיבל על עצמו בכתב
              את כל התחייבויות השוכר לפי הסכם זה לתקופת השכירות הנותרת. המשכיר
              לא יסרב לאשר את השוכר החליפי, אלא מטעמים סבירים.
            </Typography>
          </div>

          {!state.card2Input3 ? (
            <Typography variant="body2">ללא תקופת אופציה</Typography>
          ) : (
            <Typography variant="body2">
              כל הטקסט של אופציה להארכת חוזה
            </Typography>
          )}
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
          <div ref={optionRef}>
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
