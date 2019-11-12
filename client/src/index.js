import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Redux";
import App from "./Containers/App";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
