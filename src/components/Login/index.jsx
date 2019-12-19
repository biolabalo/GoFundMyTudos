import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../../redux/auth/authAction";
import { LOGOUT } from "../../redux/auth/authTypes";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import useForm from "react-hook-form";
import NavBar from "../commons/Navbar";
import { useSelector, useDispatch } from "react-redux";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import LoginImage from "../../images/LoginImage2.png";
import { ReactComponent as PasswordSVG } from "../../images/password.svg";
import "./login.scss";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [field, updatePasswordField] = useState(true);
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  useEffect(() => {
    window.sessionStorage.removeItem("registered_unverifiedUser_TUDU");
    dispatch({ type: LOGOUT });
  }, [dispatch]);

  const { isLoading, isLoginError } = useSelector(state => state.auth);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    login(data, history, dispatch);
  };

  const changePasswordFieldToText = () => {
    field ? updatePasswordField(false) : updatePasswordField(true);
  };

  return (
    <>
      <NavBar isAuthenticated={false} />
      <div className="group login-signup-main-container">
        <div className="left-side-main-container">
          <img src={LoginImage} alt="Login" />
        </div>
        <div className="right-side-main-container mt-5">
          <h3 className="create-account">Welcome back</h3>
          <div className="clearfix mb-2">
            <hr className="title-underscore float-left m-0" />
          </div>
          <small className="in-just-few">Login to your account</small>
          <Form className="form-login mt-5" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail" className="mb-5">
              <Form.Control
                placeholder="Email or phone Number"
                type="text"
                required
                name="email"
                className={` phone_number form-control ${errors.email &&
                  "is-invalid"} ${isLoginError ? "is-invalid" : ""}  `}
                ref={register({ required: true })}
                onKeyDown={e => e.keyCode === 32 && e.preventDefault()}
              />

              {errors.email && (
                <small className="text-danger">
                  Input your email or phone number
                </small>
              )}
            </Form.Group>
            <InputGroup>
              <Form.Control
                placeholder="Password"
                type={field ? "password" : "text"}
                name="password"
                required
                ref={register({ required: true })}
                style={{ borderRight: "none", backgroundImage: "none" }}
                className={`form-control ${
                  errors.password || isLoginError ? "is-invalid" : ""
                } `}
              />
              <InputGroup.Append>
                <InputGroup.Text
                  id="basic-addon2"
                  className={
                    errors.password || isLoginError
                      ? "addon-with-errors"
                      : "addon-without-errors"
                  }
                >
                  <PasswordSVG onClick={changePasswordFieldToText} />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <p>
              <Link
                to="/password-reset-request"
                className="mt-2 forgot-password"
              >
                <small>Forgot password ?</small>
              </Link>
            </p>
            {errors.password && (
              <small className="text-danger">Please input your password</small>
            )}

            {isLoginError ? (
              <span className="m-t-10 input-field__message text-danger mt-3  d-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  svg-inline=""
                  role="presentation"
                  focusable="false"
                  tabIndex="-1"
                  className="mr-2 "
                >
                  <path
                    fill="red"
                    d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
                  ></path>
                </svg>
                Invalid credentials given.
              </span>
            ) : (
              ""
            )}

            <div className="login-footer-parent">
              <div className="login-footer-left margin-right-auto">
                <small>
                  <span className="in-just-few ">Don't have an account? </span>
                  <span className="got-invite-code font-weight-bold">
                    <Link to="/signup">signup </Link>
                  </span>
                </small>
              </div>
              <div className="login-footer-right">
                <SubmitButton
                  className="mt-4 mb-4"
                  backgroundColor="#7594FB"
                  borderColor="transparent"
                  boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                  width="150px"
                  Height="45px"
                >
                  {isLoading ? <Spinner animation="border" /> : "Login"}
                </SubmitButton>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
