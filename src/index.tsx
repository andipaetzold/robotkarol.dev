import { MessageQueue } from "@react-md/alert";
import { Configuration } from "@react-md/layout";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import "./index.scss";
import { store } from "./services/store";

ReactDOM.render(
  <React.StrictMode>
    <Configuration disableRipple>
      <MessageQueue id="message-queue">
        <Provider store={store}>
          <App />
        </Provider>
      </MessageQueue>
    </Configuration>
  </React.StrictMode>,
  document.getElementById("root")
);
