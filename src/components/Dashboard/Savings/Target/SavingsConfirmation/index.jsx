import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import moment from "moment";

import axios from "../../../../../axios-instance";
import payWithPaystack from "../../../../Dashboard/Payment/payStackFunction";

import "./savingsConfirmation.scss";

export class SavingsConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      debitSource: "Add Debit Card",
      cards: [],
      showModal: false
    };
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    this.getCard();
  }

  getCard = async () => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const retrievedCard = await axios.get(`card-details`, config);

      this.setState({
        ...this.state,
        cards: retrievedCard.data.data
      });
    } catch (e) {
      return e.response;
    }
  };

  _handleChange = () => {
    this.setState({
      checked: !this.state.checked,
      showModal: false
    });
  };

  handleSaves = () => {
    this.setState({
      showModal: true
    });
  };

  closeModal = () => e => {
    e.preventDefault();

    this.setState({
      showModal: false
    });
  };

  getNumberOfDays = (frequency, target, saving) => {

    if (frequency === "Daily") {
      const numberOfDays = target / saving;
      const date = new Date();
      const expectedDate = new Date(date);

      expectedDate.setDate(expectedDate.getDate() + numberOfDays);
      return moment(expectedDate).format("DD/MM/YYYY");
    }

    if (frequency === "Weekly") {
      const numberOfDays = (target / saving) * 7;
      const date = new Date();
      const expectedDate = new Date(date);

      expectedDate.setDate(expectedDate.getDate() + numberOfDays);

      return moment(expectedDate).format("DD/MM/YYYY");
    }

    if (frequency === "Monthly") {
      const numberOfDays = (target / saving) * 30;
      const date = new Date();
      const expectedDate = new Date(date);

      expectedDate.setDate(expectedDate.getDate() + numberOfDays);

      return moment(expectedDate).format("DD/MM/YYYY");
    }
  };

  nextSavingDate = (startDate, frequency) => {
    if (frequency === "Daily") {
      const nextDate = new Date(startDate);

      nextDate.setDate(nextDate.getDate() + 1);

      return moment(nextDate).format("DD/MM/YYYY");
    }
    if (frequency === "Weekly") {
      const nextDate = new Date(startDate);

      nextDate.setDate(nextDate.getDate() + 7);

      return moment(nextDate).format("DD/MM/YYYY");
    }
    if (frequency === "Monthly") {
      const nextDate = new Date(startDate);

      nextDate.setDate(nextDate.getDate() + 30);

      return moment(nextDate).format("DD/MM/YYYY");
    }
  };

  handleConfirm = () => {
    if (this.state.debitSource === "Add Debit Card") {
      payWithPaystack();
      return;
    }
  };

  handleSourceChange = e => {
    this.setState({
      debitSource: e.target.value
    });
  };

  render() {
    const { checked, showModal, cards, debitSource } = this.state;

    const { values, handleSave } = this.props;

    const targetAmount = parseFloat(values.targetAmount.replace(",", ""));

    const savingAmount = parseFloat(values.savingAmount.replace(",", ""));

    const expectedDate = this.getNumberOfDays(
      values.frequency,
      targetAmount,
      savingAmount
    );

    return (
      <div className="confirmation">
        <Modal show={showModal} onHide={() => {}} size="lg" centered animation>
          <div className="confirmation-modal">
            <div className="confirmation-modal-header">
              <h3>Debit Source</h3>
            </div>
            <div className="confirmation-modal-body">
              <p>
                You’re about to be debited {values.savingAmount}. Choose where
                you want to be debited from.
              </p>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    as="select"
                    onChange={this.handleSourceChange}
                    value={debitSource}
                  >
                    <option value="Add Debit Card">Add Debit Card</option>
                    {cards.length > 0
                      ? cards.map((card, index) => {
                          return (
                            <option
                              key={index}
                              value={`${card.first_six}** **** ${card.last_four}`}
                            >{`${card.first_six}** **** ${card.last_four}`}</option>
                          );
                        })
                      : null}
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div className="confirmation-modal-footer">
              <button
                className="confirmation-modal-footer-cancel"
                onClick={this.closeModal()}
              >
                Cancel
              </button>
              <button
                className="confirmation-modal-footer-confirm"
                onClick={this.handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
        <div className="row">
          <div className="col-md-12">
            <p>Here’s a summary of your savings plan.</p>
          </div>
          <div className="col-md-12">
            <div className="confirmation-summary">
              <div className="confirmation-summary-card">
                <div className="confirmation-summary-card-header">
                  <p>Savings plan name</p>
                  <h5>{values.goalName}</h5>
                </div>
                <div className="confirmation-summary-card-body">
                  <div className="confirmation-summary-card-body-row">
                    <div className="">
                      <p>Plan Type</p>
                      <h5>Target</h5>
                    </div>
                    <div className="confirmation-summary-card-body-row-right">
                      <p>Start date</p>
                      <h5>
                        {values.dateSelected === "today"
                          ? moment().format("DD/MM/YYYY")
                          : moment(values.startDate).format("DD/MM/YYYY")}
                      </h5>
                    </div>
                  </div>
                  <div className="confirmation-summary-card-body-row">
                    <div className="">
                      <p>Target Amount</p>
                      <h5>N {new Intl.NumberFormat().format(targetAmount)}</h5>
                    </div>
                    <div className="confirmation-summary-card-body-row-right">
                      <p>Expected End Date</p>
                      <h5>{expectedDate}</h5>
                    </div>
                  </div>
                  <div className="confirmation-summary-card-body-row">
                    <div className="">
                      <p>Savings Amount</p>
                      <h5>N {new Intl.NumberFormat().format(savingAmount)}</h5>
                    </div>
                    <div className="confirmation-summary-card-body-row-right">
                      <p>Expected Return</p>
                      <h5>
                        N{" "}
                        {new Intl.NumberFormat().format(
                          0.11 * targetAmount + targetAmount
                        )}
                      </h5>
                    </div>
                  </div>
                  <div className="confirmation-summary-card-body-row">
                    <div className="">
                      <p>Frequency</p>
                      <h5>{values.frequency}</h5>
                    </div>
                    <div className="confirmation-summary-card-body-row-right">
                      <p>Next Saving Date</p>
                      <h5>
                        {this.nextSavingDate(
                          values.startDate,
                          values.frequency
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="confirmation-agree">
              <div className="row no-gutters">
                <div className="col-md-1">
                  <Form>
                    <Form.Check
                      type="checkbox"
                      value={checked}
                      checked={checked}
                      onChange={this._handleChange}
                    ></Form.Check>
                  </Form>
                </div>
                <div className="col-md-11">
                  <p>I accept the terms and conditions of Tudo.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="confirmation-continue">
              <Button onClick={handleSave} disabled={checked ? false : true}>
                Save Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavingsConfirmation;
