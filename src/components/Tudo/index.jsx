import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

import axios from "../../axios-instance";
import Sidebar from "../Sidebar";
import AuthNavBar from "../commons/AuthNavBar";

import TuduFeedCard from "../Dashboard/TuduFeedCard";
import Bottombar from "../Bottombar";

import "./tudu.scss";

class TuduPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completedTudos: [],
      runningTudos: [],
      loading: false,
      tudoPrev: "",
      tudoNext: "",
      completedTudoPrev: "",
      completedTudoNext: "",
      page: 1,
      completedPage: 1
    };
  }
  componentDidMount() {
    this.getCompletedTudos();
    this.getRunningTudos();
  }

  toggleVisibility = status => e => {
    e.preventDefault();
    const { updateTudoVisibility } = this.props;
    const id = e.target.id;
    const bool = !status;

    updateTudoVisibility(id, bool);

    window.location.reload();
  };

  getCompletedTudos = async () => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const tudos = await axios.get("tudo?type=completed", config);
      this.setState({
        completedTudos: tudos.data.data,
        completedTudoPrev: tudos.data.previous,
        completedTudoNext: tudos.data.next
      });
    } catch (err) {
      return err.response;
    }
  };

  getRunningTudos = async () => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    this.setState({
      loading: true
    });
    try {
      const tudos = await axios.get("tudo?type=running", config);
      this.setState({
        runningTudos: tudos.data.data,
        tudoNext: tudos.data.next,
        loading: false
      });
    } catch (err) {
      return err.response;
    }
  };

  getRunningPrevPage = query => async e => {
    e.preventDefault();

    const url = `tudo?${query}`;

    this.setState({
      loading: true
    });
    try {
      const tudos = await axios.get(url);

      if (query.split("&")[1] === "type=running") {
        this.setState({
          runningTudos: tudos.data.data,
          tudoNext: tudos.data.next,
          tudoPrev: tudos.data.previous,
          page: this.state.page - 1,
          loading: false
        });
      } else {
        this.setState({
          completedTudos: tudos.data.data,
          completedTudoPrev: tudos.data.previous,
          completedTudoNext: tudos.data.next,
          completedPage: this.state.completedPage - 1,
          loading: false
        });
      }
    } catch (err) {
      return err.response;
    }
  };

  getRunningNextPage = query => async e => {
    e.preventDefault();

    const url = `tudo?${query}`;

    this.setState({
      loading: true
    });
    try {
      const tudos = await axios.get(url);

      if (query.split("&")[1] === "type=running") {
        this.setState({
          runningTudos: tudos.data.data,
          tudoNext: tudos.data.next,
          tudoPrev: tudos.data.previous,
          page: this.state.page + 1,
          loading: false
        });
      } else {
        this.setState({
          completedTudos: tudos.data.data,
          completedTudoPrev: tudos.data.previous,
          completedTudoNext: tudos.data.next,
          completedPage: this.state.completedPage + 1,
          loading: false
        });
      }
    } catch (err) {
      return err.response;
    }
  };

  render() {
    const history = window;

    const {
      completedTudos,
      runningTudos,
      tudoNext,
      tudoPrev,
      loading,
      page,
      completedPage,
      completedTudoNext,
      completedTudoPrev
    } = this.state;

    const next = tudoNext ? tudoNext.split("?")[1] : "";
    const previous = tudoPrev ? tudoPrev.split("?")[1] : "";

    const nextCompleted = completedTudoNext
      ? completedTudoNext.split("?")[1]
      : "";
    const prevCompleted = completedTudoPrev
      ? completedTudoPrev.split("?")[1]
      : "";

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
                          {loading ? (
                            <div className="tudu-body-content-dashboard-isloading">
                              <div className="savings-body-content-isLoading-card"></div>
                              <div className="savings-body-content-isLoading-card"></div>
                              <div className="savings-body-content-isLoading-card"></div>
                              <div className="savings-body-content-isLoading-card"></div>
                              <div className="savings-body-content-isLoading-card"></div>
                              <div className="savings-body-content-isLoading-card"></div>
                            </div>
                          ) : runningTudos.length > 0 ? (
                            <>
                              <TuduFeedCard
                                tudos={runningTudos}
                                toggleVisibility={this.toggleVisibility}
                              />
                              <div
                                className={
                                  next || previous
                                    ? "savings-body-content-pagination"
                                    : "savings-body-content-no-display"
                                }
                              >
                                <button
                                  disabled={previous ? false : true}
                                  onClick={this.getRunningPrevPage(previous)}
                                >
                                  {`<< previous`}
                                </button>
                                <p>Page {page}</p>
                                <button
                                  disabled={next ? false : true}
                                  onClick={this.getRunningNextPage(next)}
                                >
                                  {`next >>`}
                                </button>
                              </div>
                            </>
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
                            {loading ? (
                              <div className="tudu-body-content-dashboard-isloading">
                                <div className="savings-body-content-isLoading-card"></div>
                                <div className="savings-body-content-isLoading-card"></div>
                                <div className="savings-body-content-isLoading-card"></div>
                                <div className="savings-body-content-isLoading-card"></div>
                                <div className="savings-body-content-isLoading-card"></div>
                                <div className="savings-body-content-isLoading-card"></div>
                              </div>
                            ) : completedTudos.length > 0 ? (
                              <>
                                <TuduFeedCard
                                  tudos={completedTudos}
                                  toggleVisibility={this.toggleVisibility}
                                />
                                <div
                                  className={
                                    nextCompleted || prevCompleted
                                      ? "savings-body-content-pagination"
                                      : "savings-body-content-no-display"
                                  }
                                >
                                  <button
                                    disabled={prevCompleted ? false : true}
                                    onClick={this.getRunningPrevPage(
                                      prevCompleted
                                    )}
                                  >
                                    {`<< previous`}
                                  </button>
                                  <p>Page {completedPage}</p>
                                  <button
                                    disabled={nextCompleted ? false : true}
                                    onClick={this.getRunningNextPage(
                                      nextCompleted
                                    )}
                                  >
                                    {`next >>`}
                                  </button>
                                </div>
                              </>
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
                          runningTudos.length < 3
                            ? { overflow: "hidden" }
                            : { overflowY: "scroll" }
                        }
                        className="tudu-body-content-overview-card-body"
                      >
                        {runningTudos.length === 0 ? (
                          <p>You have no goals yet</p>
                        ) : (
                          runningTudos.map((tudo, index) => {
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
