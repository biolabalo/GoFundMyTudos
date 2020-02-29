import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

import axios from "../../../axios-instance";
import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";
import Bottombar from "../../Bottombar";
import ActiveCard from "./ActiveCard";
import CompletedCard from "./CompletedCard";

import "./savings.scss";

export class Savings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savingsArray: [],
      savingsCompleted: [],
      savingsPrev: "",
      savingsNext: "",
      completedPrev: "",
      completedNext: "",
      page: 1,
      completedPage: 1,
      loading: false
    };
  }
  componentDidMount() {
    this.setSavings();
    this.setSavingsCompleted();
  }

  getPrevPage = query => async e => {
    e.preventDefault();

    const url = `savings/list?${query}`;

    this.setState({
      loading: true
    });

    try {
      const response = await axios.get(url);

      if (query.split("&")[1] === "type=running") {
        this.setState({
          savingsArray: response.data.data,
          savingsPrev: response.data.previous,
          savingsNext: response.data.next,
          page: this.state.page - 1,
          loading: false
        });
      } else {
        this.setState({
          savingsCompleted: response.data.data,
          completedPrev: response.data.previous,
          completedNext: response.data.next,
          completedPage: this.state.completedPage - 1,
          loading: false
        });
      }
    } catch (e) {
      return e.response;
    }
  };

  getNextPage = query => async e => {
    e.preventDefault();

    const url = `savings/list?${query}`;

    this.setState({
      loading: true
    });

    try {
      const response = await axios.get(url);

      if (query.split("&")[1] === "type=running") {
        this.setState({
          savingsArray: response.data.data,
          savingsPrev: response.data.previous,
          savingsNext: response.data.next,
          page: this.state.page + 1,
          loading: false
        });
      } else {
        this.setState({
          savingsCompleted: response.data.data,
          completedPrev: response.data.previous,
          completedNext: response.data.next,
          completedPage: this.state.completedPage + 1,
          loading: false
        });
      }
    } catch (e) {
      return e.response;
    }
  };

  setSavings = async () => {
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
      const response = await axios.get("savings/list?type=running", config);
      this.setState({
        savingsArray: response.data.data,
        savingsPrev: response.data.previous,
        savingsNext: response.data.next,
        loading: false
      });
    } catch (e) {
      return e.response;
    }
  };

  setSavingsCompleted = async () => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const response = await axios.get("savings/list?type=completed", config);
      this.setState({
        savingsCompleted: response.data.data,
        completedPrev: response.data.previous,
        completedNext: response.data.next
      });
    } catch (e) {
      return e.response;
    }
  };

  render() {
    const history = window;
    const {
      savingsNext,
      savingsPrev,
      page,
      completedPage,
      savingsArray,
      savingsCompleted,
      loading,
      completedNext,
      completedPrev
    } = this.state;

    const next = savingsNext ? savingsNext.split("?")[1] : "";
    const previous = savingsPrev ? savingsPrev.split("?")[1] : "";
    const savingsData = savingsArray.length > 0 ? savingsArray : [];

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
                        {loading ? (
                          <>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                          </>
                        ) : (
                          savingsData.length > 0 &&
                          savingsData.map((item, index) => {
                            return <ActiveCard data={item} key={index} />;
                          })
                        )}
                      </div>
                      <div
                        className={
                          next || previous
                            ? "savings-body-content-pagination"
                            : "savings-body-content-no-display"
                        }
                      >
                        <button
                          disabled={previous ? false : true}
                          onClick={this.getPrevPage(previous)}
                        >
                          {`<< previous`}
                        </button>
                        <p>Page {page}</p>
                        <button
                          disabled={next ? false : true}
                          onClick={this.getNextPage(next)}
                        >
                          {`next >>`}
                        </button>
                      </div>
                    </Tab>
                    <Tab
                      eventKey={2}
                      title="Completed Plans"
                      tabClassName="savings-body-content-tab-all"
                    >
                      <div className="savings-body-content-list">
                        {loading ? (
                          <>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                            <div className="savings-body-content-isLoading-card"></div>
                          </>
                        ) : (
                          savingsCompleted.length > 0 &&
                          savingsCompleted.map((item, index) => {
                            return <CompletedCard data={item} key={index} />;
                          })
                        )}
                      </div>
                      <div
                        className={
                          completedNext || completedPrev
                            ? "savings-body-content-pagination"
                            : "savings-body-content-no-display"
                        }
                      >
                        <button
                          disabled={completedPrev ? false : true}
                          onClick={this.getPrevPage(completedPrev)}
                        >
                          {`<< previous`}
                        </button>
                        <p>Page {completedPage}</p>
                        <button
                          disabled={completedNext ? false : true}
                          onClick={this.getNextPage(completedNext)}
                        >
                          {`next >>`}
                        </button>
                      </div>
                    </Tab>
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
                        <sup>N</sup> 0
                      </h4>
                    </div>
                  </div>
                  <div className="savings-body-content-overview-card">
                    <div className="savings-body-content-overview-card-left">
                      <p>Interests Earned:</p>
                    </div>
                    <div className="savings-body-content-overview-card-right">
                      <h4>
                        <sup>N</sup> 0
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
  }
}

export default Savings;
