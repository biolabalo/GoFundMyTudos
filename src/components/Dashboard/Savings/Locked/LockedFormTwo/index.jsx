import React from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./lockedFormTwo.scss";

const LockedFormTwo = props => {
  const {
    handleChange,
    values: { dateSelected, startDate, frequency },
    handleDate,
    nextStep
  } = props;

  return (
    <div className="form-two">
      <Form>
        <div className="row no-gutters">
          <div className="col-md-12">
            <div className="form-two-startDate-label">
              <h4>When do you want to start saving?</h4>
            </div>
          </div>
          <div className="col-md-12">
            <fieldset>
              <Form.Group>
                <div className="form-two-startDate">
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
                  ? "form-two-date-picker"
                  : "form-two-date-disable"
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
            <div className="form-two-startDate-label">
              <h4>When do you want to unlock your savings?</h4>
            </div>
          </div>
          <div className="col-md-12">
            <fieldset>
              <Form.Group>
                <div className="form-two-startDate">
                  <Form.Check
                    type="radio"
                    label="3 months"
                    name="frequency"
                    value="3 months"
                    id="frequency1"
                    onChange={handleChange("frequency")}
                    checked={frequency === "3 months" ? true : false}
                  />
                  <Form.Check
                    type="radio"
                    label="6 months"
                    name="frequency"
                    value="6 months"
                    id="frequency2"
                    onChange={handleChange("frequency")}
                    checked={frequency === "6 months" ? true : false}
                  />
                  <Form.Check
                    type="radio"
                    label="9 months"
                    name="frequency"
                    value="9 months"
                    id="frequency3"
                    onChange={handleChange("frequency")}
                    checked={frequency === "9 months" ? true : false}
                  />
                  <Form.Check
                    type="radio"
                    label="1 year"
                    name="frequency"
                    value="1 year"
                    id="frequency4"
                    onChange={handleChange("frequency")}
                    checked={frequency === "1 year" ? true : false}
                  />
                </div>
              </Form.Group>
            </fieldset>
          </div>
          <div className="col-md-12">
            <div className="form-two-continue">
              <Button
                onClick={nextStep}
                disabled={
                  dateSelected === "" || frequency === "" ? true : false
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

export default LockedFormTwo;
