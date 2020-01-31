import React from "react";

import lowerSectionHero from "../../images/reach-lower-section.png";

import "./learnMore.scss";

const Reach = () => {
  return (
    <div className="learnMore">
      <div className="learnMore-sections">
        <div className="learnMore-sections-lower-section">
          <div className="learnMore-sections-lower-section-image">
            <img src={lowerSectionHero} alt="" />
          </div>
          <div className="learnMore-sections-lower-section-text">
            <p>
              With the help of your loved ones, your goals can be achieved
              faster with just a click! On Tudo, your set goals can be achieved
              before the maturity date, simply by sharing those goals with
              people. You don’t have to wait for 3 months to get your new dream
              phone, with the help of your loved ones, you can get your new
              dream phone in just 1 month! Cool right?
            </p>
            <h2>It’s easy, fast and fun! </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reach;
