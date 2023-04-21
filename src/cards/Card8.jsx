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

const Card8 = () => {
  const { state, dispatch } = useContext(CardContext);

  useEffect(() => {
    dispatch({ type: "SCROLL_INTO", payload: "card8Ref" });
  }, []);

  const handleCard8InputChange = (event) => {
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
          id="card8Input1"
          value={state.card8Input1}
          label="שם בעל הנכס"
          variant="standard"
          size="small"
          onChange={handleCard8InputChange}
        />
        <TextField
          fullWidth
          id="card8Input2"
          label="מייל בעל הנכס"
          variant="standard"
          size="small"
          value={state.card8Input2}
          onChange={handleCard8InputChange}
        />
        <TextField
          fullWidth
          id="card8Input3"
          label="תעודת זהות בעל הנכס"
          variant="standard"
          size="small"
          type="number"
          value={state.card8Input3}
          onChange={handleCard8InputChange}
        />
      </div>
    </div>
  );
};
export default Card8;
