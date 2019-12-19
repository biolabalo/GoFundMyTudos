import React from "react";
import { Link } from "react-router-dom";

import "./purpleButton.scss";

const PurpleButton = props => {
  const { text } = props;
  return (
    <Link to="/signup" className="purpleButton">
      {`${text} `} <i className="fas fa-arrow-right"></i>
    </Link>
  );
};

export default PurpleButton;
