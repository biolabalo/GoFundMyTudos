import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";
import Bottombar from "../../../Bottombar";

import "./editSavings.scss";

const EditSavings = props => {
  const history = window;

  const {
    match: { params: id }
  } = props;

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
                      <Form>
                        <Form.Group controlId="plan.name">
                          <div className="row">
                            <div className="col-md-5">
                              <Form.Label>Plan Name</Form.Label>
                            </div>
                            <div className="col-md-7">
                              <Form.Control type="text" />
                            </div>
                          </div>
                        </Form.Group>
                        <Form.Group controlId="withrawal.bank">
                          <div className="row">
                            <div className="col-md-5">
                              <Form.Label>Withdraw To</Form.Label>
                            </div>
                            <div className="col-md-7">
                              <Form.Control as="select">
                                <option value="">Select Bank</option>
                              </Form.Control>
                            </div>
                          </div>
                        </Form.Group>
                      </Form>
                      <div className="editSavings-body-content-left-form-save">
                        <button>Save Changes</button>
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
};

export default EditSavings;
