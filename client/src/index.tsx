import React from "react";
import ReactDOM from "react-dom/client";
import store from "./features/redux/store/Store";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import constants from "./utils/constants";
import ErrorBoundary from "./context/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const googleAuthClient = constants.GOOGLE_AUTH_CLIENT;

root.render(
    <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
    </ErrorBoundary>
);
