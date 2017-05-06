// base
import React from "react";
import { ipcRenderer } from "electron";
import { EVENT } from "js/app/constants";

// app
import Payload from "./payload";
import Runner from "./runner";

// style
import "scss/containers/modifiers";

// toggle panels from shortcuts
ipcRenderer.on(EVENT.KEYBOARD, (event, msg) => {
  if (msg === EVENT.SHOW_RUNNER) expandThis("runner");
  if (msg === EVENT.SHOW_PAYLOAD) expandThis("payload");
});

const expandThis = elm => {
  ["runner", "payload"].forEach(ele => document.querySelector(`#${ele}`).classList.remove("expanded"));
  let elem = document.querySelector(`#${elm}`);
  elem.classList.add("expanded");
  elem.querySelector("textarea").focus();
};

const QueryModifiers = () => (
  <div id="query-modifiers">
    <Payload onClick={expandThis} />
    <Runner onClick={expandThis} />
  </div>
);

export default QueryModifiers;
