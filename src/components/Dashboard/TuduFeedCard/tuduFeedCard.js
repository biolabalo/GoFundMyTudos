import React, { useState } from "react";
import {
  ProgressBar,
  ButtonGroup,
  DropdownButton,
  Button,
  Dropdown
} from "react-bootstrap";
import { toast } from "react-toastify";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Clipboard from "react-clipboard.js";
import Modal from "react-responsive-modal";
import "./tuduFeedCard.scss";
import { ReactComponent as ContributeSVG } from "../../../images/contribute.svg";
import { ReactComponent as ShareSVG } from "../../../images/share_tudofeed.svg";
import facebook from "../../../images/facebook.svg";
import twitter from "../../../images/twitter.svg";
import email from "../../../images/envelope.svg";
import { withRouter } from "react-router-dom";

const TuduFeedCard2 = ({ eachFeed, history }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const copySuccess = () => toast.success("Share link copied");
  const copyFailure = () => toast.error("Share link failed to copy");

  return (
    <>
      <div className="tuduz-feed">
        <div className="tudu-feed-card">
          <div className="m-2" style={{ display: "flex" }}>
            <div style={{ flex: "50%" }}>
              <h6 style={{ lineHeight: "unset" }} className="title-on-card">{eachFeed.goal_name} </h6>
            </div>
            <div style={{ flex: "50%" }}>
              <ButtonGroup style={{ float: "right" }}>
                <Button
                  style={{
                    borderRight: "1px solid rgb(141,164,255)",
                    zIndex: "1"
                  }}
                >
                  More
                </Button>
                <DropdownButton
                  as={ButtonGroup}
                  title=""
                  id="bg-nested-dropdown"
                  className="contri-share"
                >
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() =>
                      history.push(`/contribute/${eachFeed.share_code}`)
                    }
                  >
                    <ContributeSVG
                      className="mr-2"
                      style={{ height: "15px" }}
                    />
                    Contribute
                  </Dropdown.Item>
                  <Dropdown.Item 
                   eventKey="2"
                   onClick={() =>
                    setShowShareModal(true)
                  }
                    >
                    <ShareSVG className="mr-2" style={{ height: "15px" }} />
                    Share
                  </Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </div>
          </div>

          <div className="tudu-feed-card-progress ">
            <p> {eachFeed.contributions_percentage}% achieved</p>
            <p>
              N {new Intl.NumberFormat().format(eachFeed.amount_generated / 100)} /
              &nbsp;
              <span>{new Intl.NumberFormat().format(eachFeed.amount / 100)} </span>
            </p>
          </div>
          <div className="tudu-feed-card-progress-bar">
            <ProgressBar
              variant="info"
              now={eachFeed.contributions_percentage}
            />
          </div>
          <div className="mb-4 mt-2">
            <div className="jkdnsf float-left m-2 p-2">
              <img src={eachFeed.user.profile_image} alt="Todo-pic" />
            </div>
            <small className="d-inline-block" style={{ marginTop: "35px" }}>
              {eachFeed.user.first_name}{" "}
            </small>
          </div>
        </div>
      </div>
      <Modal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        onOverlayClick={() => setShowShareModal(false)}
      >
        <div className="share-tudo-modal">
          <div className="share-tudo-modal-header">
            <div className="share-tudo-modal-header-text">
              <h5>Share Goal</h5>
              <button onClick={() => setShowShareModal(false)}>X</button>
            </div>
            <p>Goals shared on social media raise up to 3x more</p>
          </div>
          <div className="share-tudo-modal-body">
            <div className="share-tudo-modal-body-socials">
              {eachFeed ? (
                <>
                  <FacebookShareButton
                    url={`${window.location.origin}/contribute/${eachFeed.share_code}`}
                    quote={eachFeed.goal_description}
                  >
                    <div className="share-tudo-modal-body-socials-link">
                      <div className="share-tudo-modal-body-socials-link-img">
                        <img src={facebook} alt="" />
                      </div>
                      <p>Facebook</p>
                    </div>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={`${window.location.origin}/contribute/${eachFeed.share_code}`}
                    quote={eachFeed.goal_description}
                  >
                    <div className="share-tudo-modal-body-socials-link">
                      <div className="share-tudo-modal-body-socials-link-img twitter">
                        <img src={twitter} alt="" />
                      </div>
                      <p>Twitter</p>
                    </div>
                  </TwitterShareButton>
                  <a
                    href={`mailto:?subject=Help me meet my goal, &body=${eachFeed.goal_description} ${window.location.origin}/contribute/${eachFeed.share_code}`}
                  >
                    <div className="share-tudo-modal-body-socials-link">
                      <div className="share-tudo-modal-body-socials-link-img email">
                        <img src={email} alt="" />
                      </div>
                      <p>Email</p>
                    </div>
                  </a>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="share-tudo-modal-body-form">
              {<input type="text" value={`${window.location.origin}/contribute/${eachFeed.share_code}`} onChange={() => {}} />}
              <Clipboard
                onSuccess={copySuccess}
                onError={copyFailure}
                data-clipboard-text={`${window.location.origin}/contribute/${eachFeed.share_code}`}
              >
                Copy Link
              </Clipboard>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default withRouter(TuduFeedCard2);
