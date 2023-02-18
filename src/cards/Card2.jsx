import React, { useContext } from "react";
import { CardContext } from "../context";

function Card2() {
  const { state, dispatch } = useContext(CardContext);

  function handleCard2InputChange(event) {
    dispatch({ type: "SET_CARD2_INPUT", payload: event.target.value });
  }

  return (
    <div>
      <div>This is card 2</div>
      <input type="text" value={state.card2Input} onChange={handleCard2InputChange} />
    </div>
  );
}

export default Card2;
