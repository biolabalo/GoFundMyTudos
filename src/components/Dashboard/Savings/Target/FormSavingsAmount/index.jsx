import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import moment from "moment";
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
      values: { interest, startDate, selectedCard, debitCards },
      handleChange,
      handleDate,
      handleSourceChange
    } = this.props;

    const today = new Date();

    const formatedToday = moment(today).format("YYYY-MM-DD");
    const formatedDateSelected = moment(startDate).format("YYYY-MM-DD");

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
              <div className="amount-date-picker">
                <DatePicker
                  selected={startDate}
                  onChange={handleDate}
                  minDate={moment().toDate()}
                  name="chooseDate"
                />
              </div>
            </div>
            {formatedToday !== formatedDateSelected && (
              <>
                <div className="col-md-12">
                  <div className="form-three-label">
                    <h4>Add your bank card</h4>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="amount-card">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control
                        as="select"
                        onChange={handleSourceChange}
                        value={selectedCard}
                      >
                        <option value="">Select Card</option>
                        {debitCards.length > 0 &&
                          debitCards.map((card, index) => {
                            return (
                              <option
                                key={index}
                                value={`${card.id}`}
                              >{`${card.first_six}******${card.last_four}`}</option>
                            );
                          })}
                      </Form.Control>
                    </Form.Group>
                    <p>
                      This is where your savings amount will be deducted from
                    </p>
                  </div>
                </div>
              </>
            )}
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
            <div className="col-md-12">
              <div className="amount-continue">
                <Button
                  onClick={this.continue}
                  disabled={
                    // startDate === null || interest === "" ? true : false
                    formatedToday !== formatedDateSelected
                      ? startDate === null ||
                        interest === "" ||
                        selectedCard === ""
                        ? true
                        : false
                      : startDate === null || interest === ""
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

export default FormSavingAmount;
