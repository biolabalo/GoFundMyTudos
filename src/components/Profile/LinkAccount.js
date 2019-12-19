import React from "react";
import SocialIconButton from "../commons/styledComponents/SubmitButton";
import "./profile.scss";
import InstagramIcon from "../../images/InstagramIcon.png";
import FacebookIcon from "../../images/FacebookIcon.png";
import TwitterIcon from "../../images/TwitterIcon.png";

const LinkAccount = () => {
  return (
    <section className="profile-section">
      <div className="mt-3 mb-3 clearfix">
        <div className="float-left">
          <img src={FacebookIcon} alt="facebook" />
        </div>
        <div className="float-right">
          <SocialIconButton
            className=""
            backgroundColor="#2174D2"
            borderColor="transparent"
            width="150px"
            Height="45px"
            borderRadius="5px"
          >
            Link Account
          </SocialIconButton>
        </div>
      </div>
      <div className="mt-3 mb-3 clearfix">
        <div className="float-left">
          <img src={TwitterIcon} alt="facebook" />
        </div>
        <div className="float-right">
          <SocialIconButton
            className=""
            backgroundColor="#17A8F4"
            borderColor="transparent"
            width="150px"
            Height="45px"
            borderRadius="5px"
          >
            Link Account
          </SocialIconButton>
        </div>
      </div>
      <div className="mt-3 mb-3 clearfix">
        <div className="float-left">
          <img src={InstagramIcon} alt="facebook" />
        </div>
        <div className="float-right">
          <SocialIconButton
            className=""
            backgroundColor="#E8006E"
            borderColor="transparent"
            width="150px"
            Height="45px"
            borderRadius="5px"
          >
            Link Account
          </SocialIconButton>
        </div>
      </div>
    </section>
  );
};

export default LinkAccount;
