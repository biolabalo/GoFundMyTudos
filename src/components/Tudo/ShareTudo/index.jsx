import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ProgressBar, Spinner } from "react-bootstrap";
import Clipboard from "react-clipboard.js";
import { toast } from "react-toastify";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton
} from "react-share";

import axios from "../../../axios-instance";

import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";
import Bottombar from "../../Bottombar";

import facebook from "../../../images/facebook.svg";
import twitter from "../../../images/twitter.svg";
import email from "../../../images/envelope.svg";

import "./shareTudo.scss";

class ShareTudo extends Component {
  constructor(props) {
    super(props);

    this.tudoVideoRef = React.createRef();

    this.state = {
      toggleValue: false,
      host: "",
      shareId: "",
      tudoId: "",
      description: "",
      amountGenerated: "",
      amount: "",
      file: "",
      fileUrl: "",
      fileName: "",
      fileType: "",
      fileSize: "",
      uploading: false
    };
  }

  componentDidMount() {
    const host = window.location.origin;
    const {
      match: { params: shareID }
    } = this.props;

    this.getTudo(shareID.shareID);

    this.setState({
      host: `${host}/contribute/${shareID.shareID}`,
      shareId: shareID.shareID
    });
  }

  getTudo = async shareId => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const tudoToShare = await axios.get(`shared-tudo/${shareId}`, config);

      const {
        goal_description,
        id,
        tudo_media,
        amount_generated,
        amount,
        contributions_percentage
      } = tudoToShare.data.data;

