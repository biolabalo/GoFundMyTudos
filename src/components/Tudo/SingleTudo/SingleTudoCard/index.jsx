import React from "react";
import { ProgressBar } from "react-bootstrap";

import toggleOn from "../../../../images/toggle_on.png";
import toggleOff from "../../../../images/toggle_off.png";

import "./singleTudoCard.scss";

const SingleTudoCard = props => {
  const {
    achieved,
    duration,
    interest,
    privacy,
    tudo,
    days,
    visibility
  } = props;
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
            <p>{tudo.contributions_percentage}% achieved</p>
            <div className="singleTudoCard-body-progress-bar">
              <ProgressBar variant="info" now={tudo.contributions_percentage} />
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
            <p>11%</p>
          </div>
        )}
        {privacy && (
          <div className="singleTudoCard-body-privacy">
            <p>{visibility ? "Make Goal Private" : "Make Goal Public"}</p>
            <div className="singleTudoCard-body-privacy-image">
              <img src={visibility ? toggleOn : toggleOff} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTudoCard;
