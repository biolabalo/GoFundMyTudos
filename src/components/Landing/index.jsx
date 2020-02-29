import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import NavBar from "../commons/Navbar";
import Footer from "../Footer";
import CreateToDo from "../LearnMore/CreateToDo";
import Savings from "../LearnMore/Savings";
import Engage from "../LearnMore/Engage";
import Reach from "../LearnMore/Reach";
import Celebrate from "../LearnMore/Celebrate";

import "../PurpleButton/purpleButton.scss";
import "./landing.scss";

import sect1Image from "../../images/sect-1-image.png";
import sect1Image2 from "../../images/sect-1-image-2.png";
import sect1Image3 from "../../images/sect-1-image-3.png";
import sect1Image4 from "../../images/sect-1-image-4.png";
import sect2Image from "../../images/sect-2.png";
import sect2Image2 from "../../images/sect-2-2.png";
import sect3Image from "../../images/sect-3-image.png";
import sect4Image from "../../images/sect-4-image.png";
import sect4Image2 from "../../images/sect-4-image-2.png";
import sect5Image from "../../images/sect-5-image.png";
import sect6Image from "../../images/sect-6-image.png";
import sect7Image from "../../images/sect-7-image.png";
import sect7Image2 from "../../images/sect-7-image-2.png";

import apple from "../../images/app-store.png";
import google from "../../images/google-play.png";

