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

const Card6 = () => {
  useEffect(() => {
    dispatch({ type: "SCROLL_INTO", payload: "petsRef" });
  }, []);

  const { state, dispatch } = useContext(CardContext);

  const handleSwitch = (event) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: event.target.id, value: event.target.checked },
    });
  };

  const CustomSwitch = ({ id, text }) => {
    const checked = state[`card6Switch${id}`];
    return (
      <div className="switchesContainer">
        <Typography variant="body1">{text}</Typography>
        <div className="switches">
          <Typography variant="body1">כן</Typography>
          <CacheProvider value={cacheLtr}>
            <Switch
              id={`card6Switch${id}`}
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
        <Typography variant="h6" sx={{ maxWidth: "350px"}}>
          אוטוטו מסיימים, אבל לא לפני שנדבר על כמה כללי אצבע להתנהלות בנכס שלך
        </Typography>

        <div className="switches-container">
          <CustomSwitch id={1} text={"ניתן להחזיק חיות מחמד בדירה?"} />
          <CustomSwitch id={2} text={"צביעת הדירה בסיום החוזה?"} />
          <CustomSwitch id={3} text={"החרגת חניה מהחוזה?"} />
          <CustomSwitch id={4} text={"החרגת מחסן מהחוזה?"} />
        </div>
      </div>
    </div>
  );
};

export default Card6;
