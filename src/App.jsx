import React, { useState, useReducer } from "react";
import Card1 from "./cards/Card1";
import Card2 from "./cards/Card2";
import Card3 from "./cards/Card3";
import { CardContext } from "./context";
import "./App.css";
import { Typography } from "@mui/material";

function App() {
  const [currentCard, setCurrentCard] = useState(0);

  const initialState = {
    card1Input: "",
    card2Input: "",
    card3Input: "",
  };


  
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_CARD1_INPUT":
        return { ...state, card1Input: action.payload };
      case "SET_CARD2_INPUT":
        return { ...state, card2Input: action.payload };
      case "SET_CARD3_INPUT":
        return { ...state, card3Input: action.payload };
      default:
        return state;
    }
  }, initialState);

  const cards = [<Card1 />, <Card2 />, <Card3 />];

  function handleNext() {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  }

  const isLastCard = currentCard === cards.length - 1;

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      <div className="app-container">
        {/* cards */}
        <div style={{ flex: 1 }}>
          {cards[currentCard]}
          <button onClick={handleNext} disabled={isLastCard}>
            Next
          </button>
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
            הואיל והמשכיר הינו בעל הזכויות הרשום והבלעדי של דירה בת 4 חדרים
            ברחוב ארנון, מספר 15, דירה 2 בעיר <mark>{state.card1Input}</mark>{" "}
            (להלן "הדירה"); והואיל והצדדים מעוניינים להתקשר בהסכם זה, לפיו ישכור
            השוכר את הדירה מאת המשכיר.
          </Typography>
          <mark>salamander</mark>

          <div>Card 1 Input: </div>
          <div>Card 2 Input: {state.card2Input}</div>
          <div>Card 3 Input: {state.card3Input}</div>
        </div>
      </div>
    </CardContext.Provider>
  );
}

export default App;
