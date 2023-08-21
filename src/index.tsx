import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import "@ts-scratcher/extensions";
import "./core";
import "./global";
import store from "./store/allStore";
import { persistor } from "./store/allStore";
import App from "./app";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
