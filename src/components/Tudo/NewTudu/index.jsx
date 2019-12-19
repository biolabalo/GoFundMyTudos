/* eslint-disable no-empty */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  ProgressBar,
  InputGroup,
  Modal,
  Spinner
} from "react-bootstrap";

import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";

import "./newTudu.scss";

export class NewTudu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      tudoList: {
        phone: "",
        laptop: "",
        vacation: "",
        car: "",
        school: "",
        house: "",
        event: "",
        gift: "",
        shoes: "",
        added: ""
      },
      tudos: [
        "phone",
        "laptop",
        "vacation",
        "car",
        "school",
        "house",
        "event",
        "gift",
        "shoes",
        "added"
      ],
      tudosPair: {
        phone: "New Phone",
        laptop: "A Laptop",
        vacation: "A Vacation",
        car: "Dream Car",
        school: "School Fees",
        house: "House Rent",
        event: "An Event",
        gift: "Xmas Gift",
        shoes: "New Shoes",
        added: ""
      },
      tudosAmount: {
        phone: "",
        laptop: "",
        vacation: "",
        car: "",
        school: "",
        house: "",
        event: "",
        gift: "",
        shoes: "",
        added: ""
      },
      tudosDuration: {
        phone: "30 Days",
        laptop: "30 Days",
        vacation: "30 Days",
        car: "30 Days",
        school: "30 Days",
        house: "30 Days",
        event: "30 Days",
        gift: "30 Days",
        shoes: "30 Days",
        added: "30 Days"
      },
      tudosError: {
        phone: "",
        laptop: "",
        vacation: "",
        car: "",
        school: "",
        house: "",
        event: "",
        gift: "",
        shoes: "",
        added: ""
      },
      othersValue: "",
      showAdd: false,
      duration: ""
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      othersValue: value
    });
  };

  digitChecker = name => e => {
    e.preventDefault();
    const partern = /[^0-9]/g;
    const amount = this.state.tudosAmount[name];

    if (amount.match(partern) || amount === "" || parseInt(amount) < 1000) {
      return this.setState({
        tudosError: {
          ...this.state.tudosError,
          [name]: "Invalid amount entered"
        }
      });
    }

    return this.setState({
      tudosError: {
        ...this.state.tudosError,
        [name]: ""
      }
    });
  };

  amountHandleChange = name => e => {
    const {
      target: { value }
    } = e;

    this.setState({
      tudosAmount: {
        ...this.state.tudosAmount,
        [name]: value
      }
    });
  };

  buttonClickHandler = input => e => {
    if (this.state.tudoList[input]) {
      return this.setState({
        tudoList: {
          ...this.state.tudoList,
          [input]: ""
        }
      });
    }

    return this.setState({
      tudoList: {
        ...this.state.tudoList,
        [input]: e.target.value
      }
    });
  };

  durationClickHandler = input => e => {
    return this.setState({
      tudosDuration: {
        ...this.state.tudosDuration,
        [input]: e.target.value
      }
    });
  };

  addGoalHandler = () => {
    return this.setState({
      tudosPair: {
        ...this.state.tudosPair,
        added: this.state.othersValue
      },
      tudos: [...this.state.tudos, this.state.othersValue],
      tudoList: {
        ...this.state.tudoList,
        added: ""
      }
    });
  };

  isValueEmpty = list => {
    const tudos = list;
    const tudoValues = Object.values(tudos);

    for (let i = 0; i < tudoValues.length; i++) {
      if (tudoValues[i] !== "") {
        return false;
      }
    }

    return true;
  };

  doneClickHandler = () => {
    const tudoArray = [];
    const { tudoList, tudosPair, tudosAmount, tudosDuration } = this.state;
    const tudos = this.state.tudos;

    tudos.map(tudo => {
      const amountInKobo = parseInt(tudosAmount[tudo]) * 100;
      return (
        tudoList[tudo] &&
        tudoArray.push({
          goal_name: tudosPair[tudo],
          amount: amountInKobo,
          tudo_duration: tudosDuration[tudo],
          allow_interest: true
        })
      );
    });

    this.props.createTudo(tudoArray);
  };

  toggleOders = () => {
    this.setState({
      showAdd: !this.state.showAdd
    });
  };

  toggleModal = () => {
    this.props.closeModal();
    this.props.history.push("/dashboard/tudo");
  };

  render() {
    const history = window;
    const {
      step,
      tudos,
      tudosPair,
      tudoList,
      tudosAmount,
      tudosDuration,
      othersValue,
      tudosError,
      showAdd
    } = this.state;

    switch (step) {
      case 1:
        return (
          <div className="new-tudu">
            <div className="new-tudu-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>
            <div className="new-tudu-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="new-tudu-body">
              <AuthNavBar />
              <div className="new-tudu-body-content">
                <div className="new-tudu-body-content-row">
                  <div className="row">
                    <div className="col-md-1">
                      <div className="new-tudu-body-content-header">
                        <Link to="/dashboard/tudo">
                          <i className="fas fa-chevron-left"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="new-tudu-body-content-list">
                        <div className="new-tudu-body-content-progress">
                          <h3>Create your Tudo List</h3>
                          <ProgressBar variant="info" now={25} />
                          <p>
                            Select as many of the goals below that fit into your
                            to-do list or just create your own goals .
                          </p>
                        </div>
                      </div>
                      <div className="new-tudu-body-content-todos">
                        {tudos.map((tudo, index) => {
                          return tudosPair[tudo] ? (
                            <Button
                              key={index}
                              className={this.state.tudoList[tudo] && "active"}
                              onClick={this.buttonClickHandler(tudo)}
                              type="button"
                              value={tudosPair[tudo]}
                              variant="outline-secondary"
                            >
                              {tudosPair[tudo]}
                            </Button>
                          ) : (
                            ""
                          );
                        })}
                        <Button
                          className={this.state.tudoList["others"] && "active"}
                          onClick={this.toggleOders}
                          type="button"
                          value="Others"
                          variant="outline-secondary"
                        >
                          Others
                        </Button>
                        <div
                          className={
                            showAdd
                              ? "new-tudu-body-content-todos-others"
                              : "new-tudu-body-content-todos-others-none"
                          }
                        >
                          <Form>
                            <Form.Group controlId="added">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter goal name"
                                  onChange={this.handleChange}
                                  name="added"
                                  value={othersValue}
                                />
                                <InputGroup.Append>
                                  <Button onClick={this.addGoalHandler}>
                                    Add Goal
                                  </Button>
                                </InputGroup.Append>
                              </InputGroup>
                            </Form.Group>
                          </Form>
                        </div>
                      </div>
                      <div className="new-tudu-body-content-continue">
                        <Button
                          disabled={this.isValueEmpty(tudoList) ? true : false}
                          type="button"
                          value="continue"
                          onClick={this.nextStep}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="new-tudu-body-content-image">
                        <div
                          className="new-tudu-body-content-image-list"
                          style={
                            tudos.length < 4
                              ? { overflow: "hidden" }
                              : { overflowY: "scroll" }
                          }
                        >
                          {tudos.map((tudo, index) => {
                            return (
                              tudoList[tudo] && (
                                <div
                                  key={index}
                                  className="new-tudu-body-content-image-list-item"
                                >
                                  <div className="new-tudu-body-content-image-list-item-check"></div>
                                  <p>{tudoList[tudo]}</p>
                                </div>
                              )
                            );
                          })}
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
          <div className="new-tudu">
            <div className="new-tudu-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>
            <div className="new-tudu-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="new-tudu-body">
              <AuthNavBar />
              <div className="new-tudu-body-content">
                <div className="new-tudu-body-content-row">
                  <div className="row">
                    <div className="col-md-1">
                      <div className="new-tudu-body-content-header">
                        <div
                          className="target-body-content-header-back"
                          onClick={this.prevStep}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="new-tudu-body-content-list">
                        <div className="new-tudu-body-content-progress">
                          <h3>Set Your Goal Amount </h3>
                          <ProgressBar variant="info" now={50} />
                          <p>
                            Set a goal amount you’ll need to achieve for each of
                            the goals on your Tudo list.
                          </p>
                        </div>
                      </div>
                      <div className="new-tudu-body-content-form">
                        <Form>
                          {tudos.map((tudo, index) => {
                            return (
                              tudoList[tudo] && (
                                <Form.Group controlId={tudo} key={index}>
                                  <div className="new-tudu-body-content-form-group">
                                    <Form.Label>{tudosPair[tudo]}</Form.Label>
                                    <div className="new-tudu-body-content-form-group-input">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text id="inputGroupPrepend">
                                            N
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          type="text"
                                          name={tudo}
                                          value={tudosAmount[tudo]}
                                          onChange={this.amountHandleChange(
                                            tudo
                                          )}
                                          onKeyUp={this.digitChecker(tudo)}
                                          onMouseLeave={this.digitChecker(tudo)}
                                          required
                                        />
                                      </InputGroup>
                                      <Form.Text className="text-muted">
                                        Enter goal amount in Naira. Minimum
                                        amount is N1,000
                                      </Form.Text>
                                      <Form.Text className="new-tudu-body-content-form-group-input-error">
                                        {this.state.tudosError[tudo]}
                                      </Form.Text>
                                    </div>
                                  </div>
                                </Form.Group>
                              )
                            );
                          })}
                        </Form>
                      </div>
                      <div className="new-tudu-body-content-continue">
                        <Button
                          disabled={
                            this.isValueEmpty(tudosAmount) ||
                            !this.isValueEmpty(tudosError)
                              ? true
                              : false
                          }
                          type="button"
                          value="continue"
                          onClick={this.nextStep}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="new-tudu-body-content-image">
                        <div
                          className="new-tudu-body-content-image-list"
                          style={
                            tudos.length < 4
                              ? { overflow: "hidden" }
                              : { overflowY: "scroll" }
                          }
                        >
                          {tudos.map((tudo, index) => {
                            return tudo === "others"
                              ? null
                              : tudoList[tudo] && (
                                  <div
                                    key={index}
                                    className="new-tudu-body-content-image-list-item"
                                  >
                                    <div className="new-tudu-body-content-image-list-item-check"></div>
                                    <p>{tudoList[tudo]}</p>
                                  </div>
                                );
                          })}
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
          <div className="new-tudu">
            <div className="new-tudu-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>
            <div className="new-tudu-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="new-tudu-body">
              <AuthNavBar />
              <div className="new-tudu-body-content">
                <div className="new-tudu-body-content-row">
                  <div className="row">
                    <div className="col-md-1">
                      <div className="new-tudu-body-content-header">
                        <div
                          className="target-body-content-header-back"
                          onClick={this.prevStep}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="new-tudu-body-content-list">
                        <div className="new-tudu-body-content-progress">
                          <h3>Set Your Goal Duration</h3>
                          <ProgressBar variant="info" now={75} />
                          <p>Set a time-frame for you to achieve this goal</p>
                        </div>
                      </div>
                      <div className="new-tudu-body-content-duration">
                        {tudos.map((tudo, index) => {
                          return (
                            tudoList[tudo] && (
                              <div
                                key={index}
                                className="new-tudu-body-content-duration-list"
                              >
                                <div className="new-tudu-body-content-duration-list-label">
                                  <p>{tudoList[tudo]}</p>
                                </div>
                                <div className="new-tudu-body-content-duration-list-buttons">
                                  <Button
                                    className={
                                      tudosDuration[tudo] === "30 Days" &&
                                      "active"
                                    }
                                    onClick={this.durationClickHandler(tudo)}
                                    variant="outline-secondary"
                                    value="30 Days"
                                  >
                                    30 Days
                                  </Button>
                                  <Button
                                    className={
                                      tudosDuration[tudo] === "60 Days" &&
                                      "active"
                                    }
                                    onClick={this.durationClickHandler(tudo)}
                                    variant="outline-secondary"
                                    value="60 Days"
                                  >
                                    60 Days
                                  </Button>
                                  <Button
                                    className={
                                      tudosDuration[tudo] === "90 Days" &&
                                      "active"
                                    }
                                    onClick={this.durationClickHandler(tudo)}
                                    variant="outline-secondary"
                                    value="90 Days"
                                  >
                                    90 Days
                                  </Button>
                                </div>
                              </div>
                            )
                          );
                        })}
                      </div>
                      <div className="new-tudu-body-content-continue">
                        <Button
                          disabled={
                            this.isValueEmpty(tudosDuration) ? true : false
                          }
                          type="button"
                          value="continue"
                          onClick={this.nextStep}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="new-tudu-body-content-image">
                        <div
                          className="new-tudu-body-content-image-list"
                          style={
                            tudos.length < 4
                              ? { overflow: "hidden" }
                              : { overflowY: "scroll" }
                          }
                        >
                          {tudos.map((tudo, index) => {
                            return tudo === "others"
                              ? null
                              : tudoList[tudo] && (
                                  <div
                                    key={index}
                                    className="new-tudu-body-content-image-list-item"
                                  >
                                    <div className="new-tudu-body-content-image-list-item-check"></div>
                                    <p>{tudoList[tudo]}</p>
                                  </div>
                                );
                          })}
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
          <div className="new-tudu">
            {this.props.data.tudo.isCreated && (
              <Modal show={true} onHide={() => {}} size="lg" centered animation>
                <div className="new-tudu-modal">
                  <div className="new-tudu-modal-image">
                    <img
                      src="https://res.cloudinary.com/xerdetech/image/upload/v1575407261/girl_sjomgp.png"
                      alt=""
                    />
                  </div>
                  <div className="new-tudu-modal-body">
                    <h3>Awesome!</h3>
                    <p>
                      You’ve successfully created your tudo list. Now head over
                      to “My Tudo” to start sharing the goals on your tudo list.
                    </p>
                    <p>
                      <span>Goodluck smashing those goals!</span>
                    </p>
                    <button onClick={this.toggleModal}>Go to My Tudo</button>
                  </div>
                </div>
              </Modal>
            )}
            <div className="new-tudu-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>
            <div className="new-tudu-sidebar">
              <Sidebar path={history} />
            </div>
            <div className="new-tudu-body">
              <AuthNavBar />
              <div className="new-tudu-body-content">
                <div className="new-tudu-body-content-row">
                  <div className="row">
                    <div className="col-md-1">
                      <div className="new-tudu-body-content-header">
                        <div
                          className="target-body-content-header-back"
                          onClick={this.prevStep}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="new-tudu-body-content-list">
                        <div className="new-tudu-body-content-progress">
                          <h3>Tudo List Summary</h3>
                          <ProgressBar variant="info" now={100} />
                          <p>
                            Look through your tudo list and confirm if you are
                            good to go
                          </p>
                        </div>
                      </div>
                      <div className="new-tudu-body-content-summary">
                        <div className="new-tudu-body-content-summary-card">
                          <div className="new-tudu-body-content-summary-card-header">
                            <h5>Goal</h5>
                            <h5>Goal Amount</h5>
                            <h5>Duration</h5>
                          </div>
                          <div className="new-tudu-body-content-summary-card-body">
                            {tudos.map((tudo, index) => {
                              return (
                                tudosAmount[tudo] && (
                                  <div key={index}>
                                    <div className="new-tudu-body-content-summary-card-body-row">
                                      <div className="new-tudu-body-content-summary-card-body-row-check"></div>
                                      <div className="new-tudu-body-content-summary-card-body-row-data">
                                        <p>{tudosPair[tudo]}</p>
                                        <p>{`N ${tudosAmount[tudo]}`}</p>
                                        <p>{tudosDuration[tudo]}</p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="new-tudu-body-content-continue">
                        <Button
                          type="button"
                          value="continue"
                          onClick={this.doneClickHandler}
                        >
                          {this.props.data.tudo.isCreating ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Done"
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="new-tudu-body-content-image">
                        <div
                          className="new-tudu-body-content-image-list"
                          style={
                            tudos.length < 4
                              ? { overflow: "hidden" }
                              : { overflowY: "scroll" }
                          }
                        >
                          {tudos.map((tudo, index) => {
                            return tudo === "others"
                              ? null
                              : tudoList[tudo] && (
                                  <div
                                    key={index}
                                    className="new-tudu-body-content-image-list-item"
                                  >
                                    <div className="new-tudu-body-content-image-list-item-check"></div>
                                    <p>{tudoList[tudo]}</p>
                                  </div>
                                );
                          })}
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
  }
}

export default NewTudu;
