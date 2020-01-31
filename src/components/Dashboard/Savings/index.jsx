import React from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";
import Bottombar from "../../Bottombar";
import ActiveCard from "./ActiveCard";
import { data } from "./ActiveCard/data";

import "./savings.scss";

const Savings = () => {
  const history = window;

  return (
    <div className="savings">
      <div className="savings-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="savings-bottombar">
        <Bottombar path={history} />
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
              <div className="savings-body-content-tab">
                <Tabs>
                  <Tab
                    eventKey={1}
                    title="Running Plans"
                    tabClassName="savings-body-content-tab-all"
                  >
                    <div className="savings-body-content-list">
                      <div className="savings-body-content-list-card">
                        <div className="savings-body-content-list-card-icon">
                          <Link to="/dashboard/savings/plans">+</Link>
                        </div>
                        <h3>Create A Savings Plan</h3>
                      </div>
                      {data.map((item, index) => {
                        return <ActiveCard data={item} key={index} />;
                      })}
                    </div>
                  </Tab>
                  <Tab
                    eventKey={2}
                    title="Completed Plans"
                    tabClassName="savings-body-content-tab-all"
                  ></Tab>
                </Tabs>
              </div>
            </div>
            <div className="col-md-4">
              <div className="savings-body-content-overview">
                <div className="savings-body-content-overview-card">
                  <div className="savings-body-content-overview-card-left">
                    <p>Total Savings:</p>
                  </div>
                  <div className="savings-body-content-overview-card-right">
                    <h4>
                      <sup>N</sup> 100,000
                    </h4>
                  </div>
                </div>
                <div className="savings-body-content-overview-card">
                  <div className="savings-body-content-overview-card-left">
                    <p>Interests Earned:</p>
                  </div>
                  <div className="savings-body-content-overview-card-right">
                    <h4>
                      <sup>N</sup> 100,000
                    </h4>
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

export default Savings;
