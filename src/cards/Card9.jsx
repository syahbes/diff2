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

const Card9 = () => {
  const { state, dispatch } = useContext(CardContext);

  useEffect(() => {
    dispatch({ type: "SCROLL_INTO", payload: "card8Ref" });
  }, []);

  const handleCard9InputChange = (event) => {
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: { name: event.target.id, value: event.target.value },
    });
  };

  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="h6">שלב אחרון - הזנת פרטים</Typography>
        <TextField
          fullWidth
          id="card9Input1"
          label="שם השוכר.ת"
          variant="standard"
          size="small"
          value={state.card9Input1}
          onChange={handleCard9InputChange}
        />
        <TextField
          fullWidth
          id="card9Input2"
          label="מייל השוכר.ת"
          variant="standard"
          size="small"
          value={state.card9Input2}
          onChange={handleCard9InputChange}
        />
        <TextField
          fullWidth
          id="card9Input3"
          label="תעודת זהות השוכר.ת"
          variant="standard"
          size="small"
          type="number"
          value={state.card9Input3}
          onChange={handleCard9InputChange}
        />
      </div>
    </div>
  );
};
export default Card9;
