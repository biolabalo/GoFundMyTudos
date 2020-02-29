import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import axios from "../../../../axios-instance";
import { getSavings } from "../../../../redux/savings/action";
import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import Bottombar from "../../../Bottombar";

import "./editSavings.scss";

class EditLockedSavings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      goalName: "",
      targetAmount: "",
      interest: ""
    };
  }

  componentDidMount() {
    const buffer = {
      purpose: "xsdcvbghj",
      target_amount: 0,
      allow_interest: "",
      updating: false
    };

    const { purpose, target_amount, allow_interest } = this.props.savings
      .savings[0]
      ? this.props.savings.savings[0]
      : buffer;

    const {
      match: { params: id }
    } = this.props;

    purpose === "xsdcvbghj"
      ? this.props.history.push(`/dashboard/savings/${id.id}/single`)
      : this.setState({
          id: id.id,
          goalName: purpose,
          targetAmount:
            target_amount > 0
              ? new Intl.NumberFormat().format(target_amount / 100)
              : 0,
          interest: allow_interest ? "yes" : "no"
        });
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleAmountChange = input => e => {
    const { value } = e.target;

    const formatedValue = value ? value.replace(/[^0-9]/, "") : "";

    const integerValue = formatedValue
      ? parseInt(formatedValue.replace(/,/g, "")).toLocaleString()
      : "";

    this.setState({
      [input]: integerValue
    });
  };

  handleSave = async () => {
    const { id, goalName, targetAmount, interest } = this.state;
    const token = localStorage.getItem("TUDU_token");
    const url = `savings/edit/${id}`;
    const redirectUrl = `/dashboard/savings/${id}/single`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    const data = JSON.stringify({
      purpose: goalName,
      target_amount: parseInt(targetAmount.replace(/,/g, "")) * 100,
      allow_interest: interest === "yes" ? true : false
    });

    this.setState({
      updating: true
    });

    try {
      await axios.patch(url, data, config);

      this.setState({
        updating: false
      });

      this.props.getSavings(id);

      toast.success("Savings updated successfully", {
        autoClose: 5000,
        hideProgressBar: true
      });

      this.props.history.push(redirectUrl);
    } catch (e) {
      return e.response;
    }
  };

  render() {
    const history = window;

    const { id, goalName, targetAmount, interest, updating } = this.state;

    return (
      <div className="editSavings">
        <div className="editSavings-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="editSavings-bottombar">
          <Bottombar path={history} />
        </div>
        <div className="editSavings-body">
          <AuthNavBar />
          <div className="editSavings-body-content">
            <div className="row no-gutters">
              <div className="col-md-1">
                <div className="editSavings-body-content-back">
                  <Link to={`/dashboard/savings/${id}/single`}>
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-11">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <h2>Edit Plan</h2>
                  </div>
                  <div className="col-md-12">
                    <div className="editSavings-body-content-left">
                      <p>Make changes to your goal settings</p>
                      <div className="editSavings-body-content-left-form">
                        <Form>
                          <Form.Group controlId="plan.name">
                            <div className="row">
                              <div className="col-md-5">
                                <Form.Label>Plan Name</Form.Label>
                              </div>
                              <div className="col-md-7">
                                <Form.Control
                                  type="text"
                                  value={goalName}
                                  onChange={this.handleChange("goalName")}
                                />
                              </div>
                            </div>
                          </Form.Group>
                          <Form.Group controlId="locked.amount">
                            <div className="row">
                              <div className="col-md-5">
                                <Form.Label>Locked Amount</Form.Label>
                              </div>
                              <div className="col-md-7">
                                <Form.Control
                                  type="text"
                                  value={targetAmount}
                                  onChange={this.handleAmountChange(
                                    "targetAmount"
                                  )}
                                />
                              </div>
                            </div>
                          </Form.Group>
                          <Form.Group>
                            <div className="row">
                              <div className="col-md-5">
                                <Form.Label>
                                  Do you want interest on your savings?
                                </Form.Label>
                              </div>
                              <div className="col-md-7">
                                <div className="editSavings-body-content-left-form-interest">
                                  <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="interest"
                                    value="yes"
                                    id="interest1"
                                    onChange={this.handleChange("interest")}
                                    checked={interest === "yes" ? true : false}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="No"
                                    name="interest"
                                    value="no"
                                    id="interest2"
                                    onChange={this.handleChange("interest")}
                                    checked={interest === "no" ? true : false}
                                  />
                                </div>
                              </div>
                            </div>
                          </Form.Group>
                        </Form>
                        <div className="editSavings-body-content-left-form-save">
                          <button onClick={this.handleSave}>
                            {updating ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="editSavings-body-content-left-form-delete">
                        <div className="row">
                          <div className="col-md-5">
                            <p className="form-label">Delete Plan</p>
                          </div>
                          <div className="col-md-7">
                            <button>Delete Plan</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ savings }) => {
  return {
    savings
  };
};

const mapDispatchToProps = dispatch => ({
  getSavings: id => {
    dispatch(getSavings(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLockedSavings);
