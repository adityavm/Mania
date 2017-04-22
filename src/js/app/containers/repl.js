// main
import React from "react";
import { connect } from "react-redux";

// app
import { THEME } from "../constants";
import JSONTree from "react-json-tree";

// styles
import "scss/containers/repl";


const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  let response = step.response ? JSON.parse(step.response) : null;

  return {
    fetching: step.fetching,
    response,
  };
};

const Repl = ({ response, fetching }) => (
  <div id="repl">
    {fetching && <span className="fetching">... Fetching Query</span>}
    {!fetching && !response && <span className="empty">Nothing yet</span>}
    {!fetching && response && <JSONTree data={response} theme={THEME} />}
  </div>
);

export default connect(
  mapStateToProps,
)(Repl);
