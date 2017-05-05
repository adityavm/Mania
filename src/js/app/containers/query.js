// base
import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

// actions
import { addStep, removeStep, activateStep, reorderStep } from "js/app/actions/stepActions";
import { activateQuery, setQueryValue } from "js/app/actions/queryActions"

// components
import QueryStep from "js/app/components/queryStep";
import Button from "js/app/components/button";
import Icon from "js/app/components/icon";


const mapStateToProps = (state = {}) => ({});

const mapDispatchToProps = dispatch => ({
  addStep: query => dispatch(addStep(query)),
  activateStep: (query, idx) => dispatch(activateStep(query, idx)),
  removeStep: (query, idx) => dispatch(removeStep(query, idx)),
  reorderStep: (query, from, to) => dispatch(reorderStep(query, from, to)),
  addQuery: () => dispatch(addQuery()),
  activateQuery: query => dispatch(activateQuery(query)),
  updateQueryName: (event, query) => dispatch(setQueryValue(query, "title", event.target.value)),
});

const Query = ({ query, queryIdx, isActive, addStep, activateStep, removeStep, reorderStep, addQuery, activateQuery, updateQueryName }) => {
  return isActive ? (
    <div className={classnames("query", "active")}>
      <div className="title">
        <input type="text" value={query.title} onChange={event => updateQueryName(event, queryIdx)} />
        <Icon type="edit" />
      </div>
      {query.steps.map((step, idx) => (
        <QueryStep step={step} key={idx} stepIdx={idx} isActive={idx === query.currentStep} activate={() => activateStep(queryIdx, idx)} remove={() => removeStep(queryIdx, idx)} reorder={(from, to) => reorderStep(queryIdx, from, to)} />)
      )}
      <div className="buttons">
        <Button type="text" icon="plus" onClick={() => addStep(queryIdx)} label="Step" />
      </div>
    </div>
  ) : (
    <div className={classnames("query")} onClick={() => activateQuery(queryIdx)}>
      <div className="title">{query.title}</div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Query);
