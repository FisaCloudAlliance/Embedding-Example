import React from "react";
import { Grid, styled, Typography, useTheme } from "@mui/material";

const StyledHeightGrid = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(2),
  },
}));

const CenterGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: { textAlign: "center" },
}));

type Props = {};
const Index: React.FCX<Props> = (prop) => {
  const theme = useTheme();
  return (
    <>
      <StyledHeightGrid container>
        {/** コピーライト */}
        <CenterGrid item xs={12} md={12}>
          <StyledTypography sx={{}}>
            {` Copyright © FISA All rights reserved.`}
          </StyledTypography>
        </CenterGrid>
      </StyledHeightGrid>
    </>
  );
};
export default Index;
