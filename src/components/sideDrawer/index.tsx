import React from "react";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";
import { Drawer, Grid, useTheme } from "@mui/material";
import {
  appbarHeight,
  appbarMobileHeight,
  bottombarHeight,
  drawerWidth,
} from "../../global";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/allStore";
import { updateSideDrawer } from "../../store/sideDrawer";
import SideMenu from "../sideMenus";

type Props = {};

const SideDrawer: React.FCX<Props> = (props) => {
  const drawer = useSelector((state: IRootState) => state.sideDrawer);
  const dispatch = useDispatch();
  const isMobile = useDeviceDetect();
  const theme = useTheme();
  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={drawer.open}
      onClose={() => {
        dispatch(updateSideDrawer(!drawer.open));
      }}
      sx={{
        width: `${drawerWidth}px`,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          zIndex: theme.zIndex.appBar - 10,
        },
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          overflowY: "auto",
          paddingTop: isMobile
            ? `${appbarMobileHeight}px`
            : `${appbarHeight}px`,
          paddingBottom: isMobile ? `${bottombarHeight}px` : 0,
        }}
      >
        <SideMenu />
      </Grid>
    </Drawer>
  );
};

export default SideDrawer;
