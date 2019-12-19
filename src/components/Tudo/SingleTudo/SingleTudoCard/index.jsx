import React from "react";
import { ProgressBar } from "react-bootstrap";

import "./singleTudoCard.scss";

const SingleTudoCard = props => {
  const { achieved, duration, interest, privacy, tudo, days } = props;
  return (
    <div className="singleTudoCard">
      <div className="singleTudoCard-header">
        {achieved && <h4>Goal Progress</h4>}
        {duration && <h4>Goal Duration</h4>}
        {interest && <h4>Interest Rate</h4>}
        {privacy && <h4>Privacy Setting</h4>}
      </div>
      <div className="singleTudoCard-body">
        {achieved && (
          <div className="">
            <p>
              {tudo.generated_amount * 100 > 0
                ? (tudo.generated_amount * 100) / tudo.amount
                : 0}
              % achieved
            </p>
            <div className="singleTudoCard-body-progress-bar">
              <ProgressBar
                variant="info"
                now={
                  tudo.generated_amount * 100 > 0
                    ? (tudo.generated_amount * 100) / tudo.amount
                    : 0
                }
              />
            </div>
          </div>
        )}
        {duration && (
          <div className="">
            <p>
              {days} of {tudo.tudo_duration}
            </p>
          </div>
        )}
        {interest && (
          <div className="">
            <p>16%</p>
          </div>
        )}
        {privacy && (
          <div className="singleTudoCard-body-public">
            <p>Make Goal Public</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTudoCard;
