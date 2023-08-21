import { SxProps, Theme } from "@mui/material";
import React from "react";
import { IRootState } from "./store/allStore";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
      xs: true;
      sm: true;
      md: true;
      lg: true;
      xl: true;
      xxl: true;
    }
  }
declare module "react" {
  type FCX<P = {}> = React.FunctionComponent<
    P & { className?: string; children?: any; sx?: SxProps<Theme> }
  >;
}

declare module "react-redux" {
  interface DefaultRootState extends IRootState {}
}

/** タイトルバーの高さ */
export const appbarHeight = 75;
/** タイトルバーの高さ(モバイルの場合) */
export const appbarMobileHeight = 75;
/** フッターの高さ */
export const footerHeight = 26;
/** ボトムバーの高さ */
export const bottombarHeight = 60;
/** サイドバーのサイズ */
export const drawerWidth = 250;