const Landing = () => {
  const [createTudo, setCreateTudo] = useState(false);
  const [savingsTudo, setSavingsTudo] = useState(false);
  const [engageTudo, setEngageTudo] = useState(false);
  const [reachTudo, setReachTudo] = useState(false);
  const [celebrateTudo, setCelebrateTudo] = useState(false);

  const openModal = e => {
    e.preventDefault();
    if (e.target.name === "createTudo") {
      return setCreateTudo(true);
    }
    if (e.target.name === "savingsTudo") {
      return setSavingsTudo(true);
    }
    if (e.target.name === "engageTudo") {
      return setEngageTudo(true);
    }
    if (e.target.name === "reachTudo") {
      return setReachTudo(true);
    }
    if (e.target.name === "celebrateTudo") {
      return setCelebrateTudo(true);
    }
  };

  const closeModal = modalName => () => {
    if (modalName === "createTudo") {
      return setCreateTudo(false);
    }
    if (modalName === "savingsTudo") {
      return setSavingsTudo(false);
    }
    if (modalName === "engageTudo") {
      return setEngageTudo(false);
    }
    if (modalName === "reachTudo") {
      return setReachTudo(false);
    }
    if (modalName === "celebrateTudo") {
      return setCelebrateTudo(false);
    }
  };

  return (
    <div>
      <div className="landing">
        <NavBar isAuthenticated={false} />
        <div className="landing-sect-1">
          <div className="landing-sect-1-container">
            <div className="row no-gutters">
              <div className="col-md-5">
                <div className="landing-sect-1-bottom">
                  <div className="landing-sect-1-bottom-header">
                    <h1>Achieve your goals faster on Tudo</h1>
                    <p>
                      Make your dreams a reality with <strong>Tudo!</strong>{" "}
                      Create a list of goals, share your goals with your loved
                      ones and achieve those goals faster
                    </p>
                  </div>
                  <div className="landing-sect-1-bottom-download">
                    <div className="landing-sect-1-bottom-download-icon">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.tudo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={google} alt="" />
                      </a>
                    </div>
                    <div className="landing-sect-1-bottom-download-icon">
                      <a
                        href="https://apps.apple.com/ng/app/my-tudo/id1498060586"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={apple} alt="apple" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="landing-sect-1-right">
                  <div className="landing-sect-1-background">
                    <div className="landing-sect-1-background-image1">
                      <img src={sect1Image2} alt="" />
                    </div>
                    <div className="landing-sect-1-background-image2">
                      <img src={sect1Image3} alt="" />
                    </div>
                  </div>
                  <div className="landing-sect-1-right-image">
                    <img src={sect1Image} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="landing-sect-1-image">
              <img src={sect1Image4} alt="" />
            </div>
          </div>
        </div>
        <div className="landing-sect-2">
          <div className="landing-sect-2-container">
            <div className="landing-sect-2-container-image">
              <img src={sect2Image2} alt="" />
            </div>
            <div className="row no-gutters">
              <div className="col-md-7">
                <div className="landing-sect-2-container-holder">
                  <div className="landing-sect-2-container-holder-header">
                    <h3>How it works</h3>
                  </div>
                  <div className="landing-sect-2-container-holder-group">
                    <div className="landing-sect-2-container-holder-box"></div>
                    <div className="landing-sect-2-container-holder-image">
                      <img src={sect2Image} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <Modal
                  dialogClassName="landing"
                  show={createTudo}
                  onHide={closeModal("createTudo")}
                  size="xl"
                  centered
                  animation
                >
                  <div className="landing-modal-close">
                    <button onClick={closeModal("createTudo")}>X</button>
                  </div>
                  <CreateToDo />
                </Modal>
                <div className="landing-sect-2-container-content">
                  <h2>
                    <span>Create a To-do list</span>
                  </h2>
                  <p>
                    Get started by creating a list of goals or dreams you’ll
                    like to achieve within a set period of time, on Tudo.
                  </p>
                  <button
                    className="purpleButton"
                    name="createTudo"
                    onClick={openModal}
                  >
                    LEARN MORE <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-sect-3">
          <Modal
            dialogClassName="landing"
            show={savingsTudo}
            onHide={closeModal("savingsTudo")}
            size="xl"
            centered
            animation
          >
            <div className="landing-modal-close">
              <button onClick={closeModal("savingsTudo")}>X</button>
            </div>
            <Savings />
          </Modal>
          <div className="landing-sect-3-container">
            <div className="row no-gutters">
              <div className="col-md-5">
                <div className="landing-sect-3-container-left">
                  <h2>
                    <span>Set a savings goal</span>
                  </h2>
                  <p>
                    We understand that some of your dreams are heavily dependent
                    on money. You can create a savings goal, set a target and
                    start saving towards your goal, all on Tudo.
                  </p>
                  <button
                    className="purpleButton"
                    name="savingsTudo"
                    onClick={openModal}
                  >
                    LEARN MORE <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="col-md-7">
                <div className="landing-sect-3-container-holder">
                  <div className="landing-sect-3-container-holder-box"></div>
                  <div className="landing-sect-3-container-holder-image">
                    <img src={sect3Image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-sect-4">
          <Modal
            dialogClassName="landing"
            show={engageTudo}
            onHide={closeModal("engageTudo")}
            size="xl"
            centered
            animation
          >
            <div className="landing-modal-close">
              <button onClick={closeModal("engageTudo")}>X</button>
            </div>
            <Engage />
          </Modal>
          <div className="landing-sect-4-container">
            <div className="landing-sect-4-container-image">
              <img src={sect4Image2} alt="" />
            </div>
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="landing-sect-4-container-holder-group">
                  <div className="landing-sect-4-container-holder">
                    <div className="landing-sect-4-container-holder-box"></div>
                    <div className="landing-sect-4-container-holder-image">
                      <img src={sect4Image} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="landing-sect-4-container-content">
                  <h2>
                    <span>Engage your family & friends</span>
                  </h2>
                  <p>
                    Invite your loved ones to help you increase your savings and
                    collaborate to make a big impact in your life.
                  </p>
                  <button
                    className="purpleButton"
                    name="engageTudo"
                    onClick={openModal}
                  >
                    LEARN MORE <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-sect-5">
          <Modal
            dialogClassName="landing"
            show={reachTudo}
            onHide={closeModal("reachTudo")}
            size="xl"
            centered
            animation
          >
            <div className="landing-modal-close">
              <button onClick={closeModal("reachTudo")}>X</button>
            </div>
            <Reach />
          </Modal>
          <div className="landing-sect-5-container">
            <div className="row no-gutters">
              <div className="col-md-5">
                <div className="landing-sect-5-container-left">
                  <h2>
                    <span>Reach your goals faster</span>
                  </h2>
                  <p>
                    With the help of your loved ones, your goals can be achieved
                    faster with just a click!
                  </p>
                  <button
                    className="purpleButton"
                    name="reachTudo"
                    onClick={openModal}
                  >
                    LEARN MORE <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="col-md-7">
                <div className="landing-sect-5-container-holder">
                  <div className="landing-sect-5-container-holder-box"></div>
                  <div className="landing-sect-5-container-holder-image">
                    <img src={sect5Image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-sect-6">
          <Modal
            dialogClassName="landing"
            show={celebrateTudo}
            onHide={closeModal("celebrateTudo")}
            size="xl"
            centered
            animation
          >
            <div className="landing-modal-close">
              <button onClick={closeModal("celebrateTudo")}>X</button>
            </div>
            <Celebrate />
          </Modal>
          <div className="landing-sect-6-container">
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="landing-sect-6-container-holder-group">
                  <div className="landing-sect-6-container-holder">
                    <div className="landing-sect-6-container-holder-box"></div>
                    <div className="landing-sect-6-container-holder-image">
                      <img src={sect6Image} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="landing-sect-6-container-content">
                  <h2>
                    <span>Celebrate your achievements</span>
                  </h2>
                  <p>
                    Celebrate your little or big wins and achievements and
                    appreciate everyone who helped you reach your goals faster,
                    by sending them a personalised thank you message with Tudu.
                  </p>
                  <button
                    className="purpleButton"
                    name="celebrateTudo"
                    onClick={openModal}
                  >
                    LEARN MORE <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-sect-7">
          <div className="landing-sect-7-container">
            <div className="row no-gutters">
              <div className="col-md-5">
                <div className="landing-sect-7-container-content">
                  <div className="landing-sect-7-container-content-box1">
                    <h4>It's easy</h4>
                  </div>
                  <div className="landing-sect-7-container-content-box2"></div>
                  <div className="landing-sect-7-container-content-box3">
                    <h4>It's fast</h4>
                  </div>
                  <div className="landing-sect-7-container-content-box4"></div>
                  <div className="landing-sect-7-container-content-box5">
                    <h4>It's fun</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="landing-sect-7-container-holder">
                  <div className="landing-sect-7-container-holder-image2">
                    <img src={sect7Image2} alt="" />
                  </div>
                  <div className="landing-sect-7-container-holder-image1">
                    <img src={sect7Image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Landing;
