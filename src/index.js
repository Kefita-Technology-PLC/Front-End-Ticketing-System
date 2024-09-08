import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BlurProvider } from "./contexts/BlurContext";
import './i18n.js'
import { EthiopianOrGregorian } from "./contexts/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
      <BlurProvider>
        <EthiopianOrGregorian>
          <App />
        </EthiopianOrGregorian>
      </BlurProvider>

  // </React.StrictMode>
);
