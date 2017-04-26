// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "../../globals";
import Query from "./query";

// style
import "scss/containers/queries";

const mapStateToProps = (state = {}) => ({
  queries: state.queries,
  currentQuery: state.currentQuery,
});

const Queries = ({ queries, currentQuery }) => (
  <div id="queries">
    {queries.map((query, idx) => <Query key={idx} query={query} queryIdx={idx} isActive={currentQuery === idx} />)}
  </div>
);

export default connect(
  mapStateToProps,
)(Queries);
