import React from "react";
import classnames from "classnames";

export default ({ type }) => (
  <i className={classnames("icon", `icon-${type}`)} />
);
