import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  styled,
  Theme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";
import GoogleOnetopSignin from "../googleOnetopSignin";
import MicrosoftLogin from "../microsoftLogin";
import { useLoginDialog } from "./useLoginDialog";
import { Typography } from "@mui/material";
import Logo from "../logo";

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  minWidth: `min(300px, calc(100vw - 30px))`,
  minHeight: "400px",
  [theme.breakpoints.down("md")]: {
    padding: `${theme.spacing(1)} `,
  },
}));
type Props = {
  mode: "login" | "signup";
  setMode: (value: "login" | "signup") => void;

  open: boolean;
  setOpen: (value: boolean) => void;
};

const LoginDialog: React.FCX<Props> = (props) => {
  const { mode, setMode, open, setOpen } = props;
  const { width, googleSigninAsync, microsoftSigninAsync } =
    useLoginDialog(mode);
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <StyledDialogContent>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 0 25px 0",
            }}
          >
            <Logo />
            <Typography
              sx={{
                padding: "0 10px",
                color: "#6F7DB7",
              }}
            >
              RenCon VMS
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              padding: "0 0 36px 0",
            }}
          >
            <Typography
              sx={{
                fontSize: "x-large",
                ...(mode === "signup" && {
                  display: "none",
                }),
              }}
            >
              アカウントをお持ちの方は、「Google でログイン」または「Microsoft
              でログイン」 を押下してログインしてください。
            </Typography>
            <Typography
              sx={{
                fontSize: "x-large",
                ...(mode !== "signup" && {
                  display: "none",
                }),
              }}
            >
              こちらはアカウント開設になります。 「Google
              でログイン」または「Microsoft でログイン」 を押下して
              初回アカウント作成に進んでください。
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleOnetopSignin
              mode={mode}
              width={width}
              onSuccess={async (res) => await googleSigninAsync(res)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              padding: "10px 0",
            }}
          >
            <Divider>or</Divider>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MicrosoftLogin
              mode={mode}
              width={width}
              onSuccess={async (res) => await microsoftSigninAsync(res)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              padding: "36px 0 10px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...(mode === "signup" && {
                display: "none",
              }),
            }}
          >
            <Typography
              sx={{
                fontSize: "small",
              }}
            >
              初めてご利用される場合
            </Typography>
            <Button
              sx={{
                fontSize: "small",
                // padding: 0,
                margin: 0,
              }}
              onClick={() => setMode("signup")}
            >
              無料アカウント作成
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              padding: "36px 0 10px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...(mode !== "signup" && {
                display: "none",
              }),
            }}
          >
            <Typography
              sx={{
                fontSize: "small",
              }}
            >
              アカウントを既にお持ちの方は
            </Typography>
            <Button
              sx={{
                fontSize: "small",
                // padding: 0,
                margin: 0,
              }}
              onClick={() => setMode("login")}
            >
              ログインへ
            </Button>
          </Grid>
        </Grid>
      </StyledDialogContent>
    </Dialog>
  );
};

export default LoginDialog;
