import { Theme, useMediaQuery } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useSignin } from "../../hooks/auth/useSignin";
import { useSignup } from "../../hooks/auth/useSignup";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";
import { userInfomation } from "../../hooks/useSession";
import { IGoogleEndPointResponse } from "../googleOnetopSignin";
import {
  AuthenticationResult,
} from "@azure/msal-browser";
export function useLoginDialog(mode: "login" | "signup") {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isMobile = useDeviceDetect();
  const getWidth = () => (smDown || isMobile ? 200 : 330);
  const [width, setWidth] = useState(getWidth());
  const signinAsync = useSignin();
  const signupAsync = useSignup();
  useLayoutEffect(() => {
    const width = getWidth();
    setWidth(width);
  }, [mode, smDown, isMobile]);

  return {
    width,
    googleSigninAsync,
    microsoftSigninAsync,
  };

  async function googleSigninAsync(res: IGoogleEndPointResponse) {
    const { sub, email, name, aud } = res;
    await authenticationAsync({
      identity: sub,
      email,
      name,
      aud,
      authorityType: "google",
    });
  }

  async function microsoftSigninAsync(res: AuthenticationResult) {
    const {} = res;
    await authenticationAsync({
      identity: "dummy",
      email: "dummy@gmail.com",
      name: "Jane Doe",
      aud: "dummy",
      authorityType: "MSSTS",
    });
  }

  async function authenticationAsync(info: userInfomation) {
    if (mode === "login") {
      await signinAsync(info);
    } else {
      await signupAsync(info);
    }
  }
}
