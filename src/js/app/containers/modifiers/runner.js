// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "js/globals";
import { setCurrentStepValue, evaluateStepRunner } from "js/app/actions/stepActions";
import Button from "js/app/components/button";
import Editor from "js/app/components/editor";
import Icon from "js/app/components/icon";


const mapStateToProps = (state = {}) => ({
  currentQuery: state.currentQuery,
  currentStep: state.queries[state.currentQuery].currentStep,
  currentModifier: getCurrents(state, false).step.modifier,
});

const mapDispatchToProps = dispatch => ({
  setModifier: value => dispatch(setCurrentStepValue("modifier", value)),
  evaluateRunner: (query, step) => dispatch(evaluateStepRunner(query, step)),
});

const Runner = ({ currentQuery, currentStep, currentModifier, setModifier, evaluateRunner, onClick }) => (
  <div id="runner">
    <div className="title" onClick={() => onClick("runner")}>
      REPL Runner
      <Icon type="menu" />
      <Icon type="menu-up" />
    </div>
    <Editor id="runner-editor" language="javascript" onChange={setModifier} value={currentModifier} />
    <Button type="default" color="green" icon="run" onClick={() => evaluateRunner(currentQuery, currentStep)} label="Update" />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Runner);
