import React from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import toggleOn from "../../../images/toggle_on.png";
import toggleOff from "../../../images/toggle_off.png";

import "./tuduFeedCard.scss";

const TuduFeedCard = props => {
  const { tudos, toggleVisibility } = props;

  return (
    <div className="tudu-feed">
      {tudos.map((tudo, index) => {
        const amountInNaira = tudo.amount / 100;

        if (tudo.status === "TudoStatus.running") {
          return (
            <div key={index} className="tudu-feed-card">
              <Link to={`/dashboard/tudo-single/${tudo.id}`}>
                <h6>{tudo.goal_name}</h6>
                <div className="tudu-feed-card-progress">
                  <p>{tudo.contributions_percentage}% achieved</p>
                  <p>
                    N{" "}
                    {new Intl.NumberFormat().format(
                      tudo.amount_generated / 100
                    )}{" "}
                    /{" "}
                    <span>{new Intl.NumberFormat().format(amountInNaira)}</span>
                  </p>
                </div>
                <div className="tudu-feed-card-progress-bar">
                  <ProgressBar
                    variant="info"
                    now={tudo.contributions_percentage}
                  />
                </div>
              </Link>
              <div className="tudu-feed-card-user">
                <p>{tudo.is_visible ? "Make Private" : "Make Public"}</p>
                <div className="tudu-feed-card-user-image">
                  <img
                    src={tudo.is_visible ? toggleOn : toggleOff}
                    alt={`toggle-${tudo.id}`}
                    id={tudo.id}
                    onClick={toggleVisibility(tudo.is_visible)}
                  />
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
        }

        if (tudo.status === "TudoStatus.completed") {
          return (
            <div key={index} className="tudu-feed-card">
              <h6>{tudo.goal_name}</h6>
              <div className="tudu-feed-card-progress">
                <p>{tudo.contributions_percentage}% achieved</p>
                <p>
                  N{" "}
                  {new Intl.NumberFormat().format(tudo.amount_generated / 100)}{" "}
                  / <span>{new Intl.NumberFormat().format(amountInNaira)}</span>
                </p>
              </div>
              <div className="tudu-feed-card-progress-bar">
                <ProgressBar
                  variant="info"
                  now={tudo.contributions_percentage}
                />
              </div>
            </div>
          );
        }

      }
      
      )}
    </div>
  );
};

export default TuduFeedCard;
