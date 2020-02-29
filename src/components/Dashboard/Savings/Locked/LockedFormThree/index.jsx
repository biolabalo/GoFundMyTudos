import React from "react";
import moment from "moment";
import { Form, Button } from "react-bootstrap";

import "./lockedFormThree.scss";

const LockedFormThree = props => {
  const {
    handleChange,
    handleSourceChange,
    values: { interest, selectedCard, debitCards, startDate },
    nextStep
  } = props;

  const today = new Date();

  const formatedToday = moment(today).format("YYYY-MM-DD");
  const formatedDateSelected = moment(startDate).format("YYYY-MM-DD");

  return (
    <div className="form-three">
      <Form>
        <div className="row no-gutters">
          {formatedToday !== formatedDateSelected && (
            <>
              <div className="col-md-12">
                <div className="form-three-label">
                  <h4>Add your bank card</h4>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-three-bank">
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
                  <p>This is where your savings amount will be deducted from</p>
                </div>
              </div>
            </>
          )}
          <div className="col-md-12">
            <div className="form-three-label">
              <h4>Do you want interest on your savings?</h4>
            </div>
          </div>
          <div className="col-md-12">
            <fieldset>
              <Form.Group>
                <div className="form-three-interest">
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
            <div className="form-two-continue">
              <Button
                onClick={nextStep}
                disabled={
                  formatedToday !== formatedDateSelected
                    ? interest === "" || selectedCard === ""
                      ? true
                      : false
                    : interest === ""
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

export default LockedFormThree;
