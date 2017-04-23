// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "../../../globals";
import toggleStepMethod from "../../actions/toggleStepMethod";
import Button from "../../components/button";

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
