import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import Bottombar from "../../../Bottombar";
import useForm from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../../../../axios-instance";
import "./editSavings.scss";

const EditTargetSavings = props => {
  const { savings } = useSelector(state => state.savings);

  const history = window;

  const {
    match: { params: id }
  } = props;

  const { register, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const [formData, setFormData] = useState(
    savings.length
      ? {
        frequency_amount : new Intl.NumberFormat().format(
            savings[0].frequency_amount / 100
          ),
          purpose: savings[0].purpose,
          frequency: savings[0].frequency,
          target_amount: new Intl.NumberFormat().format( savings[0].target_amount / 100)
        }
      : false
  );

  const { frequency_amount, purpose, frequency, target_amount } = formData;

  const handleAmountChange = e => {
    const {
      target: { name, value }
    } = e;

    // attaches ","
    const formatNumber = parseInt(value.replace(/,/g, "")).toLocaleString();
    // validates against other inputs apart from  numbers
    setFormData({
      ...formData,
      [name]: value ? formatNumber.replace(/[^0-9 \,]/, "") : value
    });
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const editTargetPlan = async (data, e) => {
    if (!e) return;
    e.preventDefault();
    if (!data.purpose.trim().length || !frequency_amount || !target_amount)
      return toast.error("Ensure Fields are properly filled", {
        autoClose: 5000,
        hideProgressBar: true
      });

  const newData = {
    ...data, 
    frequency_amount : parseInt(frequency_amount.replace(/,/g, "")) * 100,
    target_amount: parseInt(target_amount.replace(/,/g, "")) * 100
  }

    try {
      const response = await axios.patch(`savings/edit/${id.id}`, newData);
      if (response.status === 200) {
        toast.success("Savings updated successfully", {
          autoClose: 5000,
          hideProgressBar: true
        });
        return props.history.push(`/dashboard/savings/${id.id}/single`);
      }
    } catch (e) {
      toast.error("Failed to Update Savings", {
        autoClose: 5000,
        hideProgressBar: true
      });
    }
  };

  if (!formData) {
    return <Redirect to={`/dashboard/savings/${id.id}/single`} />;
  } else {
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
                  <Link to={`/dashboard/savings/${id.id}/single`}>
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
                        <Form onSubmit={handleSubmit(editTargetPlan)}>
                          <Form.Group controlId="plan.name">
                            <div className="row">
                              <div className="col-md-5">
                                <Form.Label>Plan Name</Form.Label>
                              </div>
                              <div className="col-md-7">
                                <Form.Control
                                  type="text"
                                  value={purpose}
                                  name="purpose"
                                  onChange={e => onChange(e)}
                                  ref={register({ required: true })}
                                  required
                                />
                              </div>
                            </div>
                          </Form.Group>

                          <Form.Group controlId="target.amount">
                            <div className="row">
                              <div className="col-md-5">
                                <Form.Label>Target Amount</Form.Label>
                              </div>
                              <div className="col-md-7">
                                <InputGroup className="mb-3">
                                  <InputGroup.Prepend
                                    style={{ margin: "30px 0" }}
                                  >
                                    <InputGroup.Text id="basic-addon1">
                                      ₦
                                    </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    name="target_amount"
                                    value={target_amount}
                                    onChange={e => handleAmountChange(e)}
                                    onKeyDown={e =>
                                      e.keyCode > 32 &&
                                      (e.keyCode < 48 || e.keyCode > 57) &&
                                      e.preventDefault()
                                    }
                                  />
                                </InputGroup>
                              </div>
                            </div>
                          </Form.Group>

                          <Form.Group controlId="plan.amount">
                            <div className="row">
                              <div className="col-md-5">
                                <Form.Label>Savings Amount</Form.Label>
                              </div>
                              <div className="col-md-7">
                                <InputGroup className="mb-3">
                                  <InputGroup.Prepend
                                    style={{ margin: "30px 0" }}
                                  >
                                    <InputGroup.Text id="basic-addon1">
                                      ₦
                                    </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    name="frequency_amount"
                                    value={frequency_amount}
                                    onChange={e => handleAmountChange(e)}
                                    onKeyDown={e =>
                                      e.keyCode > 32 &&
                                      (e.keyCode < 48 || e.keyCode > 57) &&
                                      e.preventDefault()
                                    }
                                  />
                                </InputGroup>
                              </div>
                            </div>
                          </Form.Group>

                          <Form.Group controlId="withrawal.bank">
                            <div className="row">
                              <div className="col-md-5">
                                <Form.Label>Savings Frequency</Form.Label>
                              </div>
                              <div className="col-md-7">
                                <Form.Control
                                  as="select"
                                  value={frequency ||"WEEKLY"}
                                  name="frequency"
                                  ref={register}
                                  onChange={e => onChange(e)}
                                >
                                  <option value="DAILY">Daily</option>
                                  <option value="WEEKLY" defaultValue>
                                    Weekly
                                  </option>
                                  <option value="MONTHLY">Monthly</option>
                                </Form.Control>
                              </div>
                            </div>
                          </Form.Group>
                          <div className="editSavings-body-content-left-form-save">
                            <button onClick={editTargetPlan}>
                              Save Changes
                            </button>
                          </div>
                        </Form>
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
};

export default EditTargetSavings;
