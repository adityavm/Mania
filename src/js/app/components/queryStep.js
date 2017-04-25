// base
import React from "react";
import classnames from "classnames";

const constructClasses = step => {
  let classNames = ["step"];
  if (step.url.length > 25) classNames.push("show-hellip");
  return classNames.join(" ");
};

const QueryStep = ({ step, isActive, onClick }) => {
  return (
    <div className={classnames({ active: isActive }, constructClasses(step))} onClick={onClick}>
      <span className={classnames("label", "method", step.method)}>{step.method}</span>
      <span className={classnames("value", "url", { empty: !step.url })}>
        <span className="hellip" dangerouslySetInnerHTML={{__html: "&hellip;"}}></span>
        {step.url.substr(-25) || "Enter API URL"}
      </span>
    </div>
  )
};

export default QueryStep;
