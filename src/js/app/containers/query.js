// base
import React from "react";
import { connect } from "react-redux";

// app
import setStepUrl from "../actions/setStepUrl";

// style
import "scss/containers/query";

const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  return {
    url: step.url,
  };
};

const mapDispatchToProps = dispatch => ({
  setUrl: event => dispatch(setStepUrl(event.target.value)),
});

const StepUrl = ({ url, setUrl }) => (
  <div id="query">
    <input type="text" placeholder="Enter API URL" value={url} onChange={setUrl} />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepUrl);
