/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../axios-instance";

import NavBar from "../commons/Navbar";

import footerImage from "../../images/reset-password.png";

import "./passwordResetRequest.scss";

class PasswordResetRequest extends Component {
  state = {
    email: "",
    error: ""
  };

  handleNoInput = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.state.email) {
      this.setState({
        error: "Please enter your email"
      });
    } else if (!re.test(this.state.email)) {
      this.setState({
        error: "Please enter a valid email"
      });
    }
  };

  changeHandler = event => {
    this.setState({
      email: event.target.value,
      error: ""
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email } = this.state;
    const data = JSON.stringify({ email });
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const response = await axios.post("/password-reset-link", data, config);
      const {
        data: { status }
      } = response;

      if (status === 200) {
        this.setState({
          email: ""
        });

        toast.success(
          "Request successful. Password reset information will be sent to your email shortly"
        );

        return this.props.history.push("/login");
      }
    } catch (e) {
      this.setState({
        email: ""
      });
      return toast.success(
        "Request successful. Password reset information will be sent to your email shortly"
      );
    }
  };

  render() {
    return (
      <>
        <NavBar isAuthenticated={false} />

        <div className="password-reset-request">
          <div className="password-reset-request-left">
            <div className="password-reset-request-left-background"></div>
            <div className="password-reset-request-left-image">
              <img src={footerImage} alt="" />
            </div>
          </div>
          <div className="password-reset-request-right">
            <div className="password-reset-request-right-header">
              <h2>
                <span>Forgot your password?</span>
              </h2>
              <p>Provide your email so we can send you a reset link</p>
            </div>
            <div className="password-reset-request-right-form">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    className={
                      this.state.error &&
                      "password-reset-request-right-form-invalid"
                    }
                    placeholder="Email address"
                    onBlur={this.handleNoInput}
                    onChange={this.changeHandler}
                    required
                    value={this.state.email}
                  />
                </Form.Group>
                <div className="password-reset-request-right-form-error">
                  <small className="text-danger">{this.state.error}</small>
                </div>
                <div className="password-reset-request-right-form-submit">
                  <button type="submit">RESET PASSWORD</button>
                </div>
              </Form>
            </div>
          </div>
          <div className="password-reset-request-bottom">
            <div className="password-reset-request-bottom-background"></div>
            <div className="password-reset-request-bottom-image">
              <img src={footerImage} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PasswordResetRequest;
