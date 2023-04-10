import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import avatrImage from "../assets/1.jpg";
import { TextField } from "@mui/material";
import { CardContext } from "../context";

const Card5 = () => {
  useEffect(() => {
    dispatch({ type: "SCROLL_INTO", payload: "equipmentRef" });
  }, []);

  const { state, dispatch } = useContext(CardContext);

  const handleCard5InputChange = (e) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: e.target.id, value: e.target.value },
    });
  };

  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="h6">הסוד הוא בפרטים הקטנים.</Typography>
        <Typography variant="h6">
          איזו תכולה נשארת בדירה שלך ואיזו ליקויים קיימים בה?
        </Typography>

        <TextField
          fullWidth
          id="card5Input1"
          value={state.card5Input1}
          label="דברים שנשארים בדירה"
          variant="standard"
          size="small"
          onChange={handleCard5InputChange}
          sx={{ marginTop: "20px" }}
        />
        <TextField
          fullWidth
          sx={{ marginTop: "20px" }}
          id="card5Input2"
          value={state.card5Input2}
          label="ליקויים לתיקון תוך 14 יום"
          variant="standard"
          size="small"
          onChange={handleCard5InputChange}
        />
        <TextField
          fullWidth
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          id="card5Input3"
          value={state.card5Input3}
          label="ליקויים קבועים בדירה"
          variant="standard"
          size="small"
          onChange={handleCard5InputChange}
        />
      </div>
    </div>
  );
};

export default Card5;
