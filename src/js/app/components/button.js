// base
import React from "react";

// styles
import "scss/components/button";

const Button = ({ type, onClick, label }) => (
  <button type={type} onClick={onClick}>{label}</button>
);

export default Button;
