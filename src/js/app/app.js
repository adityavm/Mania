// main
import React from "react";

// app
import Icon from "./components/icon";
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
      <div className="saved-status"><Icon type="info" /> SAVING...</div>
    </div>
    <div id="steps">
      <StepEditor />
    </div>
  </div>
);

export default App;
