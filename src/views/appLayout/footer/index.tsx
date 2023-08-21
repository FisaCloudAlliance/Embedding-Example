import { Grid, styled } from "@mui/material";
import React from "react";
import Copylight from "../../../components/copylight";
import { footerHeight } from "../../../global";
const StyledFooter = styled("footer")(({ theme }) => ({
  width: "100%",
  height: `${footerHeight}px`,
  display: "flex",
  alignItems: "flex-end",
}));
type Props = {};

const Footer: React.FCX<Props> = (props) => {
  return (
    <StyledFooter>
      <Grid container>
        <Copylight />
      </Grid>
    </StyledFooter>
  );
};

export default Footer;