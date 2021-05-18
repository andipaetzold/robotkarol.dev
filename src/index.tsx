import { MessageQueue } from "@react-md/alert";
import { Configuration } from "@react-md/layout";
import { ErrorBoundary } from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import "./index.scss";
import "./services/sentry";
import { store } from "./services/store";

ReactDOM.render(
  <React.StrictMode>
    <Configuration disableRipple>
      <MessageQueue id="message-queue">
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </MessageQueue>
    </Configuration>
  </React.StrictMode>,
  document.getElementById("root")
);
