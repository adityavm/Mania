// main
import React from "react";

// app
import QueryButton from "./queryButton";
import Query from "./query";
import Payload from "./payload";
import Repl from "./repl";

// styles
import "scss/containers/step";

const Step = () => (
  <div id="step-editor">
    <div className="top">
      <Query></Query>
      <QueryButton />
    </div>
    <div className="bottom">
      <Payload></Payload>
      <Repl></Repl>
    </div>
  </div>
);

export default Step;
