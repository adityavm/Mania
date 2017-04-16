import React from "react";
import SavedQueries from "./containers/savedQueries";
import Query from "./containers/query";
import Payload from "./containers/payload";
import Repl from "./containers/repl";
import "scss/app";

const App = ({}) => (
  <div id="main">
    <SavedQueries></SavedQueries>
    <div id="editor">
      <Query></Query>
      <Payload></Payload>
      <Repl></Repl>
    </div>
  </div>
);

module.exports = App;
