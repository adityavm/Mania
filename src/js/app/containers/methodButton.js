// base
import React from "react";
import { connect } from "react-redux";

// app
import toggleQueryMethod from "../actions/toggleQueryMethod";
import Button from "../components/button";

// styles
import "scss/components/button";

// internal

const mapStateToProps = (state = {}) => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  return {
    method: step.method,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleQueryMethod: () => dispatch(toggleQueryMethod()),
});

// render

const MethodButton = ({ method, toggleQueryMethod }) => {
  const color = method === "POST" ? "orange" : "green";

  return (
    <Button type="text" color={color} onClick={toggleQueryMethod} label={method} />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MethodButton);
