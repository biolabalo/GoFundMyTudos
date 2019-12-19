import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Clipboard from "react-clipboard.js";
import { toast } from "react-toastify";
import { FacebookShareButton, TwitterShareButton } from "react-share";

import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";

import facebook from "../../../images/facebook.svg";
import twitter from "../../../images/twitter.svg";
import email from "../../../images/envelope.svg";

import "./shareTudo.scss";

class ShareTudo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleValue: false,
      host: "",
      description: `Hi! I’m trying to reach this goal on Tudo and I would really appreciate your help on this one. Your contribution will go a long way in helping me achieve this goal faster. Thank you.`
    };
  }

  componentDidMount() {
    const host = window.location.origin;
    const {
      match: { params: shareID }
    } = this.props;

    this.setState({
      host: `${host}/contribute/${shareID.shareID}`
    });
  }

  toggleModal = () => {
    this.setState({
      toggleValue: !this.state.toggleValue
    });
  };

  copySuccess = () => toast.success("Share link copied successfully");

  copyFailure = () => toast.error("Share link failed to copy");

  render() {
    const history = window;
    const { toggleValue, host, description } = this.state;
    const emailBody = `${description} ${host}`;

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
                <TwitterShareButton url={host} quote={description}>
                  <div className="share-tudo-modal-body-socials-link">
                    <div className="share-tudo-modal-body-socials-link-img twitter">
                      <img src={twitter} alt="" />
                    </div>
                    <p>Twitter</p>
                  </div>
                </TwitterShareButton>
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
                {
                  <input
                    type="textarea"
                    wrap="off"
                    cols="30"
                    rows="5"
                    value={`${description} ${host}`}
                    onChange={() => {}}
                  />
                }
                <Clipboard
                  onSuccess={this.copySuccess}
                  onError={this.copyFailure}
                  data-clipboard-text={`${description} ${host}`}
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
                  <div className="col-md-8">
                    <div className="share-tudo-body-content-left">
                      <p>
                        This is what your family and friends will see when they
                        click on your goal link.
                      </p>
                      <label htmlFor="tudo-share-image">
                        <div className="share-tudo-body-content-left-upload">
                          <div className="share-tudo-body-content-left-upload-icon">
                            <i className="material-icons">flip_camera_ios</i>
                            <p>Add Image</p>
                          </div>
                        </div>
                      </label>
                      <input hidden type="file" id="tudo-share-image" />
                      <div className="share-tudo-body-content-left-goal">
                        <div className="share-tudo-body-content-left-goal-header">
                          <div className="row no-gutters">
                            <div className="col-md-10">
                              <h6>Goal Statement</h6>
                            </div>
                            <div className="col-md-2">
                              <button>Edit</button>
                            </div>
                          </div>
                        </div>
                        <div className="share-tudo-body-content-left-goal-text">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="share-tudo-body-content-right">
                      <div>
                        <div className="share-tudo-body-content-right-card">
                          <div className="share-tudo-body-content-right-card-header">
                            <h6>Amount Raised</h6>
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
      </div>
    );
  }
}

export default ShareTudo;
