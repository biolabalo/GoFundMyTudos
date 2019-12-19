import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, Spinner } from "react-bootstrap";

import Sidebar from "../Sidebar";
import AuthNavBar from "../commons/AuthNavBar";

import TuduFeedCard from "../Dashboard/TuduFeedCard";

import "./tudu.scss";

class TuduPage extends Component {
  componentDidMount() {
    const { getTudos } = this.props;

    getTudos();
  }

  render() {
    const history = window;

    const {
      data: {
        tudo: { tudos, isLoading }
      }
    } = this.props;

    return (
      <div className="tudu">
        <div className="tudu-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="tudu-body">
          <AuthNavBar />
          <div className="tudu-body-content">
            <div className="tudu-body-content-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>
            <div className="tudu-body-content-row">
              <div className="row">
                <div className="col-sm-12 col-md-8">
                  <div className="tudu-body-content-header">
                    <h2>My Tudo</h2>
                    <p>Let’s get to work and smash some goals.</p>
                  </div>
                  <div className="tudu-body-content-create">
                    <div className="tudu-body-content-create-dashboard-tab">
                      <Tabs>
                        <Tab
                          eventKey={1}
                          title="Running goals"
                          tabClassName="dashboard-tab-all"
                        >
                          {isLoading ? (
                            <div className="tudu-body-content-create-dashboard-tab-spinner">
                              <Spinner animation="border" size="lg" />
                            </div>
                          ) : tudos.length > 0 ? (
                            <TuduFeedCard tudos={tudos} />
                          ) : (
                            <div className="tudu-body-content-create-card">
                              <div className="tudu-body-content-create-card-icon">
                                <Link to="/dashboard/tudo/new">+</Link>
                              </div>
                              <h3>Create A Tudo list</h3>
                            </div>
                          )}
                        </Tab>
                        <Tab
                          eventKey={2}
                          title="Completed goals"
                          tabClassName="dashboard-tab-savings"
                        >
                          <div className="tudu-body-content-create-empty">
                            <div className="tudu-body-content-create-empty-image">
                              <img
                                src="https://res.cloudinary.com/xerdetech/image/upload/v1574862978/empty_3x_xsyqki.png"
                                alt=""
                              />
                            </div>
                            <p>You have not completed any goals yet.</p>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="tudu-body-content-overview">
                    <div className="tudu-body-content-overview-card">
                      <div className="tudu-body-content-overview-card-header">
                        <h3>My Tudo List</h3>
                        <Link to="/dashboard/tudo/new">Add Goal</Link>
                      </div>
                      <hr className="hr-my-tudo" />
                      <div
                        style={
                          tudos.length < 3
                            ? { overflow: "hidden" }
                            : { overflowY: "scroll" }
                        }
                        className="tudu-body-content-overview-card-body"
                      >
                        {tudos.length === 0 ? (
                          <p>You have no goals yet</p>
                        ) : (
                          tudos.map((tudo, index) => {
                            return (
                              <div
                                key={index}
                                className="tudu-body-content-overview-card-body-row"
                              >
                                <div className="tudu-body-content-overview-card-body-check"></div>
                                <p>{tudo.goal_name}</p>
                              </div>
                            );
                          })
                        )}
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
  }
}

export default TuduPage;
