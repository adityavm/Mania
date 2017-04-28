// base
import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

// actions
import addStep from "../actions/addStep";
import removeStep from "../actions/removeStep";
import activateStep from "../actions/activateStep";

// components
import QueryStep from "../components/queryStep";
import Button from "../components/button";


const mapStateToProps = (state = {}) => ({});

const mapDispatchToProps = dispatch => ({
  addStep: query => dispatch(addStep(query)),
  activateStep: (query, idx) => dispatch(activateStep(query, idx)),
  removeStep: (query, idx) => dispatch(removeStep(query, idx))
});

const Query = ({ query, queryIdx, isActive, addStep, activateStep, removeStep }) => (
  <div className={classnames("query", { active: isActive })}>
    {/* <div className="title">{query.title}</div> */}
    {query.steps.map((step, idx) => <QueryStep step={step} key={idx} isActive={idx === query.currentStep} activate={() => activateStep(queryIdx, idx)} remove={() => removeStep(queryIdx, idx)} />)}
    <div className="buttons">
      <Button type="text" icon="plus" onClick={() => addStep(queryIdx)} label="Step" />
    </div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Query);
