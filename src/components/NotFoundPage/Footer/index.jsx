import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./footer.scss";

import apple from "../../../images/app-store.png";
import google from "../../../images/google-play.png";
import facebook from "../../../images/facebook.png";
import instagram from "../../../images/instagram.png";
import linkedin from "../../../images/linkedin.png";
import twitter from "../../../images/twitter.png";

const Footer = ({ history: { location } }) => {
  return (
    <div className="footer2">
      <div className="footer2-container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="footer-container-left">
              <div className="footer-container-left-logo"></div>
              <p>
                Tudo is a social financial platform that enables users to
                achieve their goals by increasing their savings with the help of
                family and friends
              </p>
              <div className="footer-container-left-links">
                <Link to="#">Contact Support</Link>
                <Link to="#">Legal</Link>
                <Link to="#">Privacy policy</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="footer-container-right">
              <div className="footer-container-right-download">
               
                {  location.pathname ===  "/404" ? "" :  <> <div>
                  <img src={google} alt="" />
                </div>
                <div>
                  <img src={apple} alt="" />
                </div>  </> }
               
              </div>
              <div className="footer-container-right-socials">
                <div>
                  <img src={facebook} alt="" />
                </div>
                <div>
                  <img src={instagram} alt="" />
                </div>
                <div>
                  <img src={linkedin} alt="" />
                </div>
                <div>
                  <img src={twitter} alt="" />
                </div>
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

export default  withRouter(Footer);
