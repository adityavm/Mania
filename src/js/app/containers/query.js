// base
import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

// actions
import addStep from "../actions/addStep";
import removeStep from "../actions/removeStep";
import activateStep from "../actions/activateStep";
import reorderStep from "../actions/reorderStep";

// components
import QueryStep from "../components/queryStep";
import Button from "../components/button";


const mapStateToProps = (state = {}) => ({});

const mapDispatchToProps = dispatch => ({
  addStep: query => dispatch(addStep(query)),
  activateStep: (query, idx) => dispatch(activateStep(query, idx)),
  removeStep: (query, idx) => dispatch(removeStep(query, idx)),
  reorderStep: (query, from, to) => dispatch(reorderStep(query, from, to)),
});

const Query = ({ query, queryIdx, isActive, addStep, activateStep, removeStep, reorderStep }) => (
  <div className={classnames("query", { active: isActive })}>
    {/* <div className="title">{query.title}</div> */}
    {query.steps.map((step, idx) => (
      <QueryStep step={step} key={idx} stepIdx={idx} isActive={idx === query.currentStep} activate={() => activateStep(queryIdx, idx)} remove={() => removeStep(queryIdx, idx)} reorder={(from, to) => reorderStep(queryIdx, from, to)} />)
    )}
    <div className="buttons">
      <Button type="text" icon="plus" onClick={() => addStep(queryIdx)} label="Step" />
    </div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Query);
