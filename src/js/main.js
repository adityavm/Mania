// base
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ipcRenderer } from "electron";

// app
import { persistState, handleKeyboard } from "js/mainLib";
import AppState from "js/reducers/app";
import App from "js/app/app";
import { EVENT } from "js/app/constants";

// styles
import "scss/style";

const getState = localStorage.getItem("state");
const store = createStore(AppState, getState ? JSON.parse(getState) : null);
persistState(store);

// handle keyboard shortcuts
ipcRenderer.on(EVENT.KEYBOARD, (event, msg) => handleKeyboard(store, msg));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("app")
);
