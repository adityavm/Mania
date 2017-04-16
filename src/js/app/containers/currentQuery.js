// base
import React from "react";
import { connect } from "react-redux";

// actions
import addStep from "../actions/addStep";

// components
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

const currentQuery = ({ steps, currentStep, addStep }) => {
  console.log(steps);

  return (
    <div id="current-query">
      <div className="steps">
        <span className="label">Steps</span>
        <span className="value">{steps.length}</span>
      </div>
      <div className="buttons">
        <Button type="text" onClick={addStep} label="Add New Step" />
      </div>
    </div>
  );
};

const CurrentQuery = connect(
  mapStateToProps,
  mapDispatchToProps,
)(currentQuery);

export default CurrentQuery;
