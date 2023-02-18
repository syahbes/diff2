import { Avatar, Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CardContext } from "../context";
import avatrImage from "../assets/1.jpg";
import { Stack } from "@mui/system";
import "./cards.css";

function Card1() {
  const { state, dispatch } = useContext(CardContext);

  function handleCard1InputChange(event) {
    console.log(event.target.id)
    dispatch({ type: "SET_CARD1_INPUT", payload: event.target.value });
  }

  {
    /* <input type="text" value={state.card1Input} onChange={handleCard1InputChange} /> */
  }
  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="subtitle1">
          אני אלווה אותך בבניית החוזה.
        </Typography>
        <Typography variant="subtitle1">מה כתובת הנכס המושכר?</Typography>
      </div>

      {/* <input type="text" value={state.card1Input} onChange={handleCard1InputChange} /> */}

      <div className="input-stack">
        <TextField id="city" label="עיר" variant="standard" size="small" onChange={handleCard1InputChange}/>
        <TextField id="street" label="רחוב" variant="standard" size="small" />
      </div>

      <div className="input-stack">
        <TextField
          id="homeNumber"
          label="בית"
          variant="standard"
          size="small"
          type={"number"}
        />
        <TextField
          id="apartment"
          label="דירה"
          variant="standard"
          size="small"
          type={"number"}
        />
      </div>
      <TextField
        id="rooms"
        label="חדרים"
        variant="standard"
        size="small"
        type={"number"}
      />
    </div>
  );
}

export default Card1;
