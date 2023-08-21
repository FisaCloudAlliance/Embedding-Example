import { styled } from "@mui/material";
import React from "react";
import TitleAppBar from "./titleAppBar";
import Footer from "./footer";
import {
  appbarHeight,
  appbarMobileHeight,
  drawerWidth,
  footerHeight,
} from "../../global";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/allStore";
const StyledMain = styled("main", {
  shouldForwardProp: (props) => props !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  height: "100%",
  minHeight: "100vh",
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "auto",
  overflowScrolling: "auto",
  transition: theme.transitions.create("padding", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open && {
    paddingLeft: `${drawerWidth}px`,
  }),
  [theme.breakpoints.down("md")]: {},
}));
const StyledMainInner = styled("div")(({ theme }) => ({
  height: "100%",
  marginTop: `${appbarHeight}px`,
  padding: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.down("md")]: {
    minHeight: `calc(100vh - ${footerHeight}px)`,
    marginTop: `${appbarMobileHeight}px`,
  },
  "&>div": {
    minHeight: `calc(100vh - ${appbarHeight + footerHeight}px - 16px)`,
  },
}));
const Div = styled("div")(({ theme }) => ({}));
type Props = {};
const AppLayout: React.FCX<Props> = (props) => {
  const { children } = props;
  const drawer = useSelector((state: IRootState) => state.sideDrawer);
  return (
    <Div>
      <TitleAppBar />
      <StyledMain id="content-wrapper" open={drawer.open} sx={{}}>
        <StyledMainInner>
          {/* タイトル */}
          {children}
        </StyledMainInner>
        <Footer />
      </StyledMain>
    </Div>
  );
};
export default AppLayout;
