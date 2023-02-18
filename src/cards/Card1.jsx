import { Avatar, Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CardContext } from "../context";
import avatrImage from "../assets/1.jpg";
import { Stack } from "@mui/system";
import "./cards.css";

function Card1() {
  const { state, dispatch } = useContext(CardContext);

  const handleCard1InputChange = (e) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: e.target.id, value: e.target.value },
    });
  };

  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="subtitle1">
          אני אלווה אותך בבניית החוזה.
        </Typography>
        <Typography variant="subtitle1">מה כתובת הנכס המושכר?</Typography>
      </div>

      <div className="input-stack">
        <TextField
          id="card1Input1"
          label="עיר"
          variant="standard"
          size="small"
          onChange={handleCard1InputChange}
        />
        <TextField
          id="card1Input2"
          label="רחוב"
          variant="standard"
          size="small"
          onChange={handleCard1InputChange}
        />
      </div>

      <div className="input-stack">
        <TextField
          id="card1Input3"
          label="בית"
          variant="standard"
          size="small"
          type={"number"}
          onChange={handleCard1InputChange}
        />
        <TextField
          id="card1Input4"
          label="דירה"
          variant="standard"
          size="small"
          type={"number"}
          onChange={handleCard1InputChange}
        />
      </div>
      <TextField
        id="card1Input5"
        label="חדרים"
        variant="standard"
        size="small"
        type={"number"}
        onChange={handleCard1InputChange}
      />
    </div>
  );
}

export default Card1;
