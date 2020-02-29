/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ProgressBar, Modal } from "react-bootstrap";
import moment from "moment";

import { getCard } from "../../../../redux/cards/cardAction";
import axios from "../../../../axios-instance";

import Sidebar from "../../../Sidebar";
import Bottombar from "../../../Bottombar";
import AuthNavBar from "../../../commons/AuthNavBar";
import LockedFormOne from "./LockedFormOne";
import LockedFormTwo from "./LockedFormTwo";
import LockedFormThree from "./LockedFormThree";
import LockedFormFour from "./LockedFormFour";

import "./locked.scss";

class Locked extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      goalName: "",
      frequency: "",
      lockedAmount: "",
      savingAmount: "",
      startDate: new Date(),
      endDate: "",
      duration: "",
      dateSelected: "",
      interest: "",
      selectedCard: "",
      checked: false
    };
  }

  componentDidMount() {
    this.props.getCard();
  }

  handleSave = () => {
    const {
      goalName,
      startDate,
      lockedAmount,
      interest,
      frequency,
      selectedCard
    } = this.state;

    this.submitSavings(
      goalName,
      startDate,
      lockedAmount,
      interest,
      frequency,
      selectedCard
    );
  };

  submitSavings = async (
    goalName,
    startDate,
    lockedAmount,
    interest,
    frequency,
    dateSelected,
    selectedCard
  ) => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    const target = parseInt(lockedAmount.replace(/,/g, "")) * 100;
    const date = moment(startDate).format("YYYY-MM-DD HH:mm:ss");

    const today = new Date();

    const formatedToday = moment(today).format("YYYY-MM-DD");
    const formatedDateSelected = moment(startDate).format("YYYY-MM-DD");

    const data =
      selectedCard && formatedToday !== formatedDateSelected
        ? JSON.stringify({
            purpose: goalName,
            target_amount: target,
            start_date: date,
            maturity_date: this.getMaturityDate(frequency),
            allow_interest: interest,
            card_id: selectedCard
          })
        : JSON.stringify({
            purpose: goalName,
            target_amount: target,
            start_date: date,
            maturity_date: this.getMaturityDate(frequency),
            allow_interest: interest
          });

    try {
      const response = await axios.post("savings/locked", data, config);
      const {
        data: {
          data: { authorization_url }
        }
      } = response;

      if (authorization_url) {
        window.location = authorization_url;
        return;
      }

      const redirectUrl = `${window.location.href}?trxref=123456`;

      window.location = redirectUrl;
    } catch (e) {
      return e.response;
    }
  };

  getMaturityDate = frequency => {
    const date = new Date();
    const expectedDate = new Date(date);

    if (frequency === "3 months") {
      expectedDate.setDate(expectedDate.getDate() + 92);
      return moment(expectedDate).format("YYYY-MM-DD HH:mm:ss");
    }

    if (frequency === "6 months") {
      expectedDate.setDate(expectedDate.getDate() + 180);
      return moment(expectedDate).format("YYYY-MM-DD HH:mm:ss");
    }

    if (frequency === "9 months") {
      expectedDate.setDate(expectedDate.getDate() + 270);
      return moment(expectedDate).format("YYYY-MM-DD HH:mm:ss");
    }

    expectedDate.setDate(expectedDate.getDate() + 365);
    return moment(expectedDate).format("YYYY-MM-DD HH:mm:ss");
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleAmountChange = input => e => {
    const { value } = e.target;

    const formatedValue = value ? value.replace(/[^0-9]/, "") : "";

    const integerValue = formatedValue
      ? parseInt(formatedValue.replace(/,/g, "")).toLocaleString()
      : "";

    this.setState({
      [input]: integerValue
    });
  };

  toggleCheck = e => {
    e.preventDefault();

    return this.setState({
      agree: !this.state.agree
    });
  };

  handleFreguency = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleDate = date => {
    this.setState({
      startDate: date
    });
  };

  handleSourceChange = e => {
    this.setState({
      selectedCard: e.target.value
    });
  };

  toggleModal = () => {
    this.props.history.push("/dashboard/savings");
  };

  render() {
    const history = window;
    const {
      step,
      goalName,
      frequency,
      lockedAmount,
      savingAmount,
      startDate,
      endDate,
      interest,
      checked,
      selectedCard
    } = this.state;

    const {
      cards: { debitCards }
    } = this.props;

    const values = {
      goalName,
      frequency,
      startDate,
      endDate,
      lockedAmount,
      savingAmount,
      interest,
      selectedCard,
      debitCards
    };

    const reference = history.location.search.split("?trxref=")[1];

    switch (step) {
      case 1:
        return (
          <div className="locked">
            <Modal
              show={reference ? true : false}
              onHide={() => {}}
              size="lg"
              centered
              animation
            >
              <div className="locked-modal">
                <div className="locked-modal-image">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1579852508/qxthmuuufdtprttwnm4j.png"
                    alt=""
                  />
                </div>
                <div className="new-tudu-modal-body">
                  <h3>Great Job!</h3>
                  <p>You’ve successfully created your savings plan</p>
                  <button onClick={this.toggleModal}>Go to Savings</button>
                </div>
              </div>
            </Modal>
            <div className="locked-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="locked-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="locked-body">
              <AuthNavBar />
              <div className="locked-body-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="locked-body-content">
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="locked-body-content-header">
                      <Link to="/dashboard/savings/plans">
                        <i className="fas fa-chevron-left"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div className="row no-gutters">
                      <div className="col-md-8">
                        <div>
                          <div className="locked-body-content-header">
                            <h3>Locked Savings Plan Settings</h3>
                          </div>
                          <div className="locked-body-content-progress">
                            <ProgressBar variant="info" now={10} />
                          </div>
                        </div>
                        <LockedFormOne
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleAmountChange={this.handleAmountChange}
                          handleFreguency={this.handleFreguency}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="locked-body-content-right">
                          <img
                            src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="locked">
            <div className="locked-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="locked-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="locked-body">
              <AuthNavBar />
              <div className="locked-body-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="locked-body-content">
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="locked-body-content-header">
                      <div
                        className="locked-body-content-header-back"
                        onClick={this.prevStep}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div className="row no-gutters">
                      <div className="col-md-8">
                        <div>
                          <div className="locked-body-content-header">
                            <h3>Locked Savings Plan Settings</h3>
                          </div>
                          <div className="locked-body-content-progress">
                            <ProgressBar variant="info" now={35} />
                          </div>
                        </div>
                        <LockedFormTwo
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleDate={this.handleDate}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="locked-body-content-right">
                          <img
                            src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="locked">
            <div className="locked-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="locked-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="locked-body">
              <AuthNavBar />
              <div className="locked-body-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="locked-body-content">
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="locked-body-content-header">
                      <div
                        className="locked-body-content-header-back"
                        onClick={this.prevStep}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div className="row no-gutters">
                      <div className="col-md-8">
                        <div>
                          <div className="locked-body-content-header">
                            <h3>Locked Savings Plan Settings</h3>
                          </div>
                          <div className="locked-body-content-progress">
                            <ProgressBar variant="info" now={75} />
                          </div>
                        </div>
                        <LockedFormThree
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleSourceChange={this.handleSourceChange}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="locked-body-content-right">
                          <img
                            src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="locked">
            <div className="locked-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="locked-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="locked-body">
              <AuthNavBar />
              <div className="locked-body-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="locked-body-content">
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="locked-body-content-header">
                      <div
                        className="locked-body-content-header-back"
                        onClick={this.prevStep}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div className="row no-gutters">
                      <div className="col-md-8">
                        <div>
                          <div className="locked-body-content-header">
                            <h3>Locked Savings Plan Summary</h3>
                          </div>
                          <div className="locked-body-content-progress">
                            <ProgressBar variant="info" now={100} />
                          </div>
                        </div>
                        <LockedFormFour
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleSave={this.handleSave}
                          checked={checked}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="locked-body-content-right">
                          <img
                            src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return;
    }
  }
}

const mapStateToProps = ({ cards }) => {
  return {
    cards
  };
};

const mapDispatchToProps = dispatch => ({
  getCard: () => {
    dispatch(getCard());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locked);
