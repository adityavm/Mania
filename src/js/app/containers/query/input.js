// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "../../../globals";
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import MethodButton from "./methodButton";
import StepButton from "./executeStepButton";
import QueryButton from "./executeQueryButton";

// style
import "scss/containers/queryInput";

// internal

const mapStateToProps = (state = {}) => ({
  url: getCurrents(state, false).step.url,
  query: getCurrents(state).query,
  step: getCurrents(state).step,
});

const mapDispatchToProps = dispatch => ({
  setUrl: event => dispatch(setCurrentStepValue("url", event.target.value)),
});

// render

const StepUrl = ({ url, query, step, setUrl }) => (
  <div id="query">
    <MethodButton />
    <input type="text" placeholder="Enter API URL" value={url} onChange={setUrl} />
    <StepButton queryIdx={query} stepIdx={step} />
    <QueryButton queryIdx={query} />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepUrl);
