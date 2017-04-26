// main
import React from "react";

// containers
import CurrentQuery from "./containers/currentQuery";
import SavedQueries from "./containers/savedQueries";
import StepEditor from "./containers/stepEditor";

// styles
import "scss/style";
import "scss/app";
import "scss/containers/sidebar";

const App = () => (
  <div id="main">
    <div id="sidebar">
      <div className="title"></div>
      <CurrentQuery />
      <SavedQueries />
    </div>
    <div id="steps">
      <StepEditor />
    </div>
  </div>
);

export default App;
