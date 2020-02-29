import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ProgressBar, Modal } from "react-bootstrap";
import moment from "moment";

import axios from "../../../../axios-instance";

import "react-datepicker/dist/react-datepicker.css";

import { getCard } from "../../../../redux/cards/cardAction";
import Sidebar from "../../../Sidebar";
import Bottombar from "../../../Bottombar";
import AuthNavBar from "../../../commons/AuthNavBar";
import FormSavingsGoal from "./FormSavingsGoal";
import FormSavingsFrequency from "./FormSavingsFrequency";
import FormSavingsAmount from "./FormSavingsAmount";
import SavingsConfirmation from "./SavingsConfirmation";

import "./target.scss";

class Target extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      goalName: "",
      frequency: "",
      targetAmount: "",
      savingAmount: "",
      startDate: new Date(),
      endDate: "",
      duration: "",
      dateSelected: "",
      interest: "",
      agree: false,
      checked: false,
      selectedCard: ""
    };
  }

  componentDidMount() {
    const { getCard } = this.props;

    getCard();
  }

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

  handleSourceChange = e => {
    this.setState({
      selectedCard: e.target.value
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

  submitSavings = async (
    goalName,
    startDate,
    targetAmount,
    savingAmount,
    interest,
    selectedCard
  ) => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    const startAmount = parseInt(savingAmount.replace(",", "")) * 100;
    const target = parseInt(targetAmount.replace(",", "")) * 100;
    const date = moment(startDate).format("YYYY-MM-DD HH:mm:ss");

    const today = new Date();

    const formatedToday = moment(today).format("YYYY-MM-DD");
    const formatedDateSelected = moment(startDate).format("YYYY-MM-DD");

    const data =
      selectedCard && formatedToday !== formatedDateSelected
        ? JSON.stringify({
            purpose: goalName,
            start_amount: startAmount,
            target_amount: target,
            start_date: date,
            allow_interest: interest,
            card_id: selectedCard
          })
        : JSON.stringify({
            purpose: goalName,
            start_amount: startAmount,
            target_amount: target,
            start_date: date,
            allow_interest: interest
          });

    try {
      const response = await axios.post("savings/targeted", data, config);
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

  handleSave = () => {
    const {
      goalName,
      startDate,
      targetAmount,
      savingAmount,
      interest,
      selectedCard
    } = this.state;

    this.submitSavings(
      goalName,
      startDate,
      targetAmount,
      savingAmount,
      interest,
      selectedCard
    );
  };

  toggleModal = () => {
    this.props.history.push("/dashboard/savings");
  };

  render() {
    const history = window;

    const { step } = this.state;

    const buffer = {
      cards: { debitCards: [] }
    };

    const {
      cards: { debitCards }
    } = this.props.cards.debitCards.length > 0 ? this.props : buffer;

    const {
      goalName,
      frequency,
      startDate,
      duration,
      targetAmount,
      savingAmount,
      dateSelected,
      interest,
      agree,
      checked,
      selectedCard
    } = this.state;
    const values = {
      goalName,
      frequency,
      startDate,
      duration,
      targetAmount,
      savingAmount,
      dateSelected,
      interest,
      agree,
      checked,
      debitCards,
      selectedCard
    };

    const reference = history.location.search.split("?trxref=")[1];

    switch (step) {
      case 1:
        return (
          <div className="target">
            <Modal
              show={reference ? true : false}
              onHide={() => {}}
              size="lg"
              centered
              animation
            >
              <div className="target-modal">
                <div className="target-modal-image">
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
            <div className="target-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="target-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="target-body-content-image">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                    alt=""
                  />
                </div>
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="target-body-content-header">
                      <Link to="/dashboard/savings/plans">
                        <i className="fas fa-chevron-left"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div className="row no-gutters">
                      <div className="col-md-8">
                        <div>
                          <div className="target-body-content-header">
                            <h3>Target Savings Plan Settings</h3>
                          </div>
                          <div className="target-body-content-progress">
                            <ProgressBar variant="info" now={10} />
                          </div>
                        </div>
                        <FormSavingsGoal
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleAmountChange={this.handleAmountChange}
                          handleFreguency={this.handleFreguency}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="target-body-content-right">
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
          <div className="target">
            <div className="target-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="target-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="target-body-content-image">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                    alt=""
                  />
                </div>
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="target-body-content-header">
                      <div
                        className="target-body-content-header-back"
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
                          <div className="target-body-content-header">
                            <h3>Target Savings Plan Settings</h3>
                          </div>
                          <div className="target-body-content-progress">
                            <ProgressBar variant="info" now={40} />
                          </div>
                        </div>
                        <FormSavingsFrequency
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleAmountChange={this.handleAmountChange}
                          handleFreguency={this.handleFreguency}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="target-body-content-right">
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
          <div className="target">
            <div className="target-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="target-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="target-body-content-image">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                    alt=""
                  />
                </div>
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="target-body-content-header">
                      <div
                        className="target-body-content-header-back"
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
                          <div className="target-body-content-header">
                            <h3>Target Savings Plan Settings</h3>
                          </div>
                          <div className="target-body-content-progress">
                            <ProgressBar variant="info" now={85} />
                          </div>
                        </div>
                        <FormSavingsAmount
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleDate={this.handleDate}
                          handleSourceChange={this.handleSourceChange}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="target-body-content-right">
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
          <div className="target">
            <div className="target-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="target-bottombar">
              <Bottombar path={history} />
            </div>
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="target-body-content-image">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                    alt=""
                  />
                </div>
                <div className="row no-gutters">
                  <div className="col-md-1">
                    <div className="target-body-content-header">
                      <div
                        className="target-body-content-header-back"
                        onClick={this.prevStep}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div className="row no-gutters">
                      <div className="col-md-8">
                        <div className="target-body-content-header">
                          <h3>Target Savings Plan Settings</h3>
                        </div>
                        <div className="target-body-content-progress">
                          <ProgressBar variant="info" now={100} />
                        </div>
                        <SavingsConfirmation
                          nextStep={this.nextStep}
                          handleChange={this.toggleCheck}
                          handleSave={this.handleSave}
                          checked={checked}
                          values={values}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="target-body-content-right">
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
        break;
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
)(Target);
