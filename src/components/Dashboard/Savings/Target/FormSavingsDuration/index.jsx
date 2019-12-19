import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import "./formSavingsDuration.scss";

export class FormSavingsDuration extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <div className="duration">
        <Form>
          <div className="row">
            <div className="col-md-4">
              <h1>How do you wish to save?</h1>
            </div>
            <div className="col-md-8">
              <div className="duration-frequency">
                <Button
                  type="button"
                  className={values.duration === "3 months" ? "active" : null}
                  variant="outline-secondary"
                  value="3 months"
                  onClick={handleChange("duration")}
                >
                  3 months
                </Button>
                <Button
                  className={values.duration === "6 months" ? "active" : null}
                  value="6 months"
                  variant="outline-secondary"
                  onClick={handleChange("duration")}
                >
                  6 months
                </Button>
                <Button
                  className={values.duration === "1 year" ? "active" : null}
                  value="1 year"
                  variant="outline-secondary"
                  onClick={handleChange("duration")}
                >
                  1 year
                </Button>
              </div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="duration-continue">
                <Button
                  onClick={this.continue}
                  disabled={values.duration ? false : true}
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

export default FormSavingsDuration;
