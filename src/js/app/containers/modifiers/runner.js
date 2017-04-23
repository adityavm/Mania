// base
import React from "react";
import { connect } from "react-redux";

// style

const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  return {
    modifier: step.modifier,
  };
};

const mapDispatchToProps = dispatch => ({
  setModifier: event => dispatch(setCurrentStepValue("modifier", event.target.value)),
});

const Runner = ({ currentModifier, setModifier }) => (
  <textarea id="runner" placeholder="(function(){ ... })()" value={currentModifier} onChange={event => setModifier(event)}></textarea>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Runner);
