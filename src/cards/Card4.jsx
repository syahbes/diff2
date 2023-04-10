import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import avatrImage from "../assets/1.jpg";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";
import { CardContext } from "../context";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

//ltr
const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

const switchArr = ["ערבות בנקאית", "פיקדון", "שטר חוב", "צ'ק בנקאי"];

const Card4 = () => {
  useEffect(() => {
    dispatch({ type: "SCROLL_INTO", payload: "securityRef" });
  }, []);
  const { state, dispatch } = useContext(CardContext);


  const handleRadioChange = (event) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: "card4SignBy", value: event.target.value },
    })
  };

  const handleSwitch = (event) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: event.target.id, value: event.target.checked },
    });
  };

  const handleCard4InputChange = (event) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: event.target.id, value: event.target.value },
    });
  };

  const CustomSwitch = ({ id, text }) => {
    const checked = state[`card4Switch${id}`];
    return (
      <div className="switchesContainer">
        <Typography variant="body1">{text}</Typography>
        <div className="switches">
          <Typography variant="body1">כן</Typography>
          <CacheProvider value={cacheLtr}>
            <Switch
              id={`card4Switch${id}`}
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
        <Typography variant="h6">ביטחונות מעבר לתשלום שכ"ד </Typography>

        <div className="switches-container">
          <CustomSwitch id={1} text={"צ'ק ביטחון"} />
          {state.card4Switch1 && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: "20px",
              }}
            >
              <TextField
                fullWidth
                id={"card4Input1"}
                value={state.card4Input1}
                label="על סך"
                variant="standard"
                size="small"
                onChange={handleCard4InputChange}
              />
              <Typography variant="body2">₪</Typography>
            </div>
          )}
        </div>
        {/*  */}

        <FormControl>
          <FormLabel id="sign-by">חתום ע"י</FormLabel>
          <RadioGroup
            row
            aria-labelledby="sign-by"
            name="row-radio-buttons-group"
            value={state.card4SignBy}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="שוכר"
              control={<Radio />}
              label="שוכר"
            />
            <FormControlLabel value="ערב" control={<Radio />} label="ערב" />
          </RadioGroup>
        </FormControl>

        {/*  */}

        <div className="switches-container">
          {switchArr.map((item, index) => {
            const switchNum = "card4Switch" + (index + 2);
            const inputNum = "card4Input" + (index + 2);
            return (
              <div key={item}>
                <CustomSwitch
                  // key={index}
                  id={index + 2}
                  text={item}
                />
                {state[switchNum] && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      marginBottom: "20px",
                    }}
                  >
                    <TextField
                      fullWidth
                      id={inputNum}
                      value={state[inputNum]}
                      label="על סך"
                      variant="standard"
                      size="small"
                      onChange={handleCard4InputChange}
                    />
                    <Typography variant="body2">₪</Typography>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card4;
