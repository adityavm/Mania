// main
import React from "react";

// app
import Query from "./query/input";
import Payload from "./payload";
import Repl from "./repl";

// styles
import "scss/containers/step";

const Step = () => (
  <div id="step-editor">
    <div className="top">
      <Query></Query>
    </div>
    <div className="bottom">
      <Payload></Payload>
      <Repl></Repl>
    </div>
  </div>
);

export default Step;
