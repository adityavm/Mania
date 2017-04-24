// base
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

// containers
import AppState from "js/reducers/app";
import App from "js/app/app";

// styles
import "scss/style";

let store = createStore(AppState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("app")
);
