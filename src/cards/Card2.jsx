import React, { useContext, useState } from "react";
import { CardContext } from "../context";
import avatrImage from "../assets/1.jpg";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

//ltr
const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

function manipulateDate(dateStr) {
  // Split the date string into its components
  const [year, month, day] = dateStr.split("-").map(Number);
  // Create a new date object with the input date
  const inputDate = new Date(year, month - 1, day);
  // Add one year and decrease one day
  const outputDate = new Date(
    inputDate.getFullYear() + 1,
    inputDate.getMonth(),
    inputDate.getDate() - 1
  );
  // Check if the day or month is 0 and adjust accordingly
  const outputMonth = outputDate.getMonth() + 1;
  const outputDay = outputDate.getDate();
  const adjustedMonth = outputMonth === 0 ? 12 : outputMonth;
  const adjustedDay = outputDay === 0 ? 1 : outputDay;
  // Format the output date as YYYY-MM-DD and return it
  const outputDateString = `${outputDate.getFullYear()}-${String(
    adjustedMonth
  ).padStart(2, "0")}-${String(adjustedDay).padStart(2, "0")}`;
  return outputDateString;
}

const reverseDate = (dateStr) => {
  return dateStr.split("-").reverse().join("-");
};

function Card2() {
  const { state, dispatch } = useContext(CardContext);
  const [exitDate, setExitDate] = useState("");
  const handleCardInputChange = (e) => {
    dispatch({ type: "SCROLL_INTO", payload: "dateRef" });
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: e.target.id, value: reverseDate(e.target.value) },
    });
    if (e.target.id === "card2Input1") {
      let calExitDate = manipulateDate(e.target.value);
      setExitDate(calExitDate);
      dispatch({
        type: "SET_INPUT_VALUE",
        payload: { name: "card2Input2", value: reverseDate(calExitDate) },
      });
    } else {
      setExitDate(e.target.value);
    }
  };

  const handleSwitchChange = (e) => {
    // console.log(e.target.checked)
    dispatch({ type: "SCROLL_INTO", payload: "optionRef" });
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: e.target.id, value: e.target.checked },
    });
  };
  const CustomSwitch = () => {
    return (
      <div className="extOption">
        <Typography variant="body1">כן</Typography>
        <CacheProvider value={cacheLtr}>
          <Switch
            id="card2Input3"
            checked={state.card2Input3}
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
        <Typography variant="subtitle1">אחלה מיקום,</Typography>
        <Typography variant="subtitle1">ומה תקופת השכירות?</Typography>
      </div>
      <div className="dates-div">
        <Typography variant="body1">תאריך כניסה</Typography>
        <input
          type="date"
          id="card2Input1"
          onChange={handleCardInputChange}
          className="inputDate"
        />
      </div>
      <div className="dates-div">
        <Typography variant="body1">תאריך יציאה</Typography>
        <input
          type="date"
          id="card2Input2"
          onChange={handleCardInputChange}
          value={exitDate}
          className="inputDate"
        />
      </div>
      <div className="extOptionContainer">
        <Typography variant="body1">הארכת חוזה?</Typography>
        <CustomSwitch />
      </div>
    </div>
  );
}

export default Card2;
