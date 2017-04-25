// base
import React from "react";

// app
import Payload from "./payload";
import Runner from "./runner";

// style
import "scss/containers/modifiers";

const expandThis = elm => {
  ["runner", "payload"].forEach(ele => document.querySelector(`#${ele}`).classList.remove("expanded"));
  document.querySelector(`#${elm}`).classList.add("expanded");
};

const QueryModifiers = () => (
  <div id="query-modifiers">
    <Payload onClick={expandThis} />
    <Runner onClick={expandThis} />
  </div>
);

export default QueryModifiers;
