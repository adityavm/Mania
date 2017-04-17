// base
import React from "react";
import classnames from "classnames";

const constructClasses = step => {
  let classNames = ["step"];
  if (step.url.length > 25) classNames.push("show-hellip");
  return classNames.join(" ");
};

const QueryStep = ({ step }) => {
  return (
    <div className={constructClasses(step)}>
      <span className={classnames("label", "method", step.method)}>{step.method}</span>
      <span className="value url">
        <span className="hellip" dangerouslySetInnerHTML={{__html: "&hellip;"}}></span>
        {step.url.substr(-25)}
      </span>
    </div>
  )
};

export default QueryStep;
