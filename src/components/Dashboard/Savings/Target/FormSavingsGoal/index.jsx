import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import "./formSavingsGoal.scss";

export class FormSavingsGoal extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const {
      values: { goalName, targetAmount },
      handleChange,
      handleAmountChange
    } = this.props;

    const amount = targetAmount ? parseInt(targetAmount.replace(/,/g, "")) : 0;

    return (
      <div className="goal">
        <Form>
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="goal-row">
                <h4>What are you saving for?</h4>
                <div className="goal-row-name">
                  <Form.Group controlId="formGoal">
                    <Form.Control
                      type="text"
                      required
                      onChange={handleChange("goalName")}
                      value={goalName}
                    />
                  </Form.Group>
                  <div className="goal-row-name-label">
                    <p>E.g. House rent, marriage, travel</p>
                  </div>
                </div>
              </div>
              <div className="goal-row">
                <h4>How much is your target amount?</h4>
                <div
                  className={
                    amount < 100 && amount !== 0
                      ? "goal-row-name error"
                      : "goal-row-name"
                  }
                >
                  <Form.Group controlId="formAmount">
                    <Form.Control
                      type="text"
                      required
                      onChange={handleAmountChange("targetAmount")}
                      value={targetAmount}
                    />
                    <Form.Text className="text-muted">
                      You cannot save an amount less than 100 naira
                    </Form.Text>
                  </Form.Group>
                  <div className="goal-row-name-label">
                    <p>This is the amount you need to reach your goal</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="goal-continue">
                <Button
                  onClick={this.continue}
                  disabled={
                    targetAmount === "" || amount < 100 || goalName === ""
                      ? true
                      : false
                  }
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default FormSavingsGoal;
