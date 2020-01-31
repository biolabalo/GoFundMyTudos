import React from "react";
import { Link } from "react-router-dom";

import "./savingsCard.scss";

const SavingsCard = props => {
  const { title, rider, target, type } = props;
  return (
    <div className="saving">
      <Link to={target}>
        <div className={`saving-card-${type}`}>
          <div className={`saving-card-${type}-left`}>
            <h3>{title}</h3>
            <p>{rider}</p>
          </div>
          <div className={`saving-card-${type}-right`}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SavingsCard;
