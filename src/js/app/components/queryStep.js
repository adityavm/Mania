// base
import React from "react";
import classnames from "classnames";

// app
import Icon from "./icon";

const urlCutOff = 19;

const constructClasses = step => {
  let classNames = ["step"];
  if (step.url.length > urlCutOff) classNames.push("show-hellip");
  return classNames.join(" ");
};

/* drag-drop functions */

const dragStart = event => {
  if (!event) return;
  event.target.classList.add("dragging");
  let idx = event.target.getAttribute("data-step-index");
  event.dataTransfer.setData("step", parseInt(idx));
};

const dragEnd = event => {
  if (!event) return;
  event.target.classList.remove("dragging");
}

const dragOver = event => {
  event.target.classList.add("droppable");
  event.preventDefault();
};

const dragLeave = event => {
  event.target.classList.remove("droppable");
};

const drop = (event, reorder) => {
  let
    from = parseInt(event.dataTransfer.getData("step")),
    to = parseInt(event.target.getAttribute("data-step-index"));

  event.target.classList.remove("droppable");
  event.preventDefault();

  if (!Number.isNaN(to)) reorder(from, to); // trigger
};

// render

const QueryStep = ({ stepIdx, step, isActive, activate, remove, reorder }) => {

  const failedAssertions = step.evaluation.assertions.filter(a => !a[0]);
  const successResponse = parseInt(step.response.status / 100) === 2;

  return (
    <div className={classnames({ active: isActive }, constructClasses(step))} draggable="true" onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={event => drop(event, reorder)} data-step-index={stepIdx}>
      <div className="step-info" onClick={activate}>
        <span className={classnames("label", "method", step.method)}>{step.method}</span>
        <span className={classnames("value", "url", { empty: !step.url })}>
          <span className="hellip" dangerouslySetInnerHTML={{__html: "&hellip;"}}></span>
          {step.url.substr(-urlCutOff) || "Enter API URL"}
        </span>
      </div>
      <div className="step-status">
        {step.fetching ? <span className="fetching" dangerouslySetInnerHTML={{__html: "&bull;"}}></span> : ""}
        {!step.fetching && !successResponse ? <span className="error" dangerouslySetInnerHTML={{__html: "&bull;"}}></span> : ""}
        {!step.fetching && successResponse && failedAssertions.length > 0 ? <span className="error"><Icon type="info" /></span> : ""}
      </div>
      <div className="remove-step" onClick={remove}><Icon type="cross" /></div>
    </div>
  )
};

export default QueryStep;
