import { Drawer, Grid, useTheme } from "@mui/material";
import React from "react";
import {
  appbarHeight,
  appbarMobileHeight,
  bottombarHeight,
} from "../../global";
import Account from "../account";
import { useAccountDrawer } from "./useAccountDrawer";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AccountDrawer: React.FCX<Props> = (props) => {
  const { open, setOpen } = props;
  const { } = useAccountDrawer();
  const isMobile = useDeviceDetect();
  const theme = useTheme();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        zIndex: theme.zIndex.appBar - 10,
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
        <Account onClose={() => setOpen(false)} />
      </Grid>
    </Drawer>
  );
};
export default AccountDrawer;
