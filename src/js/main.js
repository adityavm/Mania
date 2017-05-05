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

const getState = localStorage.getItem("state");
const store = createStore(AppState, getState ? JSON.parse(getState) : null);

(() => {
  let timeout = null;
  const savedState = () => document.querySelector(".saved-status");

  store.subscribe(() => {
    savedState().classList.add("saving");
    const state = store.getState();
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    };
    timeout = setTimeout(() => {
      localStorage.setItem("state", JSON.stringify(state));
      timeout = null;
      console.log("Saved @ ", new Date());
      savedState().classList.remove("saving");
    }, 2000);
  });
})(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("app")
);
