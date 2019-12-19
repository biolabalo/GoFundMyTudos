import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import FormSavingsGoal from "./FormSavingsGoal";
import FormSavingsAmount from "./FormSavingsAmount";
import FormSavingsDuration from "./FormSavingsDuration";
import SavingsConfirmation from "./SavingsConfirmation";

import "./target.scss";

class Target extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      goalName: "",
      frequency: "",
      amount: "",
      startDate: new Date(),
      duration: "",
      dateSelected: ""
    };
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

  render() {
    const history = window;
    const { step } = this.state;
    const {
      goalName,
      frequency,
      startDate,
      duration,
      amount,
      dateSelected
    } = this.state;
    const values = {
      goalName,
      frequency,
      startDate,
      duration,
      amount,
      dateSelected
    };

    switch (step) {
      case 1:
        return (
          <div className="target">
            <div className="target-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="row">
                  <div className="col-md-4">
                    <div className="target-body-content-header">
                      <Link to="/dashboard/savings/plans">
                        <i className="fas fa-chevron-left"></i>
                      </Link>
                      <h3>Create savings plan</h3>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="target-body-content-progress">
                      <ProgressBar variant="info" now={10} />
                    </div>
                  </div>
                </div>
                <FormSavingsGoal
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  handleFreguency={this.handleFreguency}
                  values={values}
                />
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
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="row">
                  <div className="col-md-4">
                    <div className="target-body-content-header">
                      <div
                        className="target-body-content-header-back"
                        onClick={this.prevStep}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="target-body-content-progress">
                      <ProgressBar variant="info" now={35} />
                    </div>
                  </div>
                </div>
                <FormSavingsAmount
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  values={values}
                  handleDate={this.handleDate}
                />
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
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="row">
                  <div className="col-md-4">
                    <div className="target-body-content-header">
                      <div
                        className="target-body-content-header-back"
                        onClick={this.prevStep}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="target-body-content-progress">
                      <ProgressBar variant="info" now={65} />
                    </div>
                  </div>
                </div>
                <FormSavingsDuration
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  values={values}
                />
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
            <div className="target-body">
              <AuthNavBar />
              <div className="target-body-content">
                <div className="row">
                  <div className="col-md-4">
                    <div className="target-body-content-header">
                      <div
                        className="target-body-content-header-back"
                        onClick={this.prevStep}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="target-body-content-progress">
                      <ProgressBar variant="info" now={100} />
                    </div>
                  </div>
                </div>
                <SavingsConfirmation
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  values={values}
                />
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  }
}

export default Target;
