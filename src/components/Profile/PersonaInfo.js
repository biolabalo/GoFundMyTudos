import React, { useState } from "react";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import useForm from "react-hook-form";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import { toast } from "react-toastify";
import axios from "../../axios-instance";
import "./profile.scss";

const PersonalInfo = () => {
  const [isLoading, setIsloading] = useState(false);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const { titleColor } = useSelector(state => state.auth.userThemePrefrences);

  const { userProfile } = useSelector(state => state.loggedInUserProfile);

  const dispatch = useDispatch();

  const changeHandler = event => {
    if (event.target.files[0]) {
      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/xerdetech/image/upload/";
      const cloudinaryUploadPreset = "oqa5drmx";

      const file = event.target.files[0];

      const imageFormData = new FormData();

      imageFormData.append("file", file);
      imageFormData.append("upload_preset", cloudinaryUploadPreset);

      fetch(cloudinaryUrl, {
        method: "POST",
        body: imageFormData
      })
        .then(response => response.json())
        .then(response => {
          setFile(response.url);
        })
        .catch(error => error);

      const fileType = file.type;

      if (fileType.match(/image/)) {
        setFileUrl(URL.createObjectURL(event.target.files[0]));
      } else {
        const fileName = file.name;
        setFileName(fileName);
      }
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsloading(true);
    const newData = file ? { ...data, profile_image: file } : data;
    try {
      const result = await axios.patch("/user-profile", newData);
      setIsloading(false);

      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: newData
      });
      
      toast.success("Profile Updated successfully");
    } catch (err) {
      setIsloading(false);
      toast.error("Failed to updated Profile");
    }
  };

  return (
    <section className="profile-section">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ color: titleColor }}>
        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Upload your image profile
          </Form.Label>
          <Col sm="9">
            <label htmlFor="tudo-share-image">
              {userProfile && userProfile.profile_image ? (
                <img
                  src={fileUrl ? fileUrl : userProfile.profile_image}
                  alt=""
                />
              ) : (
                <>
                  <i className="material-icons">flip_camera_ios</i>
                  <p>Add Image</p>
                </>
              )}
            </label>
            <input
              hidden
              type="file"
              id="tudo-share-image"
              onChange={changeHandler}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </Col>
        </Form.Group>
{
  userProfile  ? 
        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Date of Birth
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="date"
              name="date_of_birth"
              className={`date_of_birth form-control ${errors.date_of_birth &&
                "is-invalid"}   `}
              ref={register}
              defaultValue={userProfile.birthday ? userProfile.birthday : ""}
            />
          </Col>
        </Form.Group> : ""
}
{
userProfile && userProfile.gender ? 
        <Form.Group as={Row} className="mt-5 mb-5">
          <Form.Label column sm="3">
            Gender
          </Form.Label>
          <Col sm="9">
            <Form.Check
              inline
              label="Male"
              value="male"
              name="gender"
              type="radio"
              ref={register}
              defaultChecked={userProfile.gender === "male" ? true : false}
            />
            <Form.Check
              inline
              label="Female"
              value="female"
              name="gender"
              type="radio"
              ref={register}
              defaultChecked={userProfile.gender === "female" ? true : false}
            />
          </Col>
        </Form.Group>
        :
        ""

}

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

export default PersonalInfo;
