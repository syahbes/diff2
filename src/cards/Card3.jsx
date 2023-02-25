import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "../context";
import avatrImage from "../assets/1.jpg";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";

import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

//ltr
const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

const checkBoxMap = [
  { label: "ארנונה", id: "arnona" },
  { label: "גז", id: "gas" },
  { label: "חשמל", id: "electricity" },
  { label: "אינטרנט", id: "internet" },
  { label: "מים", id: "water" },
  { label: "חימום", id: "heat" },
  { label: "ועד בית ודמי ניהול", id: "vaad" },
  { label: "טלויזיה בלווין / כבלים", id: "tv" },
];

function Card3() {
  const { state, dispatch } = useContext(CardContext);
  const handleInputChange = (e) => {
    setTimeout(() => { dispatch({ type: "SCROLL_INTO", payload: "rentRef" }) }, 20);
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: e.target.id, value: e.target.value },
    });
  };

  const handleSelect = (e) => {
    setTimeout(() => { dispatch({ type: "SCROLL_INTO", payload: "rentRef" }) }, 20);
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSwitchChange = (event) => {
    dispatch({ type: "SCROLL_INTO", payload: "includeRef" });
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: event.target.id, value: event.target.checked },
    });
    if (!event.target.checked) {
      dispatch({ type: "RESET_CARD_3_INCLUDES" });
    }
  };
  const handleCheck = (e) => {
   
    // console.log("dispatching",e.target.id, e.target.checked);
    dispatch({
      type: "SET_CHECK_VALUE",
      payload: { name: e.target.id, value: e.target.checked },
    });
  };

  // useEffect(() => {
  //   dispatch({ type: "SCROLL_INTO", payload: "rentRef" });
  // }, []);

  const CustomSwitch = () => {
    return (
      <div className="extOption">
        <Typography variant="body1">כן</Typography>
        <CacheProvider value={cacheLtr}>
          <Switch
            id="card3Input4"
            checked={state.card3Input4}
            onChange={handleSwitchChange}
          />
        </CacheProvider>
        <Typography variant="body1">לא</Typography>
      </div>
    );
  };

  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="subtitle1">
          נשמע טוב, אז כמה עולה התענוג?
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "20px",
        }}
      >
        <TextField
          id="card3Input1"
          label="הכנס סכום שכירות כולל"
          variant="standard"
          size="small"
          onChange={handleInputChange}
        />
        <Typography variant="body2">₪</Typography>
      </div>
      <div className="input-stack">
        <Box sx={{ minWidth: 150 }}>
          <FormControl
            variant="standard"
            fullWidth
          >
            <InputLabel id="numofRent-label">מספר שוכרים</InputLabel>
            <Select
              id="card3Input2"
              name="card3Input2"
              labelId="numofRent-label"
              value={state.card3Input2}
              onChange={handleSelect}
             
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* anoter */}
        <Box sx={{ minWidth: 150 }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="payDate-label">תאריך לחיוב</InputLabel>
            <Select
              id="card3Input3"
              name="card3Input3"
              labelId="payDate-label"
              value={state.card3Input3}
              onChange={handleSelect}
            >
              <MenuItem value="2">2 לחודש</MenuItem>
              <MenuItem value="10">10 לחודש</MenuItem>
              <MenuItem value="15">15 לחודש</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="extOptionContainer">
        <Typography variant="body1">תשלומים נוספים כלולים בשכ"ד?</Typography>
        <CustomSwitch />
      </div>
      {state.card3Input4 && (
        <div className="includeContainer">
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "10px",
              padding: "0 30px",
            }}
          >
            {checkBoxMap.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    onChange={handleCheck}
                    id={item.id}
                    checked={state.card3Includes[item.id]}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>
        </div>
      )}
    </div>
  );
}

export default Card3;
