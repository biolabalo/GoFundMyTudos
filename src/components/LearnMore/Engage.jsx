import React from "react";

import lowerSectionHero from "../../images/engage-background-lower-hero.png";

import "./learnMore.scss";

const Engage = () => {
  return (
    <div className="learnMore">
      <div className="learnMore-sections">
        <div className="learnMore-sections-lower-section">
          <div className="learnMore-sections-lower-section-image">
            <img src={lowerSectionHero} alt="" />
          </div>
          <div className="learnMore-sections-lower-section-text">
            <p>
              Invite your loved ones to help increase your savings and
              collaborate to make an impact in your life. You can achieve your
              goals faster with the help of your loved ones. Here’s how; Create
              your to-do list, set a savings goal, then send a Tudo invitation
              to your loved ones to help you increase your savings, so you can
              achieve your goals faster. Achieve those goals together on Tudo!
            </p>
            <h2>It’s easy, fast and fun! </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engage;
