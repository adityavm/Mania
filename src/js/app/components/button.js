// base
import React from "react";

// styles
import "scss/components/button";

const Button = ({ type, color, onClick, label }) => (
  <button type={type} className={color} onClick={onClick}>{label}</button>
);

export default Button;
