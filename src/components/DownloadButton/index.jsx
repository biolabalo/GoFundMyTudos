import React from "react";

import "./downloadButton.scss";

const DownloadButton = props => {
  const { image, header, rider } = props;
  return (
    <button className="downloadButton">
      <div className="downloadButton-image">
        <img src={image} alt="" />
      </div>
      <div className="downloadButton-body">
        <p>{rider}</p>
        <h3>{header}</h3>
      </div>
    </button>
  );
};

export default DownloadButton;
