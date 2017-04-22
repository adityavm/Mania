// main
import React from "react";
import { connect } from "react-redux";

// app
import JSONTree from "react-json-tree";

// styles
import "scss/containers/repl";

const theme =  {
  scheme: 'default',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#181818',
  base01: '#282828',
  base02: '#383838',
  base03: '#585858',
  base04: '#b8b8b8',
  base05: '#d8d8d8',
  base06: '#e8e8e8',
  base07: '#f8f8f8',
  base08: '#ab4642',
  base09: '#dc9656',
  base0A: '#f7ca88',
  base0B: '#a1b56c',
  base0C: '#86c1b9',
  base0D: '#7cafc2',
  base0E: '#ba8baf',
  base0F: '#a16946'
};

const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  let response = step.response ? JSON.parse(step.response) : {};

  return {
    response,
  };
};

const Repl = ({ response }) => (
  <div id="repl">
    <JSONTree data={response} theme={theme} />
  </div>
);

export default connect(
  mapStateToProps,
)(Repl);
