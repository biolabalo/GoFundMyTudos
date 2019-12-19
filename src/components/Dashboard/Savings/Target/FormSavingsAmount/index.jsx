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
    const { values, handleChange, handleDate } = this.props;

    return (
      <div className="amount">
        <Form>
          <div className="row">
            <div className="col-md-4">
              <h1>How much do you wish to save?</h1>
            </div>
            <div className="col-md-8">
              <div className="amount-save">
                <Form.Group controlId="formAmount">
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    required
                    onChange={handleChange("amount")}
                    value={values.amount}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="col-md-4">
              <div className="amount-startDate-label">
                <h1>When do you want to start saving?</h1>
              </div>
            </div>
            <div className="col-md-8">
              <fieldset>
                <Form.Group>
                  <div className="amount-startDate">
                    <Form.Check
                      type="radio"
                      label="I will start saving today"
                      name="startDate"
                      value="today"
                      id="startDate1"
                      onChange={handleChange("dateSelected")}
                      checked={values.dateSelected === "today" ? true : false}
                    />
                    <Form.Check
                      type="radio"
                      label="I want to choose when to start"
                      name="startDate"
                      value="choose date"
                      id="startDate2"
                      onChange={handleChange("dateSelected")}
                      checked={
                        values.dateSelected === "choose date" ? true : false
                      }
                    />
                  </div>
                </Form.Group>
              </fieldset>
              <div
                className={
                  values.dateSelected === "choose date"
                    ? "amount-date-picker"
                    : "amount-date-disable"
                }
              >
                <DatePicker
                  selected={values.startDate}
                  onChange={handleDate}
                  name="chooseDate"
                />
              </div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="amount-continue">
                <Button
                  onClick={this.continue}
                  disabled={values.dateSelected ? false : true}
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
