import { Theme, useMediaQuery } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { parseJwt } from "../core/util";
import { useDeviceDetect } from "../hooks/useDeviceDetect";
export type IGoogleEndPointResponse = {
  iss: string;
  sub: string;
  azp: string;
  aud: string;
  iat: string;
  exp: string;
  name: string;
  email: string;
  local: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: string;
};
type Props = {
  mode: "login" | "signup";
  width: number;
  onSuccess: (res: IGoogleEndPointResponse) => void;
};
const GoogleOnetopSignin: React.FCX<Props> = (props) => {
  const { mode, width, onSuccess } = props;

  useEffect(() => {
    initilize();
  }, [mode, width]);

  return (
    <React.Fragment>
      <div
        id="g_id_onload"
        data-client_id={""}
        data-callback={callback}
        data-auto_prompt="true"
      ></div>
      <div
        id="g_id_signin"
        className="g_id_signin"
        data-width={width}
        data-min-width={width}
        // data-text={mode === "login" ? "signin" : "signup"}
      ></div>
    </React.Fragment>
  );

  function initilize() {
    const google = window["google"];
    google.accounts.id.initialize({
      client_id: "",
    });
    google.accounts.id.renderButton(document.getElementById("g_id_signin"), {
      type: "standard",
      width: width,
      text: mode === "login" ? "signin_with" : "signup_with",
    });
  }

  function callback(res) {
    const credential = res.credential;
    const payload = parseJwt(credential) as IGoogleEndPointResponse;
    if (!payload || !payload.sub) {
      return;
    }
    const { sub, email, name, aud } = payload;
    console.debug("☆", { sub, email, name, aud });
    onSuccess(payload);
  }
};

export default GoogleOnetopSignin;
