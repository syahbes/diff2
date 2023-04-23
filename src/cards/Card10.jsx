import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import avatrImage from "../assets/1.jpg";
import { Button, Switch, TextField } from "@mui/material";
import { CardContext } from "../context";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import generateDocx from "../generateDocx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDoc from "../PDFDoc";

//ltr
const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

const Card10 = () => {
  const { state, dispatch } = useContext(CardContext);

  return (
    <div className="card-container">
      <div className="centered-col">
        <Avatar alt="avatar" src={avatrImage} sx={{ width: 50, height: 50 }} />
        <Typography variant="h6" mb={5}>
          מסך אחרון - צריך להחליף טקסט
        </Typography>
        <Button
          sx={{
            marginBottom: "20px",
          }}
          variant="contained"
          onClick={() => {
            generateDocx(state);
          }}

        >
          להורדת DOCX
        </Button>

        <PDFDownloadLink
          document={<PDFDoc />}
          fileName={"הסכם-שכירות.pdf"}
          download
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : <Button variant="contained">להורדת PDF</Button>
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};
export default Card10;
