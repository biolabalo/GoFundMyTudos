import React from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import SavingsCard from "../SavingsCard";

import target from "../../../../images/target.png";
import periodic from "../../../../images/periodic.png";
import halal from "../../../../images/halal.png";
import challenge from "../../../../images/challenge-saving.png";

import "./plans.scss";

const Plans = () => {
  const history = window;

  return (
    <div className="plans">
      <div className="plans-body-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="plans-body">
        <AuthNavBar />
        <div className="plans-body-content">
          <div className="plans-body-content-plans">
            <div className="plans-body-content-plans-header">
              <Link to="/dashboard/savings">
                <i className="fas fa-chevron-left"></i>
              </Link>
              <h3>Choose a saving plan</h3>
            </div>
            <div className="plans-body-content-plans-card">
              <SavingsCard
                icon={target}
                title="Target Saving"
                rider="Save a target amount of money"
                target="/dashboard/savings/plans/target"
              />
              <SavingsCard
                icon={periodic}
                title="Periodic Saving"
                rider="Automate savings with ease"
                target="/dashboard/savings/plans"
              />
              <SavingsCard
                icon={halal}
                title="Halal Saving"
                rider="Save money interest free"
                target="/dashboard/savings/plans"
              />
              <SavingsCard
                icon={challenge}
                title="Savings Challenge"
                rider="Challenge friends to create savings"
                target="/dashboard/savings/plans"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
