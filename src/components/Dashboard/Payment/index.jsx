import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import BankComponent from "./BankComponent";
import "../dashboard.scss";
import "./payment.scss";
import PaymentComponent from "./PaymentComponent";

const PaymentTab = () => {
  const [isTabOneActive, setActiveTab] = useState({ tab_one_Active: true });
  const { colorPalete } = useSelector(state => state.auth.userThemePrefrences);
  const [isBankHovered, setIsBankHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { tab_one_Active } = isTabOneActive;

  useEffect(() => {
    if (tab_one_Active) {
      document
        .querySelector(".payment-cards-btn")
        .setAttribute("style", `background-color:${colorPalete} !important`);
      document
        .querySelector(".payment-banks-btn")
        .setAttribute("style", `color: ${colorPalete} !important`);
    }
    if (!tab_one_Active) {
      document
        .querySelector(".payment-cards-btn")
        .setAttribute("style", `color:${colorPalete} !important`);
      document
        .querySelector(".payment-banks-btn")
        .setAttribute("style", `background-color:${colorPalete} !important`);
    }

    return () => {};
  }, [tab_one_Active, colorPalete]);

  return (
    <div className="mt-4 payment-btn-holder">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link
              className="payment-cards-btn"
              eventKey="first"
              onClick={() => {
                setActiveTab({ tab_one_Active: true });
                setIsCardHovered(false);
              }}
            >
              Cards
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="payment-banks-btn"
              eventKey="second"
              onClick={() => {
                setActiveTab({ tab_one_Active: false });
                setIsBankHovered(false);
              }}
            >
              Banks
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="first">
            <PaymentComponent
              colorPalete={colorPalete}
              setIsCardHovered={setIsCardHovered}
              isCardHovered={isCardHovered}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <BankComponent
              colorPalete={colorPalete}
              setIsBankHovered={setIsBankHovered}
              isBankHovered={isBankHovered}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};
export default PaymentTab;
