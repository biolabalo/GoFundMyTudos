import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
// import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./formSavingsAmount.scss";

export class FormSavingAmount extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const {
      values: { dateSelected, interest, startDate },
      handleChange,
      handleDate
    } = this.props;

    return (
      <div className="amount">
        <Form>
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="amount-startDate-label">
                <h4>When do you want to start saving?</h4>
              </div>
            </div>
            <div className="col-md-12">
              <fieldset>
                <Form.Group>
                  <div className="amount-startDate">
                    <Form.Check
                      type="radio"
                      label="Today"
                      name="startDate"
                      value="today"
                      id="startDate1"
                      onChange={handleChange("dateSelected")}
                      checked={dateSelected === "today" ? true : false}
                    />
                    <Form.Check
                      type="radio"
                      label="I want to pick a date myself"
                      name="startDate"
                      value="choose date"
                      id="startDate2"
                      onChange={handleChange("dateSelected")}
                      checked={dateSelected === "choose date" ? true : false}
                    />
                  </div>
                </Form.Group>
              </fieldset>
              <div
                className={
                  dateSelected === "choose date"
                    ? "amount-date-picker"
                    : "amount-date-disable"
                }
              >
                <DatePicker
                  selected={startDate}
                  onChange={handleDate}
                  name="chooseDate"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="amount-startDate-label">
                <h4>Do you want interest on your savings?</h4>
              </div>
            </div>
            <div className="col-md-12">
              <fieldset>
                <Form.Group>
                  <div className="amount-startDate">
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="interest"
                      value="yes"
                      id="interest1"
                      onChange={handleChange("interest")}
                      checked={interest === "yes" ? true : false}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="interest"
                      value="no"
                      id="interest2"
                      onChange={handleChange("interest")}
                      checked={interest === "no" ? true : false}
                    />
                  </div>
                </Form.Group>
              </fieldset>
            </div>
            <div className="col-md-12"></div>
            <div className="col-md-12">
              <div className="amount-continue">
                <Button
                  onClick={this.continue}
                  disabled={
                    dateSelected === "" || interest === "" ? true : false
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

export default FormSavingAmount;
