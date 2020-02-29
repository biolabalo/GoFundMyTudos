import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

import apple from "../../images/app-store.png";
import google from "../../images/google-play.png";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="footer-container-left">
              <div className="footer-container-left-logo">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/xerdetech/image/upload/v1577547782/e16efrtxkc0ukhspc3yq.png"
                    alt=""
                  />
                </Link>
              </div>
              <p>
                Tudo is a social financial platform that enables users to
                achieve their goals by increasing their savings with the help of
                family and friends
              </p>
              <div className="footer-container-left-links">
                <Link to="#">Contact Support</Link>
                <Link to="#">Legal</Link>
                <Link to="/policy">Privacy policy</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="footer-container-right">
              <div className="footer-container-right-download">
                <div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.tudo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={google} alt="google" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://apps.apple.com/ng/app/my-tudo/id1498060586"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={apple} alt="apple" />
                  </a>
                </div>
              </div>
              <div className="footer-container-right-socials">
                <a
                  href="https://www.facebook.com/mytudoapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={facebook} alt="facebook" />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/mytudo.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={instagram} alt="instagram" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/showcase/officialtudoapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={linkedin} alt="" />
                  </div>
                </a>
                <a
                  href="https://twitter.com/MyTudoapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={twitter} alt="" />
                  </div>
                </a>
              </div>
              <div className="footer-container-right-contact">
                <p>(409)388-4384 | (977)778-3805</p>
                <p>
                  Prince Samuel Adedoyin Close by Mercedes Benz, Ikate, Lekki
                  Lagos, Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
