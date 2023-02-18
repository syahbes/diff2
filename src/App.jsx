import React, { useState, useReducer } from "react";
import Card1 from "./cards/Card1";
import Card2 from "./cards/Card2";
import Card3 from "./cards/Card3";
import { CardContext } from "./context";
import "./App.css";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const initialState = {
  card1Input1: "",
  card1Input2: "",
  card1Input3: "",
  card1Input4: "",
  card1Input5: "",
  card2Input: "",
  card3Input: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};

function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const cards = [<Card1 />, <Card2 />, <Card3 />];

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

          {/* <Button>
          <button onClick={handleNext} disabled={isLastCard}>
            Next
          </button>
          </Button> */}
        </div>
        {/* display */}
        <div className="display-container">
          <Typography variant="h4">הסכם שכירות</Typography>
          <Typography variant="h5">בין</Typography>
          <Typography variant="body1">מר/גברת _____</Typography>
          <Typography variant="body1">ת.ז _____</Typography>
          <Typography variant="body1">מרחוב _____</Typography>
          <Typography variant="body1">טלפון</Typography>
          <Typography variant="body1">(להלן: "המשכיר")</Typography>
          <Typography variant="body1">ובין</Typography>
          <Typography variant="body1">(להלן:"השוכר\ים")</Typography>
          <Typography variant="body1">
            הואיל והמשכיר הינו בעל הזכויות הרשום והבלעדי של דירה בת{" "}
            <mark>{state.card1Input5}</mark> חדרים ברחוב{" "}
            <mark>{state.card1Input2}</mark> , מספר{" "}
            <mark>{state.card1Input3}</mark>, דירה{" "}
            <mark>{state.card1Input4}</mark> בעיר{" "}
            <mark>{state.card1Input1}</mark> (להלן "הדירה"); והואיל והצדדים
            מעוניינים להתקשר בהסכם זה, לפיו ישכור השוכר את הדירה מאת המשכיר.
          </Typography>
        </div>
      </div>
    </CardContext.Provider>
  );
}

export default App;
