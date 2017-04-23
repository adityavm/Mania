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

  let
    response,
    modified = false,
    error;

  if (step.modifiedResponse !== "") {
    try {
      response = step.modifiedResponse;
      modified = true;
    } catch (e) {
      error = e.toString();
      response = null;
    }
  } else {
    try {
      response = step.response ? JSON.parse(step.response) : null;
    } catch (e) {
      error = e.toString();
      response = null;
    }
  }

  return {
    error,
    fetching: step.fetching,
    response,
    modified,
  };
};

const Repl = ({ response, error, modified, fetching }) => (
  <div id="repl">
    {modified && <span className="status modified">Response is modified</span>}
    {error && <span className="status error">{error}</span>}
    {fetching && <span className="status fetching">... Fetching Query</span>}
    {!fetching && !response && <span className="empty">Nothing yet</span>}
    {!fetching && response && <JSONTree data={response} theme={THEME} />}
  </div>
);

export default connect(
  mapStateToProps,
)(Repl);
