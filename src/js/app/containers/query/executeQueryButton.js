// main
import React from "react";
import { connect } from "react-redux";
import q from "q";
import _ from "js/utils";

// app
import { executeStep } from "js/globals";
import { executeQuery } from "js/reducers/helpers";
import Button from "js/app/components/button";

// style
import "scss/components/button";


const mapStateToProps = (state = {}) => ({
  queries: state.queries,
});

const mapDispatchToProps = dispatch => ({
  executeQuery: (queryIdx, query) => executeQuery(dispatch, queryIdx, query), // pass dispatcher to allow updating state after promises resolve
});

const QueryButton = ({ queryIdx, queries, executeQuery }) => (
  <Button type="default" color="blue" onClick={() => executeQuery(queryIdx, queries[queryIdx])} label="Query" />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueryButton);
