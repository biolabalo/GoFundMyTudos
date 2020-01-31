import React from "react";

import lowerSectionHero from "../../images/createToDo-lower-hero-image.svg";

import "./learnMore.scss";

const LearnMoreCreateToDo = () => {
  return (
    <div className="learnMore">
      <div className="learnMore-sections">
        <div className="learnMore-sections-lower-section">
          <div className="learnMore-sections-lower-section-image">
            <img src={lowerSectionHero} alt="" />
          </div>
          <div className="learnMore-sections-lower-section-text">
            <p>
              We know you have some lifelong dreams you’d like to fulfil. With
              Tudo, you can achieve those goals faster! Do you need a new phone?
              A macbook? A trip to Santorini? Don’t worry we’ve got you covered.
              Get started by creating a list of goals you want to achieve within
              a particular period of time, set a savings frequency, share your
              Tudo goal with your loved ones, so they can increase your savings
              and help you reach your goals faster.
            </p>
            <h2> It’s easy, fast & fun! </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreCreateToDo;
