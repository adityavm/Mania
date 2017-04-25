// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "../../../globals";
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import evaluateStepRunner from "../../actions/evaluateStepRunner";
import Button from "../../components/button";
import Editor from "../../components/editor";


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
    <div className="title" onClick={() => onClick("runner")}>REPL Runner</div>
    <Editor id="runner-editor" language="javascript" onChange={setModifier} value={currentModifier} />
    <Button type="default" color="green" onClick={() => evaluateRunner(currentQuery, currentStep)} label="Update" />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Runner);
