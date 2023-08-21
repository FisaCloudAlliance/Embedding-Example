
import React from "react";
import { Grid, styled, Typography } from "@mui/material";
import { appbarHeight } from "../../global";

const BG = styled("div")(({ theme }) => ({
  backgroundImage: "url(https://source.unsplash.com/daily?sad)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#fafafa",
  opacity: 0.2,
  height: `calc(100vh - ${appbarHeight}px)`,
  width: "100%",
  position: "absolute",
  top: appbarHeight,
  left: 0,
  [theme.breakpoints.down("md")]: {
    height: "100vh",
  },
}));
type Props = {};
const NotFound: React.FC<Props> = (props) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <BG />
      <Typography variant="h1" component="p">
        Woops!
        <Typography variant="h3" component="p">
          404 not found
        </Typography>
      </Typography>
    </Grid>
  );
};

export default NotFound;
