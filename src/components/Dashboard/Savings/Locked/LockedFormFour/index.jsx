import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";

import payWithPaystack from "../../../../Dashboard/Payment/payStackFunction";

import "./lockedFormFour.scss";

class LockedFormFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      debitSource: "Add Debit Card",
      cards: [],
      showModal: false
    };
  }

  getUnlockDate = frequency => {
    const date = new Date();
    const expectedDate = new Date(date);

    if (frequency === "3 months") {
      expectedDate.setDate(expectedDate.getDate() + 90);
      return moment(expectedDate).format("DD/MM/YYYY");
    }

    if (frequency === "6 months") {
      expectedDate.setDate(expectedDate.getDate() + 180);
      return moment(expectedDate).format("DD/MM/YYYY");
    }

    if (frequency === "9 months") {
      expectedDate.setDate(expectedDate.getDate() + 270);
      return moment(expectedDate).format("DD/MM/YYYY");
    }

    expectedDate.setDate(expectedDate.getDate() + 365);
    return moment(expectedDate).format("DD/MM/YYYY");
  };

  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  handleConfirm = () => {
    if (this.state.debitSource === "Add Debit Card") {
      payWithPaystack();
      return;
    }
  };

  closeModal = () => e => {
    e.preventDefault();

    this.setState({
      showModal: false
    });
  };

  handleSourceChange = e => {
    this.setState({
      debitSource: e.target.value
    });
  };

  handleSave = () => {
    this.setState({
      showModal: true
    });
  };

  render() {
    const {
      values: { goalName, lockedAmount, dateSelected, startDate, frequency },
      handleSave
    } = this.props;

    const { checked, debitSource, cards, showModal } = this.state;

    const amount = parseInt(lockedAmount.replace(/,/g, ""));

    return (
      <div className="form-four">
        <Modal show={showModal} onHide={() => {}} size="lg" centered animation>
          <div className="confirmation-modal">
            <div className="confirmation-modal-header">
              <h3>Debit Source</h3>
            </div>
            <div className="confirmation-modal-body">
              <p>
                You’re about to be debited {lockedAmount}. Choose where you want
                to be debited from.
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
            <p>Confirm your savings plan settings</p>
            <div className="form-four-summary">
              <div className="form-four-summary-header">
                <h5>Savings plan name</h5>
                <p>{goalName}</p>
              </div>
              <div className="form-four-summary-body">
                <div className="form-four-summary-body-row">
                  <div className="form-four-summary-body-row-left">
                    <h6>Plan Type</h6>
                    <p>Locked</p>
                  </div>
                  <div className="form-four-summary-body-row-right">
                    <h6>Start Date</h6>
                    <p>
                      {dateSelected === "today"
                        ? moment().format("DD/MM/YYYY")
                        : moment(startDate).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
                <div className="form-four-summary-body-row">
                  <div className="form-four-summary-body-row-left">
                    <h6>Locked Savings</h6>
                    <p>N {new Intl.NumberFormat().format(amount)}</p>
                  </div>
                  <div className="form-four-summary-body-row-right">
                    <h6>Savings Unlock Date</h6>
                    <p>{this.getUnlockDate(frequency)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-four-agree">
              <div className="row no-gutters">
                <div className="col-md-1">
                  <Form>
                    <Form.Check
                      type="checkbox"
                      value={checked}
                      checked={checked}
                      onChange={this.handleChange}
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
            <div className="form-two-continue">
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

export default LockedFormFour;
