import React, { Component } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

import "./savingsConfirmation.scss";

export class SavingsConfirmation extends Component {
  render() {
    const { values } = this.props;

    return (
      <div className="confirmation">
        <div className="row">
          <div className="col-md-4">
            <h1>Let's see what you have.</h1>
            <p>Confirm when you are ok with this savings plan</p>
          </div>
          <div className="col-md-8">
            <div className="confirmation-summary">
              <div className="confirmation-summary-card">
                <div className="confirmation-summary-card-header">
                  <p>Savings plan name</p>
                  <h5>{values.goalName}</h5>
                </div>
                <div className="confirmation-summary-card-body">
                  <div className="confirmation-summary-card-body-row">
                    <div className="">
                      <p>Amount</p>
                      <h5>{values.amount}</h5>
                    </div>
                    <div className="">
                      <p>Frequency</p>
                      <h5>{values.frequency}</h5>
                    </div>
                  </div>
                  <div className="confirmation-summary-card-body-row">
                    <div className="">
                      <p>Start date</p>
                      <h5>
                        {values.dateSelected === "today"
                          ? moment().format("DD/MM/YYYY")
                          : moment(values.startDate).format("DD/MM/YYYY")}
                      </h5>
                    </div>
                    <div className="">
                      <p>Maturity date</p>
                      <h5>12/12/2019</h5>
                    </div>
                  </div>
                  <div className="">
                    <p>Interest p.a</p>
                    <h5>16%</h5>
                  </div>
                  <div className="confirmation-summary-card-body-row">
                    <h5>
                      By 12/12/2019, you would have saved <span>N30,500</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <div className="confirmation-continue">
              <Button onClick={this.continue}>Save Now</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavingsConfirmation;
