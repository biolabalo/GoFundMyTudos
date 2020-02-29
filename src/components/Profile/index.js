import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import "./profile.scss";
import Bottombar from "../Bottombar";
import AuthNavBar from "../commons/AuthNavBar";
import PersonaInfo from "./PersonaInfo";
import NextOfKin from "./NextOfKin";
import Security from "./Security";
import LinkAccount from "./LinkAccount";

const Profile = ({ history }) => {
  const [isTabOneActive, setActiveTab] = useState({ tab_one_Active: true });
  const { tab_one_Active } = isTabOneActive;
  const { colorPalete } = useSelector(state => state.auth.userThemePrefrences);

  useEffect(() => {
    Array.from(
      document.querySelectorAll("a.profile-tab-link.nav-item.nav-link")
    ).forEach(eachTab => {
      eachTab.setAttribute(
        "style",
        `color:#aeb2c4 !important; border: none !important`
      );
    });

    document.querySelector(".profile-body-content .active").setAttribute(
      "style",
      `border-bottom: 4px solid  ${colorPalete} !important;
        color:${colorPalete} !important;
        border: none`
    );
  }, [tab_one_Active, colorPalete]);
  return (
    <>
      <div className="tudu main-profile-container">
        <div className="main-profile-container-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="main-profile-container-bottombar">
        <Bottombar path={history} />
      </div>
        <div className="tudu-body">
          <AuthNavBar />
          <div className="profile-body-content">
            <div className="tudu-body-content-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>
            <Tabs
            className="edit-profile-nav"
              onSelect={() => setActiveTab({ tab_one_Active: !tab_one_Active })}
            >
              <Tab
                eventKey={1}
                title="Personal Information"
                tabClassName="profile-tab-link"
              >
                <PersonaInfo />
              </Tab>
              <Tab
                eventKey={2}
                title="Next of Kin"
                tabClassName="profile-tab-link"
              >
                <NextOfKin />
              </Tab>
              <Tab
                eventKey={3}
                title="Link Account"
                tabClassName="profile-tab-link"
              >
                <LinkAccount />
              </Tab>
              <Tab
                eventKey={4}
                title="Security"
                tabClassName="profile-tab-link"
              >
                <Security />
              </Tab>
            </Tabs>
          </div>
        </div>


      </div>
    </>
  );
};

export default Profile;
