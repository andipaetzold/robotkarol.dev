import { MessageQueue } from "@react-md/alert";
import { Configuration } from "@react-md/layout";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Configuration>
      <MessageQueue id="message-queue">
        <App />
      </MessageQueue>
    </Configuration>
  </React.StrictMode>,
  document.getElementById("root")
);
