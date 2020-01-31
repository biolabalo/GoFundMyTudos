import React from "react";
import { Link } from "react-router-dom";

import "./purpleButton.scss";

const PurpleButton = props => {
  const { text, path } = props;
  return (
    <Link to={path} className="purpleButton">
      {`${text} `} <i className="fas fa-arrow-right"></i>
    </Link>
  );
};

export default PurpleButton;
