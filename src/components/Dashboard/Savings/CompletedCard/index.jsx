import React from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import "./completedCard.scss";

const getDays = startDate => {
  const startDay = new Date(startDate);
  const today = new Date();
  const numberOfDays = today.getTime() - startDay.getTime();

  return numberOfDays > 0 ? parseInt(numberOfDays / (1000 * 3600 * 24)) : 0;
};

const getMatureDay = (startDate, matureDate) => {
  const startDay = new Date(startDate);
  const matureDay = new Date(matureDate);
  const numberOfDays = matureDay.getTime() - startDay.getTime();

  return numberOfDays > 0 ? parseInt(numberOfDays / (1000 * 3600 * 24)) : 0;
};

const CompletedCard = props => {
  const {
    data: {
      purpose,
      plan_type: { type },
      start_date,
      saved_amount,
      id,
      maturity_date
    }
  } = props;
  return (
    <Link to={`/dashboard/savings/${id}/single`}>
      <div className="active-card">
        <div className="active-card-header">
          <div className="active-card-header-title">
            <h5>{purpose}</h5>
          </div>
          <div className="active-card-header-type">
            <p>{type}</p>
          </div>
        </div>
        <div className="active-card-progress-bar">
          <p>
            Day {getDays(start_date)} /{" "}
            {getMatureDay(start_date, maturity_date)} days
          </p>
          <ProgressBar
            variant="info"
            now={
              getMatureDay(start_date, maturity_date) *
              (getDays(start_date) / 100)
                ? getMatureDay(start_date, maturity_date) *
                  (getDays(start_date) / 100)
                : getDays(start_date)
            }
          />
        </div>
        <div className="active-card-balance">
          <p>
            Amount Raised:{" "}
            <span>N {new Intl.NumberFormat().format(saved_amount / 100)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CompletedCard;
