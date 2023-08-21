import { Button, Card, Grid, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useSession } from "../../hooks/useSession";
import PasswordField from "../passwordField";

const RootGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(5),
  // minHeight: `100vh`,
  // height: "100%",

  backgroundImage: "url(https://source.unsplash.com/random?nature)",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("xl")]: {
    padding: `${theme.spacing(5)} ${theme.spacing(2)}`,
  },
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(5),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));
const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  width: "100%",
  minWidth: "min(50vw, 360px)",
  backgroundColor: "#ffffffc4",
  borderRadius: 0,
}));
type Props = {
  onClose: () => void;
};
const Account: React.FCX<Props> = (props) => {
  const { onClose } = props;
  const [session, setSession] = useSession();
  const theme = useTheme();
  return (
    <RootGrid>
      <StyledCard>
        <PasswordField
          value={session.userInfo?.key}
          sx={{
            // width: "100%",
            margin: `${theme.spacing(2)}`,
          }}
          label="Open API Key"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setSession({
              userInfo: {
                key: e.target.value,
              },
            });
          }}
        />
      </StyledCard>
    </RootGrid>
  );
};
export default Account;
