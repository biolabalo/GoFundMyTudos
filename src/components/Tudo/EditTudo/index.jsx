import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// react-bootstrap
import { Spinner, Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import AuthNavBar from "../../commons/AuthNavBar";
import Sidebar from "../../Sidebar";
import Bottombar from "../../Bottombar";

import axios from "../../../axios-instance";

import "./editTudo.scss";

const EditTudo = () => {
  const [goalName, setGoalName] = useState("");
  const [initialGoalName, setInitialGoalName] = useState("");
  const [contributions, setContributions] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { tudoid } = useParams();
  const history = useHistory();

  useEffect(() => {
    setFetching(true);
    axios
      .get(`tudo/${tudoid}`)
      .then(({ data }) => {
        setFetching(false);
        const { goal_name, contributions } = data.data;
        setInitialGoalName(goal_name);
        setGoalName(goal_name);
        setContributions(contributions);
      })
      .catch(err => {
        // handle error here
        setFetching(false);
        const { status } = err.response;
        if (status === 404) return history.push("/dashboard"); // go home
      });
  }, [history, tudoid]);

  const hideDeleteConfirmation = () => setShowDeleteConfirmation(false);

  const deleteGoal = () => {
    setDeleting(true);
    hideDeleteConfirmation();
    axios
      .delete(`/tudo/${tudoid}`)
      .then(() => {
        toast.success("Tudo has been deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setDeleting(false);
        history.push("/dashboard/tudo");
      })
      .catch(() => {
        setDeleting(false);
        toast.error("Error deleting tudo", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  };

  const updateGoal = evt => {
    evt.preventDefault();
    setUpdating(true);
    axios
      .patch(`/tudo/${tudoid}`, { goal_name: goalName })
      .then(() => {
        toast.success("Tudo updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setUpdating(false);
        history.push(`/dashboard/tudo-single/${tudoid}`);
      })
      .catch(() => {
        // debug
        setUpdating(false);
        toast.error("Error occured while editing tudo", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  };

  return (
    <div className="edit-tudo">
      <div className="single-tudo-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="single-tudo-bottombar">
        <Bottombar path={history} />
      </div>
      <div className="edit-tudo-body">
        <AuthNavBar />

        <div className="edit-tudo-body-content">
          {fetching && (
            <div className="spinner">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {!fetching && (
            <div className="row">
              <div className="col-md-1">
                <div className="single-tudo-body-content-back">
                  <Link to={`/dashboard/tudo-single/${tudoid}`}>
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-11 col-lg-8">
                <section className="edit-goal">
                  <header className="page-header">
                    <h3 className="page-header-title">Edit Goal</h3>
                    <p className="page-header-summary">
                      Make changes to your goal
                    </p>
                  </header>

                  <Form onSubmit={updateGoal}>
                    <Form.Group as={Row} controlId="goalName">
                      <Form.Label column md={4}>
                        Goal Name
                      </Form.Label>
                      <Col md={8}>
                        <Form.Control
                          type="text"
                          placeholder="Goal name"
                          name="goalName"
                          value={goalName}
                          onChange={evt => setGoalName(evt.target.value)}
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Row bsPrefix="row form-submit">
                      <Col md={{ offset: 8, span: 4 }}>
                        <Button
                          type="submit"
                          block
                          disabled={
                            updating ||
                            !goalName ||
                            goalName.toLowerCase() ===
                              initialGoalName.toLowerCase()
                          }
                        >
                          {!updating && <span>Save Changes</span>}
                          {updating && (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </section>
                {contributions === 0 && (
                  <>
                    <hr />
                    <section className="danger-zone">
                      <Row bsPrefix="row align-items-center">
                        <Col xs={6} md={8}>
                          <label className="form-label">Delete Goal</label>
                        </Col>
                        <Col xs={6} md={4}>
                          <Button
                            variant="danger"
                            type="button"
                            onClick={() => setShowDeleteConfirmation(true)}
                            block
                          >
                            {deleting ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <span>Delete Goal</span>
                            )}
                          </Button>
                        </Col>
                      </Row>
                    </section>
                  </>
                )}
              </div>
            </div>
          )}

          {showDeleteConfirmation && (
            <Modal
              animation={false}
              show={showDeleteConfirmation}
              centered
              dialogClassName="delete-confirmation"
              onHide={hideDeleteConfirmation}
            >
              <Modal.Header>
                <h3 className="modal-title">
                  Are you sure you want to delete this Goal?
                </h3>
              </Modal.Header>
              <Modal.Body>
                <p>This operation cannot be undone!</p>
                <div className="delete-cta">
                  <button
                    className="reject btn"
                    onClick={hideDeleteConfirmation}
                  >
                    Cancel
                  </button>
                  <button className="accept btn" onClick={deleteGoal}>
                    Delete
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTudo;
