// base
import React from "react";
import classnames from "classnames";

// app
import Icon from "./icon";

// styles
import "scss/components/button";

const Button = ({ type, color, icon, onClick, label }) => (
  <button type={type} className={color} onClick={onClick}>
    {icon && <Icon type={icon} />}
    {label}
  </button>
);

export default Button;
