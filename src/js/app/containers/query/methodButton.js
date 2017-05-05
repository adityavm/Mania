// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "js/globals";
import { toggleStepMethod } from "js/app/actions/stepActions";
import Button from "js/app/components/button";

// styles
import "scss/components/button";

// internal

const mapStateToProps = (state = {}) => ({
  method: getCurrents(state, false).step.method,
});

const mapDispatchToProps = dispatch => ({
  toggleStepMethod: () => dispatch(toggleStepMethod()),
});

// render

const MethodButton = ({ method, toggleStepMethod }) => {
  const color = method === "POST" ? "orange" : "green";

  return (
    <Button type="text" color={color} onClick={toggleStepMethod} label={method} />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MethodButton);
