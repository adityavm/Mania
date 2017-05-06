// base
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

// app
import { persistState } from "js/mainLib";
import AppState from "js/reducers/app";
import App from "js/app/app";

// styles
import "scss/style";

const getState = localStorage.getItem("state");
const store = createStore(AppState, getState ? JSON.parse(getState) : null);
persistState(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("app")
);
