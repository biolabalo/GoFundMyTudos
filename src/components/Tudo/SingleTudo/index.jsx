import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";

import checkTokenValidityAndLogout from "../../../checkTokenValidityAndLogout";
import { logout } from "../../../redux/auth/authAction";
import axios from "../../../axios-instance";
import AuthNavBar from "../../commons/AuthNavBar";
import { connect } from "react-redux";
import Sidebar from "../../Sidebar";
import Bottombar from "../../Bottombar";
import SingleTudoCard from "./SingleTudoCard";

import "./singleTudo.scss";

export class SingleTudo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tudo: {},
      isLoading: true,
      error: ""
    };
  }
  componentDidMount() {
    this.getTudo();
  }

  getTudo = async () => {
    const {
      match: { params: tudoid },
      history,
      dispatch
    } = this.props;

    try {
      const tudo = await axios.get(`tudo/${tudoid.tudoid}`);

      this.setState({
        tudo: tudo.data.data,
        isLoading: false
      });
    } catch (err) {
      if (
        err.response.status === 403 &&
        err.response.data.error === "Authentication Failed"
      ) {
        return checkTokenValidityAndLogout(logout, history, dispatch);
      }

      this.setState({
        error: "Tudo cannot be displayed, please try again later",
        isLoading: false
      });
    }
  };

  getDays = startDate => {
    const startDay = new Date(startDate);
    const today = new Date();
    const numberOfDays = today.getTime() - startDay.getTime();

    return numberOfDays > 0 ? parseInt(numberOfDays / (1000 * 3600 * 24)) : 0;
  };

  copySuccess = () => toast.success("Share link copied successfully");
  copyFailure = () => toast.error("Share link failed to copy");

  shareTudo = () => {
    const shareCode = this.state.tudo.share_code;
    this.props.history.push(`/dashboard/tudo/share/${shareCode}`);
  };

  redirect = route => {
    this.props.history.push(`/dashboard/tudo/${route}/${this.state.tudo.id}`);
  };

  render() {
    const history = window;

    const { tudo, isLoading, error } = this.state;

    const tudoAmount = (tudo.amount / 100).toFixed(2);

    const generatedAmount =
      tudo.amount_generated / 100 > 0
        ? (tudo.amount_generated / 100).toFixed(2)
        : 0;
    const accruedInterest =
      tudo.accrued_interest === 0
        ? tudo.accrued_interest
        : tudo.accrued_interest / 100;

    const transactions = tudo.transactions ? tudo.transactions : [];

    return (
      <div className="single-tudo">
        <div className="single-tudo-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="single-tudo-bottombar">
          <Bottombar path={history} />
        </div>
        <div className="single-tudo-body">
          <AuthNavBar />
          <div className="single-tudo-body-content">
            {isLoading ? (
              <div className="single-tudo-body-content-spinner">
                <Spinner animation="border" size="lg" />
              </div>
            ) : error ? (
              <div className="single-tudo-body-content-error">
                <div className="single-tudo-body-content-back">
                  <Link to="/dashboard/tudo">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
                <div className="single-tudo-body-content-error-text">
                  <p>{error}</p>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-1">
                  <div className="single-tudo-body-content-back">
                    <Link to="/dashboard/tudo">
                      <i className="fas fa-chevron-left"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <h2>{tudo.goal_name}</h2>
                    </div>
                    <div className="col-md-12 col-lg-12 col-xl-8">
                      <div className="single-tudo-body-content-left">
                        <div className="single-tudo-body-content-left-amount">
                          <div className="single-tudo-body-content-left-amount-column">
                            <p>Goal amount</p>
                            <h4>
                              <sup>N </sup>
                              {new Intl.NumberFormat().format(tudoAmount)}
                            </h4>
                          </div>
                          <div className="single-tudo-body-content-left-amount-column">
                            <div className="single-tudo-body-content-left-amount-column-mid">
                              <p>Amount Raised</p>
                              <h4>
                                <sup>N </sup>
                                {new Intl.NumberFormat().format(
                                  generatedAmount
                                )}
                              </h4>
                            </div>
                          </div>
                          <div className="single-tudo-body-content-left-amount-column">
                            <p>Interest Earned</p>
                            <h4>
                              <sup>N </sup>
                              {new Intl.NumberFormat().format(accruedInterest)}
                            </h4>
                          </div>
                        </div>
                        <div className="single-tudo-body-content-left-actions">
                          <button
                            className="single-tudo-body-content-left-actions-item"
                            onClick={this.shareTudo}
                          >
                            <div className="single-tudo-body-content-left-actions-item-icon">
                              <i className="material-icons">share</i>
                            </div>
                            <p>Share</p>
                          </button>
                          <button
                            className="single-tudo-body-content-left-actions-item"
                            onClick={() => {
                              this.redirect("withdraw");
                            }}
                          >
                            <div className="single-tudo-body-content-left-actions-item">
                              <div className="single-tudo-body-content-left-actions-item-icon">
                                <i className="material-icons">get_app</i>
                              </div>
                              <p>Withdraw</p>
                            </div>
                          </button>
                          <button
                            className="single-tudo-body-content-left-actions-item"
                            onClick={() => {
                              this.redirect("topup");
                            }}
                          >
                            <div className="single-tudo-body-content-left-actions-item">
                              <div className="single-tudo-body-content-left-actions-item-icon">
                                <i className="material-icons">flash_on</i>
                              </div>
                              <p>Top Up</p>
                            </div>
                          </button>
                          <Link to={`${window.location.pathname}/edit`}>
                            <div className="single-tudo-body-content-left-actions-item">
                              <div className="single-tudo-body-content-left-actions-item-icon">
                                <i className="material-icons">edit</i>
                              </div>
                              <p>Edit Goal</p>
                            </div>
                          </Link>
                        </div>
                        <div className="single-tudo-body-content-left-cards">
                          <SingleTudoCard achieved={true} tudo={tudo} />
                          <SingleTudoCard
                            duration={true}
                            tudo={tudo}
                            days={this.getDays(tudo.start_date)}
                          />
                          <SingleTudoCard
                            privacy={true}
                            visibility={tudo.is_visible}
                          />
                        </div>
                        <div className="single-tudo-body-content-left-transaction">
                          <div className="single-tudo-body-content-left-transaction-header">
                            <h4>Transactions</h4>
                          </div>
                          {transactions.length > 0 ? (
                            transactions.map((transact, index) => {
                              return (
                                <div
                                  className="single-tudo-body-content-left-transaction-row"
                                  key={index}
                                >
                                  <div className="row">
                                    <div className="col-md-1">
                                      <div className="single-tudo-body-content-left-transaction-row-icon">
                                        <i className="material-icons">
                                          arrow_upward
                                        </i>
                                      </div>
                                    </div>
                                    <div className="col-md-8">
                                      <div className="single-tudo-body-content-left-transaction-row-mid">
                                        <p>Credit</p>
                                        <p className="single-tudo-body-content-left-transaction-row-date">
                                          {moment(
                                            transact.contributed_at
                                          ).format("Do MMM YYYY")}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="single-tudo-body-content-left-transaction-row-amount">
                                        <p>
                                          N{" "}
                                          {new Intl.NumberFormat().format(
                                            transact.amount / 100
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="single-tudo-body-content-left-transaction-empty">
                              <div className="single-tudo-body-content-left-transaction-empty-image">
                                <img
                                  src="https://res.cloudinary.com/xerdetech/image/upload/v1576151221/empty_n6bdux.svg"
                                  alt=""
                                />
                              </div>
                              <p>
                                You haven’t carried out any transactions yet
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-xl-4">
                      <div className="single-tudo-body-content-right">
                        <div className="single-tudo-body-content-right-overview">
                          <div className="single-tudo-body-content-right-overview-card">
                            <div className="single-tudo-body-content-right-overview-card-header">
                              <h3>Who’s Added To My Goal</h3>
                              <Link to="#">See All</Link>
                            </div>
                            <hr />
                            <div className="single-tudo-body-content-right-overview-card-body">
                              <div className="single-tudo-body-content-right-overview-card-body-empty">
                                <p>No one has added to your goal yet</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SingleTudo);
