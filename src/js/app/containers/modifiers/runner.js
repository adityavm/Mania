// base
import React from "react";
import { connect } from "react-redux";

// app
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import evaluateStepRunner from "../../actions/evaluateStepRunner";
import Button from "../../components/button";


const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  return {
    currentModifier: step.modifier,
  };
};

const mapDispatchToProps = dispatch => ({
  setModifier: event => dispatch(setCurrentStepValue("modifier", event.target.value)),
  evaluateRunner: () => dispatch(evaluateStepRunner()),
});

const Runner = ({ currentModifier, setModifier, evaluateRunner }) => (
  <div id="runner">
    <textarea placeholder="(function(){ ... })()" value={currentModifier} onChange={event => setModifier(event)}></textarea>
    <Button type="default" color="green" onClick={evaluateRunner} label="Update" />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Runner);
