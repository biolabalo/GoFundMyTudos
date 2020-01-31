import React, { useEffect, useState } from "react";
import "./success.scss";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Clipboard from "react-clipboard.js";

import axios from "../../axios-instance";
import NavBar from "../commons/Navbar";
import SubmitButton from "../commons/styledComponents/SubmitButton";
import NavBarButton from "../commons/styledComponents/NavBarButton";
import Footer from "../Footer";

import facebook from "../../images/facebook.svg";
import twitter from "../../images/twitter.svg";
import email from "../../images/envelope.svg";

import { Navbar, Nav, Container } from "react-bootstrap";
import { logout } from "../../redux/auth/authAction";

const SucessPage = ({ history }) => {
  const [ContributionDetails, setContributionDetails] = useState(null);
  const { isAuthenticated } = useSelector(state => state.auth);

  const [isFecthedDetails, setFecthedDetails] = useState({
    isFetchedError: false,
    isLoading: false
  });
  const [showShareModal, setShowShareModal] = useState(false);
  const [host, setHost] = useState(false);
  const [tudoDetails, setTudoDetails] = useState("");
  const { isFetchedError, isLoading } = isFecthedDetails;
  const refrence = history.location.search.split("&reference=")[1];
  const numberWithCommas = number =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const copySuccess = () => toast.success("Share link copied");
  const copyFailure = () => toast.error("Share link failed to copy");

  useEffect(() => {
    setFecthedDetails({
      isFetchedError: false,
      isLoading: true
    });

    if (!history.location.search) {
      return history.push("/404");
    }

    (async function() {
      try {
        const response = await axios.get(`tudo/get-contribution/${refrence}`);
        const {
          data: { data }
        } = response;
        const tudoToShare = await axios.get(`shared-tudo/${data.tudo_code}`);
        setFecthedDetails({
          isFetchedError: false,
          isLoading: false
        });
        setContributionDetails(data);
        setTudoDetails(tudoToShare.data.data);

        setHost(
          `${window.location.origin}/contribute/${tudoToShare.data.data.share_code}`
        );
      } catch (err) {
        return history.push("/404");
      }
    })();
  }, [history, refrence]);

  const dispatch = useDispatch();

  const logoutUser = () => {
    logout(history, dispatch);
  };

  if (!isLoading && !ContributionDetails) {
    return (
      <>
        <main className="contribute">
          <NavBar />
          <section className="top-level-404">
            <h2>Thank You!</h2>
            <div className="linear-background mb-3"></div>

            <div className="btn-holder-sucess">
              <SubmitButton
                className="dsknmfleksnfjks d-inline-block mr-3"
                backgroundColor="#7594FB"
                borderColor="transparent"
                boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
                width="150px"
                Height="45px"
                onClick={
                  tudoDetails
                    ? () => setShowShareModal(true)
                    : () => setShowShareModal(false)
                }
              >
                Share Goal
              </SubmitButton>
              {isAuthenticated ? (
                <Link to="/signup" className="djksnckjsncs">
                  {" "}
                  <NavBarButton>Create Tudo</NavBarButton>{" "}
                </Link>
              ) : (
                <Link to="/signup" className="djksnckjsncs">
                  {" "}
                  <NavBarButton>Create Account</NavBarButton>{" "}
                </Link>
              )}
            </div>
          </section>

          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <main className="contribute">
        <Navbar expand="lg" variant="light" className="navbar navbar-404">
          <Container>
            <Navbar.Brand>
              <Link to={isAuthenticated ? "/dashboard" : "/"}>
                <div className="logo">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1576741967/tudo_logo_jtzeop.png"
                    alt="notFound"
                  />
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {isAuthenticated ? (
                <Nav className="ml-auto">
                  <Link to="/">
                    <SubmitButton
                      className="font-weight-lighter sign-up-btn-landing"
                      boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48);"
                      backgroundColor="#7594FB"
                      borderColor="transparent"
                      width="150px"
                      Height="45px"
                      onClick={() => {
                        logoutUser();
                      }}
                    >
                      Log out
                    </SubmitButton>
                  </Link>
                </Nav>
              ) : (
                <Nav className="ml-auto">
                  <Link to="/login">
                    <NavBarButton>LOGIN</NavBarButton>
                  </Link>
                  <Link to="/signup">
                    <SubmitButton
                      className="font-weight-lighter sign-up-btn-landing"
                      boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48);"
                      backgroundColor="#7594FB"
                      borderColor="transparent"
                      width="150px"
                      Height="45px"
                    >
                      Sign Up
                    </SubmitButton>
                  </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <section className="top-level-404">
          <h2>Thank You!</h2>
          <div
            className={
              isLoading
                ? "linear-background mb-3"
                : "amount-raised-card-sucess mb-3"
            }
          >
            {isLoading && !ContributionDetails ? (
              ""
            ) : (
              <>
                <p className="font-weight-bold text-left dsefwe mt-0 mb-0 p-3">
                  <span className="bold-otouke">Amount raised </span>
                </p>

                <div className="p-4">
                  <p className="mt-2 mb-2">
                    {" "}
                    <span className="bold-otouke">
                      N{" "}
                      {numberWithCommas(
                        ContributionDetails.contribution_current / 100
                      )}
                    </span>{" "}
                    /
                    <span className="dfdiosfsxz">
                      {" "}
                      {numberWithCommas(
                        ContributionDetails.contribution_target / 100
                      )}
                    </span>
                  </p>
                  <hr className="mt-3 mb-3" />
                  <p className="mt-2 mb-2">
                    {" "}
                    {ContributionDetails.contribution_current_percentage}%
                    achieved
                  </p>
                  <ProgressBar
                    now={ContributionDetails.contribution_current_percentage}
                    variant="success"
                    className="mt-3"
                  />
                </div>

                <p className="text-left dsefwe mt-0 mb-0 p-3">
                  <span className="bold-otouke">
                    {tudoDetails.contributions}
                  </span>
                  &nbsp;
                  {tudoDetails.contributions > 1
                    ? "contributions made so far"
                    : "contribution made so far"}
                </p>
              </>
            )}
          </div>

          {isLoading || isFetchedError ? (
            ""
          ) : (
            <>
              <p className="text-center">
                Your contribution of ₦
                {ContributionDetails.contributed_amount / 100} has been added to{" "}
                {ContributionDetails.beneficiary_name}'s goal
              </p>
              <div className="text-center y-contri">
                Your contribution towards this goal was successful! You can do
                more for “{ContributionDetails.beneficiary_name}” by sharing
                this goal with your social circle. Also, you can join in on the
                fun by creating an account on Tudo so you can achieve your own
                goals faster!
              </div>
            </>
          )}
          <div className="btn-holder-sucess">
            <SubmitButton
              className="dsknmfleksnfjks d-inline-block mr-3"
              backgroundColor="#7594FB"
              borderColor="transparent"
              boxShadow="0 5px 10px 0 rgba(165, 186, 255, 0.48)"
              width="150px"
              Height="45px"
              onClick={
                tudoDetails
                  ? () => setShowShareModal(true)
                  : () => setShowShareModal(false)
              }
            >
              Share Goal
            </SubmitButton>
            {isAuthenticated ? (
              <Link to="/dashboard" className="djksnckjsncs">
                {" "}
                <NavBarButton>Create Tudo</NavBarButton>{" "}
              </Link>
            ) : (
              <Link to="/signup" className="djksnckjsncs">
                {" "}
                <NavBarButton>Create Account</NavBarButton>{" "}
              </Link>
            )}
          </div>
        </section>

        <Footer />

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
                {tudoDetails ? (
                  <>
                    <FacebookShareButton
                      url={host}
                      quote={tudoDetails.goal_description}
                    >
                      <div className="share-tudo-modal-body-socials-link">
                        <div className="share-tudo-modal-body-socials-link-img">
                          <img src={facebook} alt="" />
                        </div>
                        <p>Facebook</p>
                      </div>
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={host}
                      quote={tudoDetails.goal_description}
                    >
                      <div className="share-tudo-modal-body-socials-link">
                        <div className="share-tudo-modal-body-socials-link-img twitter">
                          <img src={twitter} alt="" />
                        </div>
                        <p>Twitter</p>
                      </div>
                    </TwitterShareButton>
                    <a
                      href={`mailto:?subject=Help me meet my goal, &body=${tudoDetails.goal_description} ${host}`}
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
                {<input type="text" value={`${host}`} onChange={() => {}} />}
                <Clipboard
                  onSuccess={copySuccess}
                  onError={copyFailure}
                  data-clipboard-text={`${host}`}
                >
                  Copy Link
                </Clipboard>
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </>
  );
};

export default SucessPage;
