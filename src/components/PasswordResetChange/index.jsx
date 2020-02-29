/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import axios from "../../axios-instance";
import { Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

import NavBar from "../commons/Navbar";
import { ReactComponent as PasswordSVG } from "../../images/password.svg";

import footerImage from "../../images/reset-password.png";

import "./passwordResetChange.scss";

class PasswordResetChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmation: "",
      passwordError: "",
      confirmationError: "",
      passwordHidden: true,
      confirmHidden: true
    };
  }

  handleNoInput = () => {
    const { password } = this.state;
    const passwordLength = password.length;

    if (!password) {
      this.setState({
        passwordError: "Please enter your password"
      });
    } else if (passwordLength < 8) {
      this.setState({
        passwordError: "Please enter a password greater than 7 chareacters"
      });
    } else {
      this.setState({
        passwordError: ""
      });
    }
  };

  handleConfirmation = () => {
    const { password, confirmation } = this.state;

    if (password !== confirmation) {
      this.setState({
        confirmationError: "Password mismatch"
      });
    } else if (!confirmation) {
      this.setState({
        confirmationError: "Confirm new password"
      });
    } else {
      this.setState({
        confirmationError: ""
      });
    }
  };

  changeHandler = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    });
  };

  togglePassword = event => {
    event.preventDefault();
    this.setState({
      passwordHidden: !this.state.passwordHidden
    });
  };

  toggleConfirm = event => {
    event.preventDefault();
    this.setState({
      confirmHidden: !this.state.confirmHidden
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const {
      match: {
        params: { uiid, token }
      }
    } = this.props;
    const { password, confirmation } = this.state;
    const data = JSON.stringify({ new_password: password });
    const config = { headers: { "Content-Type": "application/json" } };

    if (password !== confirmation) {
      return toast.error("Password confirmation mismatch!");
    }

    if ((password.length && confirmation.length) < 8) {
      return toast.error("Password lenght must be more than 7 character!");
    }

    try {
      const response = await axios.put(
        `/password-reset-change/${uiid}/${token}`,
        data,
        config
      );

      this.setState({
        password: "",
        confirmation: ""
      });

      toast.success(response.data.message);

      return this.props.history.push("/login");
    } catch (e) {
      if (e.response) {
        if (
          e.response.data.error === "Verification link is corrupted or expired"
        ) {
          return toast.error("Corrupted or expired verification link!");
        }
      }

      return toast.error(
        "Unable to reset password at the moment, please try again later"
      );
    }
  };

  render() {
    return (
      <>
        <NavBar isAuthenticated={false} />

        <div className="password-reset-change">
          <div className="password-reset-change-left">
            <div className="password-reset-change-left-background"></div>
            <div className="password-reset-change-left-image">
              <img src={footerImage} alt="" />
            </div>
          </div>
          <div className="password-reset-change-right">
            <div className="password-reset-change-right-header">
              <h2>
                <span>Create new password?</span>
              </h2>
              <p>Provide your email so we can send you a reset link</p>
            </div>
            <div className="password-reset-change-right-form">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group
                  className={
                    this.state.passwordError
                      ? "password-reset-change-right-form-password-invalid"
                      : "password-reset-change-right-form-password"
                  }
                  controlId="formPassword"
                >
                  <InputGroup>
                    <Form.Control
                      type={this.state.passwordHidden ? "password" : "text"}
                      name="password"
                      placeholder="New password"
                      onBlur={this.handleNoInput}
                      onChange={this.changeHandler}
                      required
                      value={this.state.password}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        <PasswordSVG onClick={this.togglePassword} />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
                <div className="password-reset-change-right-form-error">
                  <small className="text-danger">
                    {this.state.passwordError}
                  </small>
                </div>
                <Form.Group
                  className={
                    this.state.confirmationError
                      ? "password-reset-change-right-form-confirm-invalid"
                      : "password-reset-change-right-form-confirm"
                  }
                  controlId="formPasswordConfirm"
                >
                  <InputGroup>
                    <Form.Control
                      type={this.state.confirmHidden ? "password" : "text"}
                      name="confirmation"
                      placeholder="Confirn new password"
                      onBlur={this.handleConfirmation}
                      onChange={this.changeHandler}
                      required
                      value={this.state.confirmationPassword}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        <PasswordSVG onClick={this.toggleConfirm} />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
                <div className="password-reset-change-right-form-error">
                  <small className="text-danger">
                    {this.state.confirmationError}
                  </small>
                </div>
                <div className="password-reset-change-right-form-submit">
                  <button type="submit">RESET PASSWORD</button>
                </div>
              </Form>
            </div>
          </div>
          <div className="password-reset-change-bottom">
            <div className="password-reset-change-bottom-background"></div>
            <div className="password-reset-change-bottom-image">
              <img src={footerImage} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PasswordResetChange;
