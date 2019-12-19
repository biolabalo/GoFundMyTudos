import React from "react";
import { Link } from "react-router-dom";

import "./targetSavingsCard.scss";

const TargetSavingsCard = props => {
  const { interest, title, amount, link, goal } = props;
  return (
    <div className="targetSavings">
      <Link to={`/dashboard/savings/active/${link}`}>
        <div className="targetSavings-card">
          <div className="targetSavings-card-left">
            <div className="targetSavings-card-left-top">
              <div>
                <p>Target plan</p>
                <h3>{title}</h3>
              </div>
              <p>One-time-save</p>
            </div>
            <div className="targetSavings-card-left-bottom">
              <p>Amount</p>
              <h3>
                {amount}/<span>{goal}</span>
              </h3>
            </div>
          </div>
          <div className="targetSavings-card-right">
            <h3>{interest}</h3>
            <p>Interest p.a</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TargetSavingsCard;
