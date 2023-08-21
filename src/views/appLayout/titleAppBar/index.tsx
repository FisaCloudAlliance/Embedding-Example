import {
  AppBar,
  Button,
  Grid,
  IconButton,
  styled,
  Toolbar,
} from "@mui/material";
import React from "react";
import Logo from "../../../components/logo";
import { appbarHeight } from "../../../global";
import { useTitleAppBar } from "./useTitleAppBar";
import MenuIcon from "@mui/icons-material/Menu";
import AccountDrawer from "../../../components/accountDrawer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SideDrawer from "../../../components/sideDrawer";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 0,
  height: appbarHeight,
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  backgroundColor: "white",
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingRight: "0 !important",
  paddingLeft: "0 !important",
  height: "100%",
}));
const Div = styled("div")(({ theme }) => ({}));
type Props = {};
const TitleAppBar: React.FCX<Props> = (props) => {
  const {} = props;
  const { logoClickAsync, open, setOpen, toggleDrawer } =
    useTitleAppBar();

  return (
    <Div>
      <StyledAppBar elevation={0} position="fixed" id="re-header">
        <StyledToolbar>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                flex: 1,
              }}
            >
              <Button
                onClick={async () => await logoClickAsync()}
                startIcon={<Logo />}
              ></Button>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            {/** 設定 */}
            <IconButton onClick={() => setOpen(!open)}>
              <ManageAccountsIcon />
            </IconButton>
            {/** ハンバーガー */}
            <IconButton onClick={() => toggleDrawer()}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </Grid>
        </StyledToolbar>
      </StyledAppBar>
      <AccountDrawer open={open} setOpen={setOpen} />
      <SideDrawer />
    </Div>
  );
};

export default TitleAppBar;
