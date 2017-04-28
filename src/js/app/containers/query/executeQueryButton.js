// main
import React from "react";
import { connect } from "react-redux";
import q from "q";
import _ from "../../../utils";

// app
import setQueryStepValue from "../../actions/setQueryStepValue";
import evaluateStepRunner from "../../actions/evaluateStepRunner";
import { executeStep } from "../../../globals";
import Button from "../../components/button";

// style
import "scss/components/button";

// execute a whole query
const executeQuery = (dispatch, queryIdx, query) => {

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
  const execute = (query, queryObj, step, stepObj, dispatch, response = {}) => {
    const startTime = new Date();

    const dispatchAssign = data => {
      let obj = constructResponseObj(data, startTime);
      dispatch(setQueryStepValue(query, step, "response", obj));
    };

    dispatch(setQueryStepValue(query, step, "fetching", true));

    let promise = executeStep(queryObj, stepObj, response);
    promise
      .then(dispatchAssign, dispatchAssign)
      .finally(data => {
        dispatch(setQueryStepValue(query, step, "fetching", false));
        dispatch(evaluateStepRunner(query, step));
      });

    return promise;
  };

  // construct promise chain and run
  let request = q({});
  query.steps.forEach((step, stepIdx) => {
    request = request.then(promise => execute(queryIdx, query, stepIdx, step, dispatch, promise.response));
  });
};

// redux

const mapStateToProps = (state = {}) => ({
  queries: state.queries,
});

const mapDispatchToProps = dispatch => ({
  executeQuery: (queryIdx, query) => executeQuery(dispatch, queryIdx, query), // pass dispatcher to allow updating state after promises resolve
});

const QueryButton = ({ queryIdx, queries, executeQuery }) => (
  <Button type="default" color="blue" onClick={() => executeQuery(queryIdx, queries[queryIdx])} label="Query" />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryButton);
