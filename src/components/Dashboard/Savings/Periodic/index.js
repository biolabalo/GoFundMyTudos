import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import axios from "../../../../axios-instance";
import {
  ProgressBar,
  Form,
  ButtonGroup,
  ToggleButton,
  InputGroup,
  Button
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SubmitButton from "../../../commons/styledComponents/SubmitButton";

import Sidebar from "../../../Sidebar";
import Bottombar from "../../../Bottombar";
import AuthNavBar from "../../../commons/AuthNavBar";
import "../Target/target.scss";

const Periodic = () => {
  const [step, setStep] = useState(1);
  const [savingsName, setSavingsName] = useState("");
  const [savingsNameError, setSavingsNameError] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [checked, setChecked] = useState(false);


  const formatedToday = moment(new Date()).format("YYYY-MM-DD");
  const formatedDateSelected = moment(startDate).format("YYYY-MM-DD");


  const handleAmountChange = e => {
    const {
      target: { value }
    } = e;

    // attaches ","
    const formatNumber = parseInt(value.replace(/,/g, "")).toLocaleString();
    // validates against other inputs apart from  numbers
    setAmount(value ? formatNumber.replace(/[^0-9 \,]/, "") : value);
  };

  const submitPeriodicSavings = async () => {
    const start_amount = parseInt(amount.replace(",", "")) * 100;
    const start_date = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
    const data = {
      purpose: savingsName,
      start_amount,
      start_date,
      frequency: frequency.toUpperCase(),
      frequency_amount: start_amount,
      allow_interest: false
    };
    try {
      const response = await axios.post("/savings/periodic", data);
      const {
        data: {
          status,
          data: { authorization_url }
        }
      } = response;

      if (status === 200) return (window.location = authorization_url);
    } catch (e) {
      return e.response;
    }
  };

  const nextSavingDate = date => {
    if (frequency === "daily") {
      const expectedDate = new Date(date);
      expectedDate.setDate(expectedDate.getDate() + 1);
      return moment(expectedDate).format("DD/MM/YYYY");
    }

    if (frequency === "weekly") {
      const expectedDate = new Date(date);
      expectedDate.setDate(expectedDate.getDate() + 7);
      return moment(expectedDate).format("DD/MM/YYYY");
    }

    if (frequency === "monthly") {
      const expectedDate = new Date(date);
      expectedDate.setDate(expectedDate.getDate() + 30);
      return moment(expectedDate).format("DD/MM/YYYY");
    }
  };

  const nextCheatDate = date => {
    const expectedDate = new Date(date);
    expectedDate.setDate(expectedDate.getDate() + 92);
    return moment(expectedDate).format("DD/MM/YYYY");
  };

  const history = window;
  switch (step) {
    case 1:
      return (
        <div className="target">
          <div className="target-sidebar">
            <Sidebar path={history} />
          </div>
          <div className="target-bottombar">
            <Bottombar path={history} />
          </div>
          <div className="target-body">
            <AuthNavBar />
            <div className="target-body-content">
              <div className="target-body-content-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="row no-gutters">
                <div className="col-md-1">
                  <div className="target-body-content-header">
                    <Link to="/dashboard/savings/plans">
                      <i className="fas fa-chevron-left"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div>
                        <div className="target-body-content-header">
                          <h3>Periodic Savings Settings</h3>
                        </div>
                        <div className="target-body-content-progress">
                          <ProgressBar variant="info" now={10} />
                        </div>
                      </div>
                      <Form
                        className="mt-5"
                        onSubmit={e => {
                          e.preventDefault();
                        }}
                      >
                        <Form.Group controlId="f" className="mt-4 mb-5">
                          <Form.Label>
                            What do you wish to name this plan?
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=""
                            required
                            name="savingsName"
                            value={savingsName}
                            onChange={e => {
                              setSavingsName(e.target.value);
                              if (e.target.value.trim().length)
                                return setSavingsNameError(false);
                            }}
                            onBlur={() => {
                              savingsName.trim().length
                                ? setSavingsNameError(false)
                                : setSavingsNameError(true);
                            }}
                          />
                          <Form.Text className="text-muted">
                            Eg. My {new Date().getFullYear()} Savings, Emergency
                            Funds, Flex Money`
                          </Form.Text>
                          {savingsNameError && (
                            <small className="text-danger">
                              Input your saving plan name
                            </small>
                          )}
                        </Form.Group>

                        <Form.Label>
                          How frequently do you want to save?
                        </Form.Label>

                        <div className="goal-frequency-">
                          <div className="d-flex flex-column">
                            <ButtonGroup toggle className="mt-3 nnjbjb">
                              <ToggleButton
                                variant="outline-primary"
                                type="radio"
                                style={
                                  frequency === "daily"
                                    ? { background: "#007bff", color: "white" }
                                    : { color: "#7594FB", borderRadius: "0px" }
                                }
                                className="mr-2"
                                name="radio"
                                defaultChecked
                                value="daily"
                                onChange={e => setFrequency(e.target.value)}
                              >
                                Daily
                              </ToggleButton>
                              <ToggleButton
                                variant="outline-primary"
                                type="radio"
                                style={
                                  frequency === "weekly"
                                    ? { background: "#007bff", color: "white" }
                                    : { color: "#7594FB", borderRadius: "0px" }
                                }
                                className="mr-2"
                                name="radio"
                                value="weekly"
                                onClick={e => setFrequency(e.target.value)}
                              >
                                Weekly
                              </ToggleButton>
                              <ToggleButton
                                variant="outline-primary"
                                type="radio"
                                name="radio"
                                style={
                                  frequency === "monthly"
                                    ? { background: "#007bff", color: "white" }
                                    : { color: "#7594FB", borderRadius: "0px" }
                                }
                                value="monthly"
                                onClick={e => setFrequency(e.target.value)}
                              >
                                Monthly
                              </ToggleButton>
                            </ButtonGroup>

                            <Form.Text className="text-muted mt-2">
                              How often you want to save money for this plan
                            </Form.Text>
                          </div>
                        </div>

                        <SubmitButton
                          type="button"
                          className="mt-4 mb-4"
                          backgroundColor="#7594FB"
                          borderColor="transparent"
                          boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                          width="150px"
                          Height="45px"
                          opacity={
                            !frequency ||
                            !savingsName.trim().length ||
                            savingsNameError
                              ? "0.5"
                              : "1"
                          }
                          disabled={
                            !frequency ||
                            !savingsName.trim().length ||
                            savingsNameError
                              ? true
                              : false
                          }
                          onClick={() => setStep(2)}
                        >
                          Continue
                        </SubmitButton>
                      </Form>
                    </div>
                    <div className="col-md-4">
                      <div className="target-body-content-right">
                        <img
                          src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="target">
          <div className="target-sidebar">
            <Sidebar path={history} />
          </div>
          <div className="target-bottombar">
            <Bottombar path={history} />
          </div>
          <div className="target-body">
            <AuthNavBar />
            <div className="target-body-content">
              <div className="target-body-content-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="row no-gutters">
                <div className="col-md-1">
                  <div className="target-body-content-header">
                    <div
                      className="target-body-content-header-back"
                      onClick={() => setStep(1)}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div>
                        <div className="target-body-content-header">
                          <h3> Periodic Savings Settings</h3>
                        </div>
                        <div className="target-body-content-progress">
                          <ProgressBar variant="info" now={40} />
                        </div>
                      </div>
                      <Form
                        className="mt-5"
                        onSubmit={e => {
                          e.preventDefault();
                        }}
                      >
                        <Form.Group controlId="f" className="mt-4 mb-5">
                          <Form.Label>
                            How much is your saving amount
                          </Form.Label>
                          <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">
                                ₦
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="text"
                              placeholder=""
                              required
                              name="amount"
                              value={amount}
                              onKeyDown={e =>
                                e.keyCode > 31 &&
                                (e.keyCode < 48 || e.keyCode > 57) &&
                                e.preventDefault()
                              }
                              onChange={e => handleAmountChange(e)}
                              onBlur={() => {
                                amount
                                  ? setAmountError(false)
                                  : setAmountError(true);
                              }}
                            />
                          </InputGroup>
                          <Form.Text className="text-muted">
                            How much you want to save monthly
                          </Form.Text>
                          {amountError && (
                            <small className="text-danger">
                              Input an amount
                            </small>
                          )}
                        </Form.Group>

                        <Form.Label>
                          When do you want to start saving
                        </Form.Label>

                        <div className="goal-frequency-">
                          <div className="d-flex flex-column">
                            <DatePicker
                              className="input-date-picker"
                              selected={startDate}
                              onChange={date => setStartDate(date)}
                              minDate={new Date()}
                              maxDate={new Date()}
                              placeholderText="Select a date"
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
                        // onChange={handleSourceChange}
                        // value={selectedCard}
                      >
                        <option value="">Select Card</option>
                 
                      </Form.Control>
                    </Form.Group>
                    <p>
                      This is where your savings amount will be deducted from
                    </p>
                  </div>
                </div>
              </>
            )}

                        <SubmitButton
                          type="button"
                          className="mt-4 mb-4"
                          backgroundColor="#7594FB"
                          borderColor="transparent"
                          boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                          width="150px"
                          Height="45px"
                          opacity={!amount ? "0.5" : "1"}
                          disabled={!amount ? true : false}
                          onClick={() => setStep(4)}
                        >
                          Continue
                        </SubmitButton>
                      </Form>
                    </div>
                    <div className="col-md-4">
                      <div className="target-body-content-right">
                        <img
                          src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="target">
          <div className="target-sidebar">
            <Sidebar path={history} />
          </div>
          <div className="target-bottombar">
            <Bottombar path={history} />
          </div>
          <div className="target-body">
            <AuthNavBar />
            <div className="target-body-content">
              <div className="target-body-content-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="row no-gutters">
                <div className="col-md-1">
                  <div className="target-body-content-header">
                    <div
                      className="target-body-content-header-back"
                      onClick={() => setStep(2)}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div>
                        <div className="target-body-content-header">
                          <h3>Savings Plan Settings</h3>
                        </div>
                        <div className="target-body-content-progress">
                          <ProgressBar variant="info" now={85} />
                        </div>
                      </div>
                      {/* <FormSavingsAmount
                          nextStep={this.nextStep}
                          handleChange={this.handleChange}
                          handleDate={this.handleDate}
                          values={values}
                        /> */}
                    </div>
                    <div className="col-md-4">
                      <div className="target-body-content-right">
                        <img
                          src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="target">
          <div className="target-sidebar">
            <Sidebar path={history} />
          </div>
          <div className="target-bottombar">
            <Bottombar path={history} />
          </div>
          <div className="target-body">
            <AuthNavBar />
            <div className="target-body-content">
              <div className="target-body-content-image">
                <img
                  src="https://res.cloudinary.com/xerdetech/image/upload/v1578569982/vio5acs2vooqutflzcsp.png"
                  alt=""
                />
              </div>
              <div className="row no-gutters">
                <div className="col-md-1">
                  <div className="target-body-content-header">
                    <div
                      className="target-body-content-header-back"
                      onClick={() => setStep(2)}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div className="target-body-content-header">
                        <h3>Savings Plan Settings</h3>
                      </div>
                      <div className="target-body-content-progress">
                        <ProgressBar variant="info" now={100} />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <p>Here’s a summary of your savings plan.</p>
                        </div>
                        <div className="col-md-12">
                          <div className="confirmation-summary">
                            <div className="confirmation-summary-card">
                              <div className="confirmation-summary-card-header">
                                <p>Savings plan name</p>
                                <h5>{savingsName}</h5>
                              </div>
                              <div className="confirmation-summary-card-body">
                                <div className="confirmation-summary-card-body-row">
                                  <div className="">
                                    <p>Plan Type</p>
                                    <h5>Periodic</h5>
                                  </div>
                                  <div className="confirmation-summary-card-body-row-right">
                                    <p>Start date</p>
                                    <h5>
                                      {moment(startDate).format("DD/MM/YYYY")}
                                    </h5>
                                  </div>
                                </div>
                                {/* <div className="confirmation-summary-card-body-row">
                    <div className="">
                      <p>Target Amount</p>
                      <h5>N {amount}</h5>
                    </div>
                    <div className="confirmation-summary-card-body-row-right">
                      <p>Expected End Date</p>
                      <h5>{expectedDate}</h5>
                    </div>
                  </div> */}
                                <div className="confirmation-summary-card-body-row">
                                  <div className="">
                                    <p>Savings Amount</p>
                                    <h5>N {amount}</h5>
                                  </div>
                                  <div className="confirmation-summary-card-body-row-right">
                                    <p>Next Saving Date</p>
                                    <h5>N {nextSavingDate(startDate)}</h5>
                                  </div>
                                </div>
                                <div className="confirmation-summary-card-body-row">
                                  <div className="">
                                    <p>Frequency</p>
                                    <h5>{frequency}</h5>
                                  </div>
                                  <div className="confirmation-summary-card-body-row-right">
                                    <p>Next Cheat Date</p>
                                    <h5>{nextCheatDate(startDate)}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="confirmation-continue">
                            <Button
                              onClick={() => submitPeriodicSavings()}
                              disabled={checked ? false : true}
                            >
                              Save Now
                            </Button>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-1">
                              <Form>
                                <Form.Check
                                  type="checkbox"
                                  value={checked}
                                  checked={checked}
                                  onChange={() =>
                                    setChecked(current => !current)
                                  }
                                ></Form.Check>
                              </Form>
                            </div>
                            <div className="col-md-11">
                              <p>
                                I hereby agree to this: “For every time I
                                withdraw funds from this Periodic plan before
                                the expected end date I will be charged a
                                penalty fee of 5% of the amount withdrawn.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="target-body-content-right">
                        <img
                          src="https://res.cloudinary.com/xerdetech/image/upload/v1578490055/i7mc8cgmyjr13klivzun.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      break;
  }
};

export default Periodic;
