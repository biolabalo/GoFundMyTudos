import React from "react";

import "./infoCard.scss";

export const InfoCard = props => {
  const { title, body } = props;
  return (
    <div className="infoCard">
      <div className="infoCard-header">
        <h4>{title}</h4>
      </div>
      <div className="infoCard-body">
        <p>{body}</p>
      </div>
    </div>
  );
};
