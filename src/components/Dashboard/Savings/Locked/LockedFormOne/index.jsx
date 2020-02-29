import React from "react";
import { Form, Button } from "react-bootstrap";

import "./lockedFormOne.scss";

const LockedFormOne = props => {
  const {
    handleChange,
    values: { goalName, lockedAmount },
    handleAmountChange,
    nextStep
  } = props;

  const amount = lockedAmount ? parseInt(lockedAmount.replace(/,/g, "")) : 0;

  return (
    <div className="form-one">
      <Form>
        <div className="row no-gutters">
          <div className="col-md-12">
            <div className="form-one-row">
              <h4>What do you wish to name this plan?</h4>
              <div className="form-one-row-name">
                <Form.Group controlId="formGoal">
                  <Form.Control
                    type="text"
                    required
                    onChange={handleChange("goalName")}
                    value={goalName}
                  />
                </Form.Group>
                <div className="form-one-row-name-label">
                  <p>Eg. My 2019 Savings, December Funds</p>
                </div>
              </div>
            </div>
            <div className="form-one-row">
              <h4>How much do you want to lock?</h4>
              <div
                className={
                  amount < 100 && amount !== 0
                    ? "form-one-row-name error"
                    : "form-one-row-name"
                }
              >
                <Form.Group controlId="formAmount">
                  <Form.Control
                    type="text"
                    required
                    onChange={handleAmountChange("lockedAmount")}
                    value={lockedAmount}
                  />
                  <Form.Text className="text-muted">
                    You cannot save an amount less than 100 naira
                  </Form.Text>
                </Form.Group>
                <div className="form-one-row-name-label">
                  <p>The amount you want to safely lock away e.g N 100,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-one-continue">
              <Button
                onClick={nextStep}
                disabled={
                  lockedAmount === "" || amount < 100 || goalName === ""
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
};

export default LockedFormOne;
