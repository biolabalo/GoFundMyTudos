import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { getSavings } from "../../../../redux/savings/action";
import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import Bottombar from "../../../Bottombar";
import { InfoCard } from "./InfoCard";

import "./singleSavings.scss";

class SingleSavings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savingsId: ""
    };
  }
  componentDidMount() {
    const {
      match: { params: id },
      getSavings
    } = this.props;

    getSavings(id.id);
  }

  render() {
    const history = window;

    const buffer = {
      id: "",
      purpose: "",
      plan_type: { type: "" },
      target_amount: 0,
      saved_amount: 0,
      maturity_date: "",
      accrued_interest: 0,
      interest_rate: "",
      card: "",
      start_date: ""
    };

    const { isLoading } = this.props.savings;

    const {
      purpose,
      plan_type: { type },
      target_amount,
      saved_amount,
      maturity_date,
      accrued_interest,
      interest_rate,
      card,
      start_date,
      saving_status
    } = this.props.savings.savings[0] ? this.props.savings.savings[0] : buffer;

    const startDate = moment(start_date).format("LL");
    const maturityDate = moment(maturity_date).format("LL");

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
          {isLoading ? (
            <div className="singleSavings-skeleton">
              <div className="singleSavings-skeleton-header"></div>
              <div className="singleSavings-skeleton-amount"></div>
              <div className="singleSavings-skeleton-buttons">
                <div className="singleSavings-skeleton-button"></div>
                <div className="singleSavings-skeleton-button"></div>
                <div className="singleSavings-skeleton-button"></div>
              </div>
              <div className="singleSavings-skeleton-cards">
                <div className="singleSavings-skeleton-card"></div>
                <div className="singleSavings-skeleton-card"></div>
              </div>
            </div>
          ) : (
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
                      <h2>{purpose}</h2>
                    </div>
                    <div className="col-md-12">
                      <div className="singleSavings-body-content-left">
                        <div className="singleSavings-body-content-left-amount">
                          <div className="singleSavings-body-content-left-amount-column">
                            <p>
                              {type === "Locked"
                                ? "Amount Locked"
                                : "Amount Saved"}
                            </p>
                            <h4>
                              <sup>N</sup>{" "}
                              {new Intl.NumberFormat().format(
                                saved_amount / 100
                              )}
                            </h4>
                          </div>
                          <div className="singleSavings-body-content-left-amount-column singleSavings-body-content-left-amount-column-mid">
                            <p>Interest Earned</p>
                            <h4>
                              <sup>N</sup>{" "}
                              {new Intl.NumberFormat().format(
                                accrued_interest / 100
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="singleSavings-body-content-left-actions">
                        <Link
                          to={`${window.location.pathname}/${type}/edit`}
                          className={
                            saving_status === "COMPLETED"
                              ? "singleSavings-body-content-left-actions-no-display"
                              : ""
                          }
                        >
                          <div className="singleSavings-body-content-left-actions-item">
                            <div className="singleSavings-body-content-left-actions-item-icon">
                              <i className="material-icons">edit</i>
                            </div>
                            <p>Edit Plan</p>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className="singleSavings-body-content-left-actions-no-display"
                        >
                          <div className="singleSavings-body-content-left-actions-item">
                            <div className="singleSavings-body-content-left-actions-item-icon">
                              <i className="material-icons">get_app</i>
                            </div>
                            <p>Withdraw</p>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className={
                            saving_status === "COMPLETED"
                              ? "singleSavings-body-content-left-actions-no-display"
                              : "singleSavings-body-content-left-actions-item"
                          }
                        >
                          <div className="singleSavings-body-content-left-actions-item">
                            <div className="singleSavings-body-content-left-actions-item-icon">
                              <i className="material-icons">flash_on</i>
                            </div>
                            <p>Top Up</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="singleSavings-body-content-left-info">
                        {maturity_date && (
                          <InfoCard
                            title="Savings Unlock Date"
                            body={maturityDate}
                          />
                        )}
                        <InfoCard title="Plan Type" body={`${type} Savings`} />
                        <InfoCard
                          title="Expected Return"
                          body={`N ${new Intl.NumberFormat().format(
                            target_amount / 100 + accrued_interest / 100
                          )}`}
                        />
                        <InfoCard
                          title="Interest Rate"
                          body={`${interest_rate}%`}
                        />
                        <InfoCard title="Start Date" body={startDate} />
                        <InfoCard
                          title="Debit Card"
                          body={
                            card
                              ? `**** **** **** ${card.last_four}`
                              : "No card added yet"
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="singleSavings-body-content-left-transaction">
                        <div className="singleSavings-body-content-left-transaction-header">
                          <h4>Transactions</h4>
                        </div>
                        {/* <div className="singleSavings-body-content-left-transaction-row">
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
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ savings }) => {
  return {
    savings
  };
};

const mapDispatchToProps = dispatch => ({
  getSavings: id => {
    dispatch(getSavings(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSavings);
