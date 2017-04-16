// main
import React from "react";

// containers
import CurrentQuery from "./containers/currentQuery";
import SavedQueries from "./containers/savedQueries";
import Step from "./containers/step";

// styles
import "scss/style";
import "scss/app";
import "scss/containers/sidebar";

const App = () => (
  <div id="main">
    <div id="sidebar">
      <CurrentQuery />
      <SavedQueries />
    </div>
    <div id="steps">
      <Step />
    </div>
  </div>
);

export default App;
