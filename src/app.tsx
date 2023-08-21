import React, { useEffect, useRef } from "react";
import {
  Backdrop,
  CircularProgress,
  createTheme,
  CssBaseline,
  outlinedInputClasses,
  styled,
  ThemeProvider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./store/allStore";
import { SnackbarProvider } from "notistack";
import AppLayout from "./views/appLayout";
import { useSessionContext, SessionContext } from "./hooks/useSession";
import AppRoute from "./appRoute";
import LoadingBar from "react-top-loading-bar";
import { updateProgress } from "./store/progress";

const fontFamily = [
  "Noto Sans JP",
  "Open Sans",
  "メイリオ",
  "Meiryo",
  "ＭＳ Ｐゴシック",
  "MS PGothic",
  "sans-serif",
].join(",");
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  zIndex: 1601, // https://mui.com/customization/z-index/
  color: "#fff",
}));
const App: React.FC = () => {
  const overlay = useSelector((state: IRootState) => state.waitSite);
  const theme = useSelector((state: IRootState) => state.theme);
  const [session, setSession] = useSessionContext();
  const pregress = useSelector((x: IRootState) => x.progress);
  const dispatch = useDispatch();
  const ref = useRef<any>();
  useEffect(() => {
    dispatch(updateProgress(ref.current));
  }, [ref]);

  const newTheme = createTheme({
    palette: {
      mode: theme.mode,
      //   primary: {
      //     main: "#28366c",
      //   },
    },
    typography: {
      fontFamily: fontFamily,
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            position: "absolute",
            bottom: "0",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            // position: "absolute",
            // top: "-10px !important",
            // left: "-10px !important",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            // color: "#726A57 !important",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            // https://mui.com/guides/classname-generator/#heading-caveat
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              // borderColor: "transparent",
            },
            [`& .${outlinedInputClasses.input}`]: {
              borderTopLeftRadius: "10px !important",
              borderBottomLeftRadius: "10px !important",
            },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {},
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        xxl: 2560,
      },
    },
  });
  return (
    <ThemeProvider theme={newTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={1000 * 10}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SessionContext.Provider
          value={{ state: session, dispatch: setSession }}
        >
          <AppLayout>
            <AppRoute />
          </AppLayout>
        </SessionContext.Provider>
        <StyledBackdrop open={overlay.open}>
          <CircularProgress color="inherit" />
        </StyledBackdrop>
        <LoadingBar color="#f11946" /* color="#28366c" */ ref={ref} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};
export default App;
