// main
import React from "react";

// components
import Query from "./query";
import Payload from "./payload";
import Repl from "./repl";

// styles
import "scss/containers/step";

const Step = () => (
  <div id="step-editor">
    <Query></Query>
    <Payload></Payload>
    <Repl></Repl>
  </div>
);

export default Step;
