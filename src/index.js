import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BlurProvider } from "./contexts/BlurContext";
import './i18n.js'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
      <BlurProvider>
          <App />
      </BlurProvider>

  // </React.StrictMode>
);
