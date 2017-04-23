// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "../../../globals";
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import MethodButton from "./methodButton";
import QueryButton from "./executeButton";

// style
import "scss/containers/query";

// internal

const mapStateToProps = (state = {}) => ({
  url: getCurrents(state, false).step.url,
});

const mapDispatchToProps = dispatch => ({
  setUrl: event => dispatch(setCurrentStepValue("url", event.target.value)),
});

// render

const StepUrl = ({ url, setUrl }) => (
  <div id="query">
    <MethodButton />
    <input type="text" placeholder="Enter API URL" value={url} onChange={setUrl} />
    <QueryButton />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepUrl);
