import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import checkTokenValidityAndLogout from "../../../checkTokenValidityAndLogout";
import { logout } from "../../../redux/auth/authAction";
import axios from "../../../axios-instance";
import AuthNavBar from "../../commons/AuthNavBar";
import { connect } from "react-redux";
import Sidebar from "../../Sidebar";
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

  render() {
    const history = window;

    const { tudo, isLoading, error } = this.state;

    this.getDays(tudo.start_date);

    return (
      <div className="single-tudo">
        <div className="single-tudo-sidebar">
          <Sidebar path={history} />
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
                    <div className="col-md-8">
                      <div className="single-tudo-body-content-left">
                        <div className="single-tudo-body-content-left-amount">
                          <div className="single-tudo-body-content-left-amount-column">
                            <p>Goal amount</p>
                            <h4>
                              <sup>N </sup>
                              {tudo.amount / 100}
                            </h4>
                          </div>
                          <div className="single-tudo-body-content-left-amount-column">
                            <div className="single-tudo-body-content-left-amount-column-mid">
                              <p>Amount Raised</p>
                              <h4>
                                <sup>N </sup>
                                {tudo.amount_generated}
                              </h4>
                            </div>
                          </div>
                          <div className="single-tudo-body-content-left-amount-column">
                            <p>Interest Earned</p>
                            <h4>
                              <sup>N </sup>
                              {tudo.accrued_interest}
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
                          <Link to="#">
                            <div className="single-tudo-body-content-left-actions-item">
                              <div className="single-tudo-body-content-left-actions-item-icon">
                                <i className="material-icons">get_app</i>
                              </div>
                              <p>Withdraw</p>
                            </div>
                          </Link>
                          <Link to="#">
                            <div className="single-tudo-body-content-left-actions-item">
                              <div className="single-tudo-body-content-left-actions-item-icon">
                                <i className="material-icons">flash_on</i>
                              </div>
                              <p>Top Up</p>
                            </div>
                          </Link>
                          <Link to="#">
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
                          <SingleTudoCard interest={true} />
                          <SingleTudoCard privacy={true} />
                        </div>
                        <div className="single-tudo-body-content-left-transaction">
                          <div className="single-tudo-body-content-left-transaction-header">
                            <h4>Transactions</h4>
                          </div>
                          <div className="single-tudo-body-content-left-transaction-empty">
                            <div className="single-tudo-body-content-left-transaction-empty-image">
                              <img
                                src="https://res.cloudinary.com/xerdetech/image/upload/v1576151221/empty_n6bdux.svg"
                                alt=""
                              />
                            </div>
                            <p>You haven’t carried out any transactions yet</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
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
