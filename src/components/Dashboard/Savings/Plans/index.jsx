import React from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import Bottombar from "../../../Bottombar";
import SavingsCard from "../SavingsCard";

import "./plans.scss";

const Plans = () => {
  const history = window;

  return (
    <div className="plans">
      <div className="plans-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="plans-bottombar">
        <Bottombar path={history} />
      </div>
      <div className="plans-body">
        <AuthNavBar />
        <div className="plans-body-content">
          <div className="plans-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
              alt=""
            />
          </div>
          <div className="plans-body-content-plans">
            <div className="row no-gutters">
              <div className="col-md-1">
                <div className="plans-body-content-plans-header">
                  <Link to="/dashboard/savings">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-11">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <div className="plans-body-content-plans-header">
                      <h3>Choose a saving plan</h3>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="plans-body-content-progress">
                      <ProgressBar variant="info" now={10} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="plans-body-content-plans-card">
                      <SavingsCard
                        title="Target Saving"
                        rider="Click here to create a target savings plan"
                        target="/dashboard/savings/plans/target"
                        type="target"
                      />
                      <SavingsCard
                        title="Periodic Saving"
                        rider="Click here to start saving periodically"
                        target="/dashboard/savings/plans/periodic"
                        type="periodic"
                      />
                      <SavingsCard
                        title="Locked Saving"
                        rider="Click here to lock your savings"
                        target="/dashboard/savings/plans/locked"
                        type="locked"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
