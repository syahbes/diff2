import React, { useContext } from "react";
import { CardContext } from "../context";
import CitiesAndStreets from "./City2";

function Card3(props) {
  const { state, dispatch } = useContext(CardContext);

  function handleCard3InputChange(event) {
    dispatch({ type: "SET_CARD3_INPUT", payload: event.target.value });
  }

  return (
    <div>
      <div>This is card 3</div>
      <input
        type="text"
        value={state.card3Input}
        onChange={handleCard3InputChange}
      />

      <div>
        <button
          onClick={() => {
            dispatch({ type: "SCROLL_INTO", payload: "dateRef" });
          }}
        >
          Scroll to Display-A
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SCROLL_INTO", payload: "optionRef" });
          }}
        >
          Scroll to Display-B
        </button>
      </div>

      {/* <CitiesAndStreets/> */}
    </div>
  );
}

export default Card3;
