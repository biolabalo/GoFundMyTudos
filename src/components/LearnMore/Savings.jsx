import React from "react";

import lowerSectionHero from "../../images/savings-lower-section-hero.svg";

import "./learnMore.scss";

const Savings = () => {
  return (
    <div className="learnMore">
      <div className="learnMore-sections">
        <div className="learnMore-sections-lower-section">
          <div className="learnMore-sections-lower-section-image">
            <img src={lowerSectionHero} alt="" />
          </div>
          <div className="learnMore-sections-lower-section-text">
            <p>
              We understand that some of your goals are monetary goals which you
              certainly cannot achieve without money. On Tudo, after creating
              the list of goals you want to achieve, you can create a savings
              goal and start saving towards each of the goals on your To-do
              list. It’s simple! Create a list, set a savings goal i.e the goal
              amount you’re working towards e.g New Phone - 50,000, and start
              saving towards that goal.
            </p>
            <h2>It’s easy, fast and fun! </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
