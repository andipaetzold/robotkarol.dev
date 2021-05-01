import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.scss";
import { Configuration } from "@react-md/layout";

ReactDOM.render(
  <React.StrictMode>
    <Configuration>
      <App />
    </Configuration>
  </React.StrictMode>,
  document.getElementById("root")
);
