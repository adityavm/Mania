// main
import React from "react";

// containers
import Queries from "./containers/queries";
import StepEditor from "./containers/stepEditor";

// styles
import "scss/style";
import "scss/app";
import "scss/containers/sidebar";

const App = () => (
  <div id="main">
    <div id="sidebar">
      <div className="title"></div>
      <Queries />
    </div>
    <div id="steps">
      <StepEditor />
    </div>
  </div>
);

export default App;
