import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import "./formSavingsFrequency.scss";

export class FormSavingsFrequency extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const {
      values: { savingAmount, frequency },
      handleAmountChange,
      handleFreguency
    } = this.props;

    return (
      <div className="frequency">
        <Form>
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="frequency-row">
                <h4>How much do you want to save?</h4>
                <div className="frequency-row-name">
                  <Form.Group controlId="formFrequency">
                    <Form.Control
                      type="text"
                      required
                      onChange={handleAmountChange("savingAmount")}
                      value={savingAmount}
                    />
                  </Form.Group>
                  <div className="frequency-row-name-label">
                    <p>
                      How much you can afford to save gradually to meet your
                      target.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="frequency-row">
                <h4>How frequently do you save?</h4>
                <div className="frequency-buttons">
                  <Button
                    type="button"
                    className={frequency === "Daily" ? "active" : null}
                    variant="outline-secondary"
                    value="Daily"
                    onClick={handleFreguency("frequency")}
                  >
                    Daily
                  </Button>
                  <Button
                    className={frequency === "Weekly" ? "active" : null}
                    value="Weekly"
                    variant="outline-secondary"
                    onClick={handleFreguency("frequency")}
                  >
                    Weekly
                  </Button>
                  <Button
                    className={frequency === "Monthly" ? "active" : null}
                    value="Monthly"
                    variant="outline-secondary"
                    onClick={handleFreguency("frequency")}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-12"></div>
            <div className="col-md-12">
              <div className="goal-continue">
                <Button
                  onClick={this.continue}
                  disabled={
                    frequency === "" || savingAmount === "" ? true : false
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

export default FormSavingsFrequency;
