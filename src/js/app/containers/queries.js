// base
import React from "react";
import { connect } from "react-redux";

// app
import Query from "./query";
import Button from "js/app/components/button";

// style
import "scss/containers/queries";

const mapStateToProps = (state = {}) => ({
  queries: state.queries,
  currentQuery: state.currentQuery,
});

const mapDispatchToProps = dispatch => ({
  addQuery: () => dispatch(addQuery()),
});

const Queries = ({ queries, currentQuery, addQuery }) => (
  <div id="queries">
    {queries.map((query, idx) => <Query key={idx} query={query} queryIdx={idx} isActive={currentQuery === idx} />)}
    <div className="buttons">
      <Button type="text" icon="plus" onClick={() => addQuery()} label="Query" />
    </div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Queries);
