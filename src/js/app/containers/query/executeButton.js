// main
import React from "react";
import { connect } from "react-redux";
import _ from "../../../utils";

// app
import executeQuery from "../../actions/executeQuery";
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import Button from "../../components/button";

// style
import "scss/components/button";

// redux

const mapStateToProps = (state = {}) => ({});

const mapDispatchToProps = dispatch => ({
  executeQuery: () => {
    dispatch(setCurrentStepValue("fetching", true));
    dispatch(executeQuery(dispatch)); // pass dispatcher to allow updating state after promises resolve
  },
});

const QueryButton = ({ executeQuery }) => (
  <Button type="default" color="green" onClick={executeQuery} label="Play" />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryButton);
