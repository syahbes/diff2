import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import avatrImage from "../assets/1.jpg";
import { Switch, TextField } from "@mui/material";
import { CardContext } from "../context";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

//ltr
const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

const Card7 = () => {
  // useEffect(() => {
  //   dispatch({ type: "SCROLL_INTO", payload: "ENTER_REF_NAME" });
  // }, []);
  const { state, dispatch } = useContext(CardContext);

  const handleSwitch = (event) => {
    if (event.target.id == "card7Switch4") {
      dispatch({ type: "SCROLL_INTO", payload: "section10Ref" });
    }

    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: event.target.id, value: event.target.checked },
    });
  };

  const handleCard5InputChange = (event) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: event.target.id, value: event.target.value },
    });
  };
  const CustomSwitch = ({ id, text }) => {
    const checked = state[`card7Switch${id}`];
    return (
      <div className="switchesContainer">
        <Typography variant="body1">{text}</Typography>
        <div className="switches">
          <Typography variant="body1">כן</Typography>
          <CacheProvider value={cacheLtr}>
            <Switch
              id={`card7Switch${id}`}
              checked={checked}
              onChange={handleSwitch}
            />
          </CacheProvider>
          <Typography variant="body1">לא</Typography>
        </div>
      </div>
    );
  };

  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="h6">
          יופי, רוצה להתייחס לאחת מהאפשרויות הבאות?
        </Typography>
        <div className="switches-container">
          <CustomSwitch id={1} text={'הבניין מיועד לתמ"א 38?'} />
          {state.card7Switch1 && (
            <CustomSwitch id={2} text={'שכ"ד מופחת בזמן העבודות?'} />
          )}

          {state.card7Switch2 && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: "20px",
              }}
            >
              <TextField
                fullWidth
                id="card7Input3"
                value={state.card7Input3}
                label="הכנס סכום שכר דירה מופחת"
                variant="standard"
                size="small"
                onChange={handleCard5InputChange}
              />
              <Typography variant="body2">₪</Typography>
            </div>
          )}
          <CustomSwitch id={4} text={"התחייבות בחוזה לעריכת ביטוחים"} />
          <CustomSwitch id={5} text={"רוצה להוסיף משהו בטקסט חופשי?"} />
          {state.card7Switch5 && (
            <TextField
              fullWidth
              id="card7Input6"
              value={state.card7Input6}
              label="לדוגמא: אסור לשוכרים לקדוח בקרמיקה"
              variant="standard"
              size="small"
              onChange={handleCard5InputChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card7;
