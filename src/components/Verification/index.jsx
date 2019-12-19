/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/auth/authAction";
import { useDispatch } from "react-redux";
import NavBar from "../commons/Navbar";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import RegisterImage from "../../images/RegisterImage.png";
import PinInput from "react-pin-input";
import axios from "../../axios-instance";
import { toast } from "react-toastify";

const Verify = ({ history }) => {
  const [counter, setCounter] = useState(60);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail(window.sessionStorage.getItem("registered_unverifiedUser_TUDU"));
    const interval = setInterval(() => {
      setCounter(counter => counter - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      window.sessionStorage.removeItem(
        "registered_unverifiedUser_TUDU_password"
      );
      window.sessionStorage.removeItem("registered_unverifiedUser_TUDU");
    };
  }, []);

  const verifyEmailValidity = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const dispatch = useDispatch();

  const verifyUser = async e => {
    e.preventDefault();

    if (otp.length !== 4) return;

    if (!verifyEmailValidity()) {
      return history.push("/login");
    }
    // http to submit verification code
    setIsLoading(true);
    try {
      const res = await axios.patch("/user/verify_account", { email, otp });
      if (res.status === 200) {
        setIsLoading(false);

        if (
          window.sessionStorage.getItem(
            "registered_unverifiedUser_TUDU_password"
          )
        ) {
          const password = window.sessionStorage.getItem(
            "registered_unverifiedUser_TUDU_password"
          );
          login(
            {
              email,
              password
            },
            history,
            dispatch
          );
        } else {
          toast.success("Account Verified");
          return history.push("/login");
        }
      }

      // handle edge cases axios can't handle e.g http over https
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.data.error) {
        return toast.error(err.response.data.error);
      }
      return toast.error("Verification Failed Try Again!");
    }
  };

  const resendCode = () => {
    //check if email exist in session storage and is valid

    if (!verifyEmailValidity()) {
      return history.push("/login");
    }

    if (verifyEmailValidity()) {
      setCounter(60);
      return axios.post("/user/generate_otp", { email });
    }
  };

  return window.sessionStorage.getItem("registered_unverifiedUser_TUDU") ? (
    <>
      <NavBar />
      <div className="group login-signup-main-container">
        <div className="left-side-main-container">
          <img src={RegisterImage} alt="Login" className="login-image" />
        </div>
        <div className="right-side-verify-main-container">
          <h3 className="create-account mt-5 mb-3">Verify my account</h3>
          <div className="clearfix mb-2">
            <hr className="title-underscore float-left m-0" />
          </div>
          <small className="in-just-few mb-5 d-inline-block">
            Type in the 4-digit code sent to your Email/phone number
          </small>
          <Form className="form-verify-code mt-4 mb-5" onSubmit={verifyUser}>
            <PinInput
              className="vcode mb-3 input-flex-container"
              id="vcode"
              length={4}
              initialValue=""
              // eslint-disable-next-line no-unused-vars
              onChange={(_value, _index) => {}}
              type="numeric"
              style={{ paddingRight: "0px" }}
              inputStyle={{ borderColor: "#C8D5FD" }}
              inputFocusStyle={{ borderColor: "blue" }}
              onComplete={value => {
                setOtp(value);
              }}
            />
            <SubmitButton
              onClick={verifyUser}
              className="mt-5 mb-5"
              backgroundColor="#7594FB"
              boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
              borderColor="transparent"
              width="150px"
              Height="45px"
            >
              {isLoading ? <Spinner animation="border" /> : "Verify"}
            </SubmitButton>
            {counter > 0 ? (
              <small className="text-left d-block mt-2">
                Trouble getting code? wait{" "}
                <span style={{ color: "#C227B9" }}> {counter} </span>
                seconds
              </small>
            ) : (
              <small className="text-left d-block mt-2">
                Trouble getting code?{" "}
                <b className="resend-code" onClick={resendCode}>
                  Resend Code
                </b>
              </small>
            )}
          </Form>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};
export default Verify;
