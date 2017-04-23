// base
import React from "react";

// app
import Query from "./query/input";
import Modifiers from "./modifiers/modifiers";
import Repl from "./repl";

// styles
import "scss/containers/step";

const Step = () => (
  <div id="step-editor">
    <div className="top">
      <Query />
    </div>
    <div className="bottom">
      <Modifiers />
      <Repl />
    </div>
  </div>
);

export default Step;
