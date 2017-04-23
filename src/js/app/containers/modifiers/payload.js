// base
import React from "react";
import { connect } from "react-redux";

// app
import setCurrentStepValue from "../../actions/setCurrentStepValue";


const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  return {
    payload: step.payload,
  };
};

const mapDispatchToProps = dispatch => ({
  setPayload: event => dispatch(setCurrentStepValue("payload", event.target.value)),
});

const Payload = ({ payload, setPayload }) => (
  <textarea id="payload" placeholder="{ ... }" value={payload} onChange={event => setPayload(event)}></textarea>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payload);
