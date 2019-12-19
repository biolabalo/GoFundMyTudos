import React from "react";

import "./featureCard.scss";

const FeatureCard = props => {
  const { theme, position, header, body } = props;
  return (
    <a className="featureCard" href="/">
      <div className={theme ? `featureCard-${theme}` : "featureCard-normal"}>
        <div className="row">
          <div className="col-md-1">
            <h4>{position}</h4>
          </div>
          <div className="col-md-11">
            <h3>{header}</h3>
          </div>
          <div className="col-md-1">
            <div
              className={
                theme ? `featureCard-${theme}-bar` : "featureCard-normal-bar"
              }
            ></div>
          </div>
          <div className="col-md-11">
            <p>{body}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default FeatureCard;
