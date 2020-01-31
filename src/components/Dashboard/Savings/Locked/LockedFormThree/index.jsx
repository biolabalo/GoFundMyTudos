import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import axios from "../../../../../axios-instance";

import "./lockedFormThree.scss";

const LockedFormThree = props => {
  const [banks, setbanks] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("TUDU_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const retrievedBank = await axios.get(`bank-details`, config);

        setbanks(retrievedBank.data.data);
      } catch (e) {
        return e.response;
      }
    })();
  }, []);

  const {
    handleChange,
    handleSourceChange,
    values: { bankAccount, interest },
    nextStep
  } = props;

  return (
    <div className="form-three">
      <Form>
        <div className="row no-gutters">
          <div className="col-md-12">
            <div className="form-three-label">
              <h4>Add your bank account</h4>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-three-bank">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  onChange={handleSourceChange}
                  value={bankAccount}
                >
                  <option value="">Select Bank</option>
                  {banks.length > 0 &&
                    banks.map((bank, index) => {
                      return (
                        <option
                          key={index}
                          value={`${bank.account_number}`}
                        >{`${bank.account_number} - ${bank.bank_name} (${bank.account_name})`}</option>
                      );
                    })}
                  <option value="Add Bank">Add Bank</option>
                </Form.Control>
              </Form.Group>
              <p>
                This is where your savings will be sent to when it is unlocked
              </p>
            </div>
          </div>
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
                disabled={interest === "" ? true : false}
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
