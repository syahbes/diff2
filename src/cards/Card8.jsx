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
  const handleCard8InputChange = () => {};

  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="h6">שלב אחרון - הזנת פרטים אישיים</Typography>
        <TextField
          fullWidth
          id="card8Input1"
          label="שם בעל הנכס"
          variant="standard"
          size="small"
          onChange={handleCard8InputChange}
        />
        <TextField
          fullWidth
          id="card8Input1"
          label="מייל בעל הנכס"
          variant="standard"
          size="small"
          onChange={handleCard8InputChange}
        />
        <TextField
          fullWidth
          id="card8Input1"
          label="תעודת זהות בעל הנכס"
          variant="standard"
          size="small"
          onChange={handleCard8InputChange}
        />
      </div>
    </div>
  );
};
export default Card8;
