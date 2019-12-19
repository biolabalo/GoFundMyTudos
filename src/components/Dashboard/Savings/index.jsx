import React from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";

import "./savings.scss";

const Savings = () => {
  const history = window;

  return (
    <div className="savings">
      <div className="savings-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="savings-body">
        <AuthNavBar />
        <div className="savings-body-content">
          <div className="savings-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="savings-body-content-header">
                <h2>Savings</h2>
                <p>Let’s get to work and smash some goals.</p>
              </div>
              <div className="savings-body-content-create">
                <div className="savings-body-content-create-header">
                  <h5>My Savings Plans</h5>
                </div>
                <div className="savings-body-content-create-card">
                  <div className="savings-body-content-create-card-icon">
                    <Link to="/dashboard/savings/plans">+</Link>
                  </div>
                  <h3>Create A Savings Plan</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="savings-body-content-overview">
                <div className="savings-body-content-overview-card">
                  <h3>Account Overview</h3>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
