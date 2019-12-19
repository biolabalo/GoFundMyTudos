import React, { useState } from "react";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import useForm from "react-hook-form";
import { useSelector } from "react-redux";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import "./profile.scss";

const Security = () => {
  const [isLoading, setIsloading] = useState(false);
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "onBlur"
  });
  const { titleColor } = useSelector(state => state.auth.userThemePrefrences);

  const onSubmit = async (data, e) => {
    e.preventDefault();
  };

  return (
    <section className="profile-section">
      <p className="mt-5 mb-5" style={{ color: titleColor }}>
        Change your password to a new one
      </p>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ color: titleColor }}>
        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Old Password
          </Form.Label>
          <Col sm="9">
            <Form.Control type="password" name="old-password" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            New Password
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              name="password"
              required
              ref={register({
                required: "Password Field is empty",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              className={`form-control ${errors.password && "is-invalid"}`}
            />
            {errors.password && (
              <small className="text-danger password-error-mssg">
                {errors.password.message}
              </small>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5">
          <Form.Label column sm="3">
            Re-type Password
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              name="confirmPassword"
              required
              ref={register({
                validate: value => value === watch("password")
              })}
              className={`form-control ${errors.confirmPassword &&
                "is-invalid"}`}
            />
            {errors.confirmPassword && (
              <small className="text-danger"> Passwords Do not match </small>
            )}
          </Col>
        </Form.Group>

        <SubmitButton
          className="mt-4 mb-4"
          backgroundColor="#7594FB"
          borderColor="transparent"
          boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
          width="150px"
          Height="45px"
        >
          {isLoading ? <Spinner animation="border" /> : "Update"}
        </SubmitButton>
      </Form>
    </section>
  );
};

export default Security;
