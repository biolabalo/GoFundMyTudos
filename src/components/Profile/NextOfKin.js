import React, { useState } from "react";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import useForm from "react-hook-form";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import { useSelector } from "react-redux";
import "./profile.scss";

const NextOfKin = () => {
  const [isLoading, setIsloading] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const { titleColor } = useSelector(state => state.auth.userThemePrefrences);

  const onSubmit = async (data, e) => {
    e.preventDefault();
  };

  return (
    <section className="profile-section">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ color: titleColor }}>
        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Full Name
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              className={`form-control ${errors.fullname && "is-invalid"}`}
              required
              name="fullname"
              ref={register({ required: true, minLength: 2, maxLength: 100 })}
              onKeyDown={e =>
                (e.keyCode === 32 ||
                  e.keyCode === 160 ||
                  e.keyCode === 5760 ||
                  e.keyCode === 8192) &&
                e.preventDefault()
              }
            />
            {errors.fullname && (
              <small className="text-danger">Fullname is required</small>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Relationship
          </Form.Label>
          <Col sm="9">
            <Form.Control as="select">
              <option value="mum">Mum</option>
              <option>Father</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              name="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                maxLength: 100
              })}
            />
            {errors.email && (
              <small className="text-danger">email is required</small>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Phone Number
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              required
              name="mobile_number"
              onKeyDown={e =>
                (e.keyCode === 69 ||
                  e.keyCode === 190 ||
                  e.keyCode === 187 ||
                  e.keyCode === 189) &&
                e.preventDefault()
              }
              className={`form-control ${errors.mobile_number && "is-invalid"}`}
              ref={register({
                required: true,
                minLength: 11,
                maxLength: 11
              })}
            />
            {errors.mobile_number && (
              <small className="text-danger">invalid Phone Number</small>
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

export default NextOfKin;
