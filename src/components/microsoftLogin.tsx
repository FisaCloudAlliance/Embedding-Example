import React, { useState } from "react";
import { MicrosoftLoginButton } from "react-social-login-buttons";
import {
  AuthenticationResult,
  Configuration,
  InteractionType,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";

type Props = {
  mode: "login" | "signup";
  width: number;
  onSuccess: (res: AuthenticationResult) => void;
};

const MicrosoftLogin: React.FCX<Props> = (props) => {
  const { mode, width, onSuccess } = props;
  return (
    <MicrosoftLoginButton
      onClick={async () => await onClickAsync()}
      text={`Microsoft で${mode === "login" ? "ログイン" : "登録"}`}
      size={`38px`}
      style={{
        width: width,
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
      }}
    />
  );

  async function onClickAsync() {  
    const auth = new PublicClientApplication({
      auth: {
        authority:
          "https://stavms.b2clogin.com/stavms.onmicrosoft.com/B2C_1_flow-signup",
        clientId: "47d6783a-b968-48d4-86f2-7da25b781571",
        redirectUri: "http://localhost:5173/",
        knownAuthorities: ["stavms.b2clogin.com"], 
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
      },
    });
    await auth.initialize();
    const res = await auth.loginPopup();
  }
};

export default MicrosoftLogin;
