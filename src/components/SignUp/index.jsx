import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../axios-instance";
import { Form, InputGroup, Col, Spinner } from "react-bootstrap";
import useForm from "react-hook-form";
import NavBar from "../commons/Navbar";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import RegisterImage from "../../images/RegisterImage.png";
import { ReactComponent as PasswordSVG } from "../../images/password.svg";
import "./signup.scss";

const SignUp = ({ history }) => {
  const [field, updatePasswordField] = useState(true);
  const [showInputFieldVcode, setShowInputFieldVcode] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  useEffect(() => {
    window.sessionStorage.removeItem("registered_unverifiedUser_TUDU");
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(data);
    setIsloading(true);
    try {
      const res = await axios.post("/register", body, config);
      if (res.data.status === 201) {
        setIsloading(false);
        window.sessionStorage.setItem(
          "registered_unverifiedUser_TUDU",
          data.email
        );
        window.sessionStorage.setItem(
          "registered_unverifiedUser_TUDU_password",
          data.password
        );
        return history.push("/verify");
      }

      // handle edge cases axios can't handle e.g http over https
      setIsloading(false);
      throw new Error("SignUp Failed Try Again!");
    } catch (err) {
      setIsloading(false);

      if (err.response && err.response.data.error) {
        const errorsArray = Object.values(err.response.data.error).flat();
        return errorsArray.forEach(eachErrorMessage =>
          toast.error(eachErrorMessage)
        );
      }
      return toast.error("SignUp Failed Try Again!");
    }
  };

  const changePasswordFieldToText = () => {
    field ? updatePasswordField(false) : updatePasswordField(true);
  };

  return (
    <>
      <NavBar isAuthenticated={false} />
      <div className="group login-signup-main-container">
        <div className="left-side-main-container">
          <img src={RegisterImage} alt="Login" className="mt-5 login-image" />
        </div>
        <div className="right-side-main-container">
          <h3 className="create-account">Create account</h3>
          <div className="clearfix mb-2">
            <hr className="title-underscore float-left m-0" />
          </div>
          <small className="in-just-few">In just a few minutes</small>
          <Form className="form-login mt-3" onSubmit={handleSubmit(onSubmit)}>
            <Form.Row className="mb-4">
              <Col>
                <Form.Control
                  placeholder="First Name"
                  name="first_name"
                  required
                  className={` firstname firstname_placeholder form-control ${errors.first_name &&
                    "is-invalid"} `}
                  ref={register({
                    required: true,
                    minLength: 1,
                    maxLength: 100,
                    pattern: /^[A-Za-z]+$/i
                  })}
                />
                {errors.first_name && (
                  <small className="text-danger">Input your first name</small>
                )}
              </Col>
              <Col>
                <Form.Control
                  placeholder="Last Name"
                  name="last_name"
                  required
                  className={` lastname lastname_placeholder form-control ${errors.last_name &&
                    "is-invalid"} `}
                  ref={register({
                    required: true,
                    minLength: 1,
                    maxLength: 100,
                    pattern: /^[A-Za-z]+$/i
                  })}
                />
                {errors.last_name && (
                  <small className="text-danger">Input your last name</small>
                )}
              </Col>
            </Form.Row>

            <Form.Group controlId="" className="mb-4">
              <Form.Control
                placeholder="phone number"
                type="number"
                required
                name="mobile_number"
                className={` phone_number form-control ${errors.mobile_number &&
                  "is-invalid"} `}
                ref={register({
                  required: true,
                  minLength: 11,
                  maxLength: 11
                })}
                onKeyDown={e =>
                  (e.keyCode === 69 ||
                    e.keyCode === 190 ||
                    e.keyCode === 187 ||
                    e.keyCode === 189) &&
                  e.preventDefault()
                }
              />
              {errors.mobile_number && (
                <small className="text-danger">Input phone number</small>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Control
                placeholder="Email address"
                type="email"
                required
                name="email"
                className={`email form-control ${errors.email &&
                  "is-invalid"}  `}
                ref={register({
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  maxLength: 100
                })}
              />
              {errors.email && (
                <small className="text-danger">Input your email</small>
              )}
            </Form.Group>

            <InputGroup className="">
              <Form.Control
                placeholder="Password"
                type={field ? "password" : "text"}
                name="password"
                required
                ref={register({
                  required: "Password Field is empty",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                style={{ borderRight: "none", backgroundImage: "none" }}
                className={`password form-control ${errors.password &&
                  "is-invalid"}  `}
              />
              <InputGroup.Append>
                <InputGroup.Text
                  id="basic-addon2"
                  style={
                    errors.password
                      ? {
                          background: "none",
                          cursor: "pointer",
                          borderColor: "#DC3545"
                        }
                      : { background: "none", cursor: "pointer" }
                  }
                >
                  <PasswordSVG onClick={changePasswordFieldToText} />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            {errors.password && (
              <small className="text-danger password-error-mssg">
                {errors.password.message}
              </small>
            )}

            {showInputFieldVcode ? (
              <Form.Group controlId="formBasicEmail" className="mb-4 mt-4">
                <Form.Control
                  placeholder="Referral code"
                  type="number"
                  required
                  name="referral_code"
                  className={` referral_code form-control ${errors.referral_code &&
                    "is-invalid"}   `}
                  ref={register({ required: true })}
                  onKeyDown={e => e.keyCode === 32 && e.preventDefault()}
                />
                {errors.referral_code && (
                  <small className="text-danger">Input Referral code</small>
                )}
              </Form.Group>
            ) : (
              <div>
                <small
                  className="mt-3 d-inline-block got-invite-code"
                  onClick={() => setShowInputFieldVcode(true)}
                >
                  Got Invite code?
                </small>
              </div>
            )}

            <div className="login-footer-parent">
              <div className="login-footer-left margin-right-auto">
                <small>
                  <span className="in-just-few ">Have an account? </span>
                  <span className="got-invite-code font-weight-bold">
                    <Link to="/login">Login </Link>
                  </span>
                </small>
              </div>
              <div className="login-footer-right">
                <SubmitButton
                  type="submit"
                  className="mt-4 mb-4"
                  boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                  backgroundColor="#7594FB"
                  borderColor="transparent"
                  width="150px"
                  Height="45px"
                >
                  {isLoading ? <Spinner animation="border" /> : "Continue"}
                </SubmitButton>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
