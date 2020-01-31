import React from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import "./activeCard.scss";

const getDays = startDate => {
  const startDay = new Date(startDate);
  const today = new Date();
  const numberOfDays = today.getTime() - startDay.getTime();

  return numberOfDays > 0 ? parseInt(numberOfDays / (1000 * 3600 * 24)) : 0;
};

const ActiveCard = props => {
  const {
    data: { title, type, startDate, amount, id }
  } = props;
  return (
    <Link to={`/dashboard/savings/${id}/single`}>
      <div className="active-card">
        <div className="active-card-header">
          <div className="active-card-header-title">
            <h5>{title}</h5>
          </div>
          <div className="active-card-header-type">
            <p>{type}</p>
          </div>
        </div>
        <div className="active-card-progress-bar">
          <p>Day {getDays(startDate)} / 30 days</p>
          <ProgressBar variant="info" now={10} />
        </div>
        <div className="active-card-balance">
          <p>
            Amount Raised:{" "}
            <span>N {new Intl.NumberFormat().format(amount)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ActiveCard;
