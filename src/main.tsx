import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AppStateProvider from "./component/GlobalStateContext/AppStateProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);
