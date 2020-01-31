import React, { useState } from "react";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import useForm from "react-hook-form";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import { useSelector } from "react-redux";
import axios from "../../axios-instance";
import { toast } from "react-toastify";
import "./profile.scss";

const NextOfKin = () => {
  const [isLoading, setIsloading] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const { titleColor } = useSelector(state => state.auth.userThemePrefrences);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsloading(true)
    try {
      const result = await axios.post('/next-of-kin', data);
      console.log(result)
      setIsloading(false)
      toast.success("Your Next of kin added succesfully");
    } catch (err) {
      setIsloading(false);
      if(err.response.data.error && err.response.data.error.mobile_number){
        return toast.error("Phone number is invalid");
      }
      toast.error('failed to update details');
    }

  };

  // useEffect(() => {
  //   (async function() {
     

  //     setFecthedDetails({
  //       isFetchedError: false,
  //       isLoading: true
  //     });

  //     try {
  //       const response = await axios.get(`/user-profile`);
  //       const {
  //         data: { data }
  //       } = response;

  //       console.log(data)
  //       setFecthedDetails({
  //         isFetchedError: false,
  //         isLoading: false
  //       });
  //       setContributionDetails(data);
  //     } catch (err) {
  //       setFecthedDetails({
  //         isFetchedError: true,
  //         isLoading: false
  //       });
  //     }
  //   })();
  // }, []);

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
              className={`form-control ${errors.name && "is-invalid"}`}
              required
              name="name"
              ref={register({ required: true, minLength: 1, maxLength: 100 })}
            />
            {errors.name && (
              <small className="text-danger">Fullname is required</small>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Relationship
          </Form.Label>
          <Col sm="9">
            <Form.Control as="select" name="relationship" ref={register}>
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="sibling">Sibling</option>
              <option value="child">Child</option>
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
              type="text"
              required
              name="mobile_number"
              onKeyDown={e =>
                e.keyCode > 32 &&
                (e.keyCode < 48 || e.keyCode > 57) &&
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
              <small className="text-danger"> Phone Number should be 11 digits</small>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Address
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              className={`form-control ${errors.address && "is-invalid"}`}
              required
              name="address"
              ref={register({ required: true, minLength: 2, maxLength: 100 })}
            />
            {errors.address && (
              <small className="text-danger">Address is required</small>
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
