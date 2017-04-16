const random = [ "rgb(205, 45, 45)", "rgb(132, 191, 46)", "rgb(51, 175, 208)", "rgb(237, 180, 34)"];
console.log("%calive!", `color:${random[Math.floor(Math.random() * (random.length-1) + 0)]}`, "yes.");

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
