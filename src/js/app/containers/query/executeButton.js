// main
import React from "react";
import { connect } from "react-redux";
import _ from "../../../utils";

// app
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import Button from "../../components/button";

// style
import "scss/components/button";

// internal

const executeQuery = (url, payload) => {
  return _.xhr(url, payload);
};

// redux

const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  return {
    url: step.url,
    payload: step.payload,
  };
};

const mapDispatchToProps = dispatch => ({
  executeQuery: (url, payload) => {
    dispatch(setCurrentStepValue("fetching", true));
    executeQuery(url, payload)
    .then(
      d => {
        dispatch(setCurrentStepValue("fetching", false));
        dispatch(setCurrentStepValue("response", JSON.stringify(d)));
      },
    );
  },
});

const QueryButton = ({ url, payload, executeQuery }) => (
  <Button type="default" color="green" onClick={() => executeQuery(url, payload)} label="Play" />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryButton);
