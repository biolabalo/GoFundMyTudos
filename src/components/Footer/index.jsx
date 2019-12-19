import React from "react";

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
              {/* <div className="footer-container-left-logo">
                <h2>
                  <span>Tudu.</span>
                </h2>
              </div> */}
              <p>
                Cras gravida bibendum dolor eu varius. Morbi fermentum velit
                nisl, eget vehicula lorem sodales eget. Donec quis volutpat
                orci. Sed ipsum felis, tristique id egestas et, convallis ac
                velit.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="footer-container-right">
              <div className="footer-container-right-download">
                <div>
                  <img src={google} alt="" />
                </div>
                <div>
                  <img src={apple} alt="" />
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
