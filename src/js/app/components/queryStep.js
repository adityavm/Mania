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

const QueryStep = ({ step, isActive, activate, remove }) => {
  return (
    <div className={classnames({ active: isActive }, constructClasses(step))}>
      <div className="step-info" onClick={activate}>
        <span className={classnames("label", "method", step.method)}>{step.method}</span>
        <span className={classnames("value", "url", { empty: !step.url })}>
          <span className="hellip" dangerouslySetInnerHTML={{__html: "&hellip;"}}></span>
          {step.url.substr(-urlCutOff) || "Enter API URL"}
        </span>
      </div>
      <div className="step-status">
        {step.fetching ? <span className="fetching" dangerouslySetInnerHTML={{__html: "&bull;"}}></span> : ""}
      </div>
      <div className="remove-step" onClick={remove}><Icon type="cross" /></div>
    </div>
  )
};

export default QueryStep;
