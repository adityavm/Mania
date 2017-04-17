// base
import React from "react";
import { connect } from "react-redux";

// actions
import addStep from "../actions/addStep";

// components
import QueryStep from "../components/queryStep";
import Button from "../components/button";

// styles
import "scss/containers/currentQuery";

const mapStateToProps = (state = {}) => {
  const currentQuery = state.queries[state.currentQuery];

  return {
    steps: currentQuery.steps,
    currentStep: currentQuery.currentStep,
  }
};

const mapDispatchToProps = dispatch => ({
  addStep: () => dispatch(addStep()),
});

const currentQuery = ({ steps, currentStep, addStep }) => (
  <div id="current-query">
    {steps.map((step, idx) => <QueryStep step={step} key={idx} />)}
    <div className="buttons">
      <Button type="text" onClick={addStep} label="Add New Step" />
    </div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(currentQuery);
