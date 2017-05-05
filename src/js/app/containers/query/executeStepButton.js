// main
import React from "react";
import { connect } from "react-redux";
import _ from "js/utils";

// app
import { setQueryStepValue, evaluateStepRunner } from "js/app/actions/stepActions";
import { executeStep } from "js/globals";
import Button from "js/app/components/button";
import Icon from "js/app/components/button";

// style
import "scss/components/button";

// execute a whole query
const executeQueryStep = (dispatch, queryIdx, queryObj, stepIdx, stepObj) => {
  const startTime = new Date();

  const constructResponseObj = (data, startTime) => {
    const timeDiff = new Date() - startTime;
    return {
      text: JSON.stringify(data.response),
      time: timeDiff,
      status: data.status,
    };
  };

  // needs response so that it can make next call
  // before state is officially updated
  const execute = (query, queryObj, step, stepObj, dispatch, response) => {

    const dispatchAssign = data => {
      let obj = constructResponseObj(data, startTime);
      dispatch(setQueryStepValue(query, step, "response", obj));
    };

    dispatch(setQueryStepValue(query, step, "fetching", true));

    executeStep(queryObj, stepObj, response)
      .then(dispatchAssign, dispatchAssign)
      .finally(data => {
        dispatch(setQueryStepValue(query, step, "fetching", false));
        dispatch(evaluateStepRunner(query, step));
      });
  };

  let prevResponse = stepIdx === 0 ? "{}" : ((queryObj.steps[stepIdx - 1] || {}).response || {}).text || "{}";
  execute(queryIdx, queryObj, stepIdx, stepObj, dispatch, JSON.parse(prevResponse));
};

// redux

const mapStateToProps = (state = {}) => ({
  queries: state.queries,
});

const mapDispatchToProps = dispatch => ({
  executeStep: (queryIdx, queryObj, stepIdx, stepObj) => executeQueryStep(dispatch, queryIdx, queryObj, stepIdx, stepObj), // pass dispatcher to allow updating state after promises resolve
});

const StepButton = ({ queryIdx, stepIdx, queries, executeStep }) => (
  <Button type="default" color="cyan" icon="play" onClick={() => executeStep(queryIdx, queries[queryIdx], stepIdx, queries[queryIdx].steps[stepIdx])} label="Step" />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepButton);
