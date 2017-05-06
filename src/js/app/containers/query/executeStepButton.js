// main
import React from "react";
import { connect } from "react-redux";
import _ from "js/utils";

// app
import { executeQueryStep } from "js/reducers/helpers";
import Button from "js/app/components/button";
import Icon from "js/app/components/button";

// style
import "scss/components/button";


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
