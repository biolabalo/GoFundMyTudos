import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, Spinner } from "react-bootstrap";

import Sidebar from "../Sidebar";
import AuthNavBar from "../commons/AuthNavBar";

import TuduFeedCard from "../Dashboard/TuduFeedCard";
import Bottombar from "../Bottombar";

import "./tudu.scss";

class TuduPage extends Component {
  componentDidMount() {
    const { getTudos } = this.props;

    getTudos();
  }

  toggleVisibility = status => e => {
    e.preventDefault();
    const { updateTudoVisibility } = this.props;
    const id = e.target.id;
    const bool = !status;

    updateTudoVisibility(id, bool);

    window.location.reload();
  };

  render() {
    const history = window;

    const {
      data: {
        tudo: { tudos, isLoading }
      }
    } = this.props;

    const completedTudos = tudos.map(tudo => {
      return tudo.status === "TudoStatus.completed" && tudo;
    });

    const runningTudos = tudos.map(tudo => {
      return tudo.status === "TudoStatus.running" && tudo;
    });

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
            <div className="tudu-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="tudu-body-content-row">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="tudu-body-content-header">
                    <h2>My Tudo</h2>
                    <p>Let’s get to work and smash some goals.</p>
                  </div>
                  <div className="tudu-body-content-create">
                    <div className="tudu-body-content-dashboard-tab">
                      <Tabs>
                        <Tab
                          eventKey={1}
                          title="Running goals"
                          tabClassName="tudu-body-content-dashboard-tab-all"
                        >
                          {isLoading ? (
                            <div className="tudu-body-content-create-dashboard-tab-spinner">
                              <Spinner animation="border" size="lg" />
                            </div>
                          ) : tudos.length > 0 ? (
                            <TuduFeedCard
                              tudos={runningTudos}
                              toggleVisibility={this.toggleVisibility}
                            />
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
                          tabClassName="tudu-body-content-dashboard-tab-all"
                        >
                          <div className="">
                            {completedTudos ? (
                              <div className="">
                                <TuduFeedCard
                                  tudos={completedTudos}
                                  toggleVisibility={this.toggleVisibility}
                                />
                              </div>
                            ) : (
                              <div className="tudu-body-content-create-empty">
                                <div className="tudu-body-content-create-empty-image">
                                  <img
                                    src="https://res.cloudinary.com/xerdetech/image/upload/v1574862978/empty_3x_xsyqki.png"
                                    alt=""
                                  />
                                </div>
                                <p>You have not completed any goals yet.</p>
                              </div>
                            )}
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
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
                              tudo.status !== "TudoStatus.completed" && (
                                <div
                                  key={index}
                                  className="tudu-body-content-overview-card-body-row"
                                >
                                  <div className="tudu-body-content-overview-card-body-check"></div>
                                  <p>{tudo.goal_name}</p>
                                </div>
                              )
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
