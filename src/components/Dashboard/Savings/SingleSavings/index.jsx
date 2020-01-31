import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import Bottombar from "../../../Bottombar";
import { InfoCard } from "./InfoCard";

import "./singleSavings.scss";

const SingleSavings = () => {
  const history = window;

  return (
    <div className="singleSavings">
      <div className="singleSavings-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="singleSavings-bottombar">
        <Bottombar path={history} />
      </div>
      <div className="singleSavings-body">
        <AuthNavBar />
        <div className="singleSavings-body-content">
          <div className="row no-gutters">
            <div className="col-md-1">
              <div className="singleSavings-body-content-back">
                <Link to="/dashboard/savings">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-11">
              <div className="row no-gutters">
                <div className="col-md-12">
                  <h2>December Funds</h2>
                </div>
                <div className="col-md-12">
                  <div className="singleSavings-body-content-left">
                    <div className="singleSavings-body-content-left-amount">
                      <div className="singleSavings-body-content-left-amount-column">
                        <p>Amount Locked</p>
                        <h4>
                          <sup>N</sup> 150,000
                        </h4>
                      </div>
                      <div className="singleSavings-body-content-left-amount-column singleSavings-body-content-left-amount-column-mid">
                        <p>Interest Earned</p>
                        <h4>
                          <sup>N</sup> 15,000
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="singleSavings-body-content-left-actions">
                    <Link to={`${window.location.pathname}/edit`}>
                      <div className="singleSavings-body-content-left-actions-item">
                        <div className="singleSavings-body-content-left-actions-item-icon">
                          <i className="material-icons">edit</i>
                        </div>
                        <p>Edit Plan</p>
                      </div>
                    </Link>
                    <Link
                      to="#"
                      className="singleSavings-body-content-left-actions-item"
                    >
                      <div className="singleSavings-body-content-left-actions-item">
                        <div className="singleSavings-body-content-left-actions-item-icon">
                          <i className="material-icons">flash_on</i>
                        </div>
                        <p>Top Up</p>
                      </div>
                    </Link>
                    <Link
                      to="#"
                      className="singleSavings-body-content-left-actions-item"
                    >
                      <div className="singleSavings-body-content-left-actions-item">
                        <div className="singleSavings-body-content-left-actions-item-icon">
                          <i className="material-icons">get_app</i>
                        </div>
                        <p>Withdraw</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="singleSavings-body-content-left-info">
                    <InfoCard title="Savings Unlock Date" body="05/11/2020" />
                    <InfoCard title="Plan Type" body="Locked Savings" />
                    <InfoCard title="Expected Return" body="N 165,000" />
                    <InfoCard title="Interest Rate" body="10%" />
                    <InfoCard title="Start Date" body="05/10/2019" />
                    <InfoCard title="Debit Card" body="5432 **** **** 5698" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="singleSavings-body-content-left-transaction">
                    <div className="singleSavings-body-content-left-transaction-header">
                      <h4>Transactions</h4>
                    </div>
                    <div className="singleSavings-body-content-left-transaction-row">
                      <div className="row no-gutters">
                        <div className="col-md-1">
                          <div className="singleSavings-body-content-left-transaction-row-icon">
                            <i className="material-icons">arrow_upward</i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="singleSavings-body-content-left-transaction-row-mid">
                            <p>Credit</p>
                            <p className="singleSavings-body-content-left-transaction-row-date">
                              05/10/2019 16:25 pm
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="singleSavings-body-content-left-transaction-row-amount">
                            <p>
                              <span>N 150,000</span>
                            </p>
                          </div>
                        </div>
                      </div>
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

export default SingleSavings;
