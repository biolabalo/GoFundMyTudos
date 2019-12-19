import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import "./formSavingsGoal.scss";

export class FormSavingsGoal extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange, handleFreguency } = this.props;

    return (
      <div className="goal">
        <Form>
          <div className="row">
            <div className="col-md-4">
              <h1>What are you saving for?</h1>
            </div>
            <div className="col-md-8">
              <div className="goal-name">
                <Form.Group controlId="formGoal">
                  <Form.Control
                    type="text"
                    placeholder="Enter goal name"
                    required
                    onChange={handleChange("goalName")}
                    value={values.goalName}
                  />
                </Form.Group>
                <div className="goal-name-label">
                  <p>E.g. House rent, marriage, travel</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="goal-frequency-label">
                <h1>How frequently do you save?</h1>
              </div>
            </div>
            <div className="col-md-8">
              <div className="goal-frequency">
                <Button
                  type="button"
                  className={values.frequency === "daily" ? "active" : null}
                  variant="outline-secondary"
                  value="daily"
                  onClick={handleFreguency("frequency")}
                >
                  Daily
                </Button>
                <Button
                  className={values.frequency === "weekly" ? "active" : null}
                  value="weekly"
                  variant="outline-secondary"
                  onClick={handleFreguency("frequency")}
                >
                  Weekly
                </Button>
                <Button
                  className={values.frequency === "monthly" ? "active" : null}
                  value="monthly"
                  variant="outline-secondary"
                  onClick={handleFreguency("frequency")}
                >
                  Monthly
                </Button>
              </div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="goal-continue">
                <Button
                  onClick={this.continue}
                  disabled={values.frequency ? false : true}
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
