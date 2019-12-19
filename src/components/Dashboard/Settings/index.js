import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import Sidebar from "../../Sidebar/";
import AuthNavBar from "../../commons/AuthNavBar";
import WalletImage from "../../../images/wallet.png";
import Display from "../Display";
import PaymentTab from "../Payment";

const Settings = ({ history }) => {
  const [isTabOneActive, setActiveTab] = useState({ tab_one_Active: true });
  const { tab_one_Active } = isTabOneActive;

  const { colorPalete } = useSelector(state => state.auth.userThemePrefrences);

  useEffect(() => {
    if (tab_one_Active) {
      document
        .querySelector("#controlled-tab-example-tab-home")
        .setAttribute(
          "style",
          `border-bottom: 4px solid ${colorPalete} !important;color:${colorPalete} !important`
        );
      document
        .querySelector("#controlled-tab-example-tab-profile")
        .setAttribute("style", `color: #aeb2c4 !important`);
    }
    if (!tab_one_Active) {
      document
        .querySelector("#controlled-tab-example-tab-home")
        .setAttribute("style", `color:#aeb2c4 !important`);
      document
        .querySelector("#controlled-tab-example-tab-profile")
        .setAttribute(
          "style",
          `border-bottom: 4px solid ${colorPalete} !important;color: ${colorPalete} !important`
        );
    }

    return () => {};
  }, [tab_one_Active, colorPalete]);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(script);
    // eslint-disable-next-line no-console
    script.onload = () => console.log("paystack loaded");
  });

  return (
    <div className="tudu">
      <div className="tudu-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="tudu-body">
        <AuthNavBar />
        <div className="display-body-content">
          <div className="tudu-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>
          <div className="display-view-dashboard">
            <section className="payment-view-dashboard">
              <Tabs
                id="controlled-tab-example"
                className="payment-tabs"
                onSelect={() =>
                  setActiveTab({ tab_one_Active: !tab_one_Active })
                }
              >
                <Tab eventKey="home" title="Payments">
                  <PaymentTab />
                </Tab>
                <Tab eventKey="profile" title="Display">
                  <div className="pt-2">
                    <Display />
                  </div>
                </Tab>
              </Tabs>
            </section>
            <img
              src={WalletImage}
              alt="wallet"
              className="payment-wallet-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
