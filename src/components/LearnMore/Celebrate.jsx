import React from "react";

import lowerSectionHero from "../../images/celebrate-lower-section.png";

import "./learnMore.scss";

const Celebrate = () => {
  return (
    <div className="learnMore">
      <div className="learnMore-sections">
        <div className="learnMore-sections-lower-section">
          <div className="learnMore-sections-lower-section-image">
            <img src={lowerSectionHero} alt="" />
          </div>
          <div className="learnMore-sections-lower-section-text">
            <p>
              You know that feeling that comes with an achievement or
              accomplishment of goals? Priceless! Celebrate your little & big
              wins and achievements. With Tudo, you can appreciate everyone who
              helped you reach your goals faster by sending them a personalized
              thank you message!
            </p>
            <h2>It’s easy, fast and fun! </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Celebrate;
