import React, { useContext } from "react";
import { CardContext } from "../context";

function Card3() {
  const { state, dispatch } = useContext(CardContext);

  function handleCard3InputChange(event) {
    dispatch({ type: "SET_CARD3_INPUT", payload: event.target.value });
  }

  return (
    <div>
      <div>This is card 3</div>
      <input type="text" value={state.card3Input} onChange={handleCard3InputChange} />
    </div>
  );
}

export default Card3;
