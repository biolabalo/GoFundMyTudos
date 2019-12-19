import React from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import toggleOn from "../../../images/toggle_off.png";

import "./tuduFeedCard.scss";

const TuduFeedCard = props => {
  const { tudos } = props;

  return (
    <div className="tudu-feed">
      {tudos.map((tudo, index) => {
        const numerator = tudo.amount_generated * 100;
        const amountInNaira = tudo.amount / 100;
        const percent = numerator > 0 ? numerator / amountInNaira : 0;

        return (
          <div key={index} className="tudu-feed-card">
            <Link to={`/dashboard/tudo-single/${tudo.id}`}>
              <h6>{tudo.goal_name}</h6>
              <div className="tudu-feed-card-progress">
                <p>{percent}% achieved</p>
                <p>
                  N {tudo.amount_generated} / <span>N {amountInNaira}</span>
                </p>
              </div>
              <div className="tudu-feed-card-progress-bar">
                <ProgressBar variant="info" now={percent} />
              </div>
            </Link>
            <div className="tudu-feed-card-user">
              <p>Make Public</p>
              <div className="tudu-feed-card-user-image">
                <img src={toggleOn} alt="toggle" />
              </div>
              <Link
                to={`/dashboard/tudo/share/${tudo.share_code}`}
                className="tudu-feed-card-user-link"
              >
                Share This Goal
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TuduFeedCard;
