import React from "react";
import { Link } from "react-router-dom";

import "./savingsCard.scss";

const SavingsCard = props => {
  const { icon, title, rider, target } = props;
  return (
    <div className="savings">
      <Link to={target}>
        <div className="savings-card">
          <div className="savings-card-icon">
            <img src={icon} alt="" />
          </div>
          <h3>{title}</h3>
          <p>{rider}</p>
        </div>
      </Link>
    </div>
  );
};

export default SavingsCard;