      this.setState({
        description: goal_description,
        tudoId: id,
        fileUrl: tudo_media,
        amountGenerated: amount_generated,
        amount: amount,
        percentage: contributions_percentage
      });
    } catch (e) {
      return e.response;
    }
  };

  toggleModal = () => {
    this.setState({
      toggleValue: !this.state.toggleValue
    });
  };

  copySuccess = () => toast.success("Share link copied successfully");

  copyFailure = () => toast.error("Share link failed to copy");

  changeHandler = event => {
    if (event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > 10485760) {
        this.setState({
          fileSize: file.size
        });
      } else {
        this.setState({
          fileSize: ""
        });
      }

      this.setState({
        file
      });

      const fileType = file.type;

      if (fileType.match(/image/)) {
        return this.setState({
          fileUrl: URL.createObjectURL(event.target.files[0]),
          fileType: "image"
        });
      }

      this.setState({
        fileUrl: URL.createObjectURL(event.target.files[0]),
        fileType: "video"
      });
    }
  };

  uploadMedia = () => {
    const { file } = this.state;

    const cloudinaryUrl = file.type.startsWith("image")
      ? "https://api.cloudinary.com/v1_1/xerdetech/image/upload/"
      : "https://api.cloudinary.com/v1_1/xerdetech/video/upload/";

    const cloudinaryUploadPreset = "oqa5drmx";

    const imageFormData = new FormData();

    imageFormData.append("file", file);
    imageFormData.append("upload_preset", cloudinaryUploadPreset);

    this.setState({
      uploading: true
    });

    fetch(cloudinaryUrl, {
      method: "POST",
      body: imageFormData
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          fileUrl: response.url,
          uploading: false
        });
        this.handleUpload();
      })
      .catch(error => error);
  };

  textareaChangeHandler = event => {
    event.preventDefault();

    const {
      target: { name, value }
    } = event;

    this.setState({ [name]: value });
  };

  handleUpload = async () => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    const description = this.state.description;
    const media = this.state.fileUrl;

    const data = JSON.stringify({
      tudo_media: media,
      goal_description: description
    });

    const id = this.state.tudoId;

    const url = `tudo/${id}`;

    try {
      await axios.patch(url, data, config);
      window.location.reload();
    } catch (e) {
      toast.error("Unable to update tudo");
    }
  };

  render() {
    const history = window;
    const {
      toggleValue,
      host,
      description,
      amountGenerated,
      amount,
      file,
      fileType,
      fileSize,
      uploading,
      percentage
    } = this.state;

    const formatedGenerated =
      amountGenerated / 100 === 0 ? 0 : (amountGenerated / 100).toFixed(2);

    const formatedAmount = (amount / 100).toFixed(2);

    const emailBody = `${description} ${host}`;

    const tudoMedia = this.state.fileUrl;

    return (
      <div className="share-tudo">
        <Modal
          show={toggleValue}
          onHide={this.toggleModal}
          size="lg"
          centered
          animation
        >
          <div className="share-tudo-modal">
            <div className="share-tudo-modal-header">
              <div className="share-tudo-modal-header-text">
                <h5>Share Goal</h5>
                <button onClick={this.toggleModal}>X</button>
              </div>
              <p>Goals shared on social media raise up to 3x more</p>
            </div>
            <div className="share-tudo-modal-body">
              <div className="share-tudo-modal-body-socials">
                <FacebookShareButton url={host} quote={description}>
                  <div className="share-tudo-modal-body-socials-link">
                    <div className="share-tudo-modal-body-socials-link-img">
                      <img src={facebook} alt="" />
                    </div>
                    <p>Facebook</p>
                  </div>
                </FacebookShareButton>
                <FacebookMessengerShareButton url={host} quote={description}>
                  <div className="share-tudo-modal-body-socials-link">
                    <div className="share-tudo-modal-body-socials-link-img messenger">
                      <i className="fab fa-facebook-messenger"></i>
                    </div>
                    <p>Facebook</p>
                  </div>
                </FacebookMessengerShareButton>
                <TwitterShareButton url={host} quote={description}>
                  <div className="share-tudo-modal-body-socials-link">
                    <div className="share-tudo-modal-body-socials-link-img twitter">
                      <img src={twitter} alt="" />
                    </div>
                    <p>Twitter</p>
                  </div>
                </TwitterShareButton>
                <WhatsappShareButton
                  title={description}
                  url={host}
                  separator={" "}
                >
                  <div className="share-tudo-modal-body-socials-link">
                    <div className="share-tudo-modal-body-socials-link-img whatsapp">
                      <i className="fab fa-whatsapp-square"></i>
                    </div>
                    <p>Whatsapp</p>
                  </div>
                </WhatsappShareButton>
                <a
                  href={`mailto:?subject=Help me meet my goal, &body=${emailBody}`}
                >
                  <div className="share-tudo-modal-body-socials-link">
                    <div className="share-tudo-modal-body-socials-link-img email">
                      <img src={email} alt="" />
                    </div>
                    <p>Email</p>
                  </div>
                </a>
              </div>
              <div className="share-tudo-modal-body-form">
                {<input type="text" value={`${host}`} onChange={() => {}} />}
                <Clipboard
                  onSuccess={this.copySuccess}
                  onError={this.copyFailure}
                  data-clipboard-text={`${host}`}
                >
                  Copy Link
                </Clipboard>
              </div>
            </div>
          </div>
        </Modal>
        <div className="share-tudo-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="share-tudo-bottombar">
          <Bottombar path={history} />
        </div>
        <div className="share-tudo-body">
          <AuthNavBar />
          <div className="share-tudo-body-content">
            <div className="row">
              <div className="col-md-1">
                <div className="share-tudo-body-content-back">
                  <Link to="/dashboard/tudo">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-11">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <h2>Share My Goal</h2>
                  </div>
                  <div className="col-md-12 col-lg-8">
                    <div className="share-tudo-body-content-left">
                      <p>
                        This is what your family and friends will see when they
                        click on your goal link.
                      </p>
                      <div className="share-tudo-body-content-left-preview">
                        <div
                          className={
                            fileType === "video"
                              ? "share-tudo-body-content-left-preview-image"
                              : "share-tudo-body-content-left-preview-disabled"
                          }
                        >
                          <video
                            ref={this.tudoVideoRef}
                            id="uploaded"
                            src={this.state.fileUrl}
                            controls
                          ></video>
                        </div>
                        <div
                          className={
                            fileType === "image"
                              ? "share-tudo-body-content-left-preview-image"
                              : "share-tudo-body-content-left-preview-disabled"
                          }
                        >
                          <img src={tudoMedia} alt="" />
                        </div>
                        <div
                          className={
                            tudoMedia
                              ? "share-tudo-body-content-left-preview-disabled"
                              : "share-tudo-body-content-left-preview-icon"
                          }
                        >
                          <i className="material-icons">flip_camera_ios</i>
                          <p>Media Preview</p>
                        </div>
                        <div
                          className={
                            tudoMedia
                              ? tudoMedia.endsWith(".png") ||
                                tudoMedia.endsWith(".jpg")
                                ? "share-tudo-body-content-left-preview-image"
                                : "share-tudo-body-content-left-preview-disabled"
                              : "share-tudo-body-content-left-preview-disabled"
                          }
                        >
                          <img src={tudoMedia} alt="" />
                        </div>
                        <div
                          className={
                            tudoMedia
                              ? tudoMedia.endsWith(".mp4") ||
                                tudoMedia.endsWith(".avi") ||
                                tudoMedia.endsWith(".ogg")
                                ? "share-tudo-body-content-left-preview-image"
                                : "share-tudo-body-content-left-preview-disabled"
                              : "share-tudo-body-content-left-preview-disabled"
                          }
                        >
                          <video src={tudoMedia} controls></video>
                        </div>
                        <div
                          className={
                            fileSize
                              ? "share-tudo-body-content-left-preview-error"
                              : "share-tudo-body-content-left-preview-disabled"
                          }
                        >
                          <p>{`File size is too large for upload`}</p>
                        </div>
                      </div>
                      <div className="share-tudo-body-content-left-upload">
                        <button
                          disabled={fileSize === "" && file ? false : true}
                          onClick={this.uploadMedia}
                        >
                          {uploading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Upload"
                          )}
                        </button>
                      </div>
                      <label htmlFor="tudo-share-image">Choose Media</label>
                      <p className="share-tudo-body-content-left-limit">
                        <span>*</span> Max file size: 10MB
                      </p>
                      <input
                        hidden
                        type="file"
                        id="tudo-share-image"
                        accept=".png, .jpg, .mp4, .ogg, .avi"
                        onChange={this.changeHandler}
                      />
                      <div className="share-tudo-body-content-left-goal">
                        <div className="share-tudo-body-content-left-goal-header">
                          <div className="row no-gutters">
                            <div className="col-md-12">
                              <h6>Goal Statement</h6>
                            </div>
                          </div>
                        </div>
                        <div className="share-tudo-body-content-left-goal-text">
                          <textarea
                            name="description"
                            value={description}
                            rows="4"
                            onChange={this.textareaChangeHandler}
                          ></textarea>
                        </div>
                      </div>
                      <div className="share-tudo-body-content-left-save">
                        <button onClick={this.handleUpload}>Update</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="share-tudo-body-content-right">
                      <div className="share-tudo-body-content-right-card">
                        <div className="share-tudo-body-content-right-card-header">
                          <h6>Amount Raised</h6>
                        </div>
                        <div className="share-tudo-body-content-right-card-text">
                          <p>
                            N{" "}
                            {new Intl.NumberFormat().format(formatedGenerated)}{" "}
                            /{" "}
                            <span>
                              {new Intl.NumberFormat().format(formatedAmount)}
                            </span>
                          </p>
                          <div className="share-tudo-body-content-right-card-text-progress-bar">
                            <p>{percentage}% achieved</p>
                            <ProgressBar variant="info" now={percentage} />
                          </div>
                        </div>
                      </div>
                      <button onClick={this.toggleModal}>Share Goal</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShareTudo;
