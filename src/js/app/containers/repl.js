// main
import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

// app
import { getCurrents } from "../../globals";
import { THEME } from "../constants";
import JSONTree from "react-json-tree";

// styles
import "scss/containers/repl";


const mapStateToProps = (state = {}) => {
  const { step } = getCurrents(state, false);

  let
    response,
    modified = false,
    error;

  if (step.evaluation.response) {
    try {
      response = step.evaluation.response;
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
    assertions: step.evaluation.assertions,
    modified,
  };
};

// get current step status
const currentStatus = (response, error, modified, fetching) => {
  let
    label = null,
    classes = null;

  if (modified) label = "Response is modified";
  if (error) label = error;
  if (fetching) label = "Fetching API ...";
  if (!fetching && !response) label = "Click Play to execute";

  classes = classnames("status", { modified, error, fetching, empty: !fetching && !response });

  return label && classes && <span className={classes}>{label}</span>;
};

// render
const Repl = ({ response, assertions, error, modified, fetching }) => (
  <div id="repl">
    {currentStatus(response, error, modified, fetching)}

    {response && assertions.map((assert, idx) => {
      return <span key={idx} className={classnames("status", "assertion", String(assert[1]))}>
        {assert[0]}
      </span>;
    })}

    {!fetching && response && <JSONTree data={response} theme={THEME} />}
  </div>
);

export default connect(
  mapStateToProps,
)(Repl);
