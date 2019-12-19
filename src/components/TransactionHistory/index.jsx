import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../images/empty.svg";

import "../Dashboard/dashboard.scss";
import "./transactionHistory.scss";

const noTransactionView = () => (
  <div className="no-transaction-component">
    <Logo />
    <p className="mb-0 text-center">
      <small>Nothing to see here. You haven’t carried out</small>
    </p>
    <p className="mt-0 any-transactions-yet">
      <small>any transactions yet</small>
    </p>
  </div>
);

const TransactionHistory = () => {
  const [isTabOneActive, setActiveTab] = useState({ tab_one_Active: true });
  const { tab_one_Active } = isTabOneActive;
  const { colorPalete } = useSelector(state => state.auth.userThemePrefrences);

  useEffect(() => {
    Array.from(
      document.querySelectorAll(".history-body-content .nav-item.nav-link")
    ).forEach(eachTab => {
      eachTab.setAttribute("style", `color:#aeb2c4 !important`);
    });

    document
      .querySelector(".history-body-content .active")
      .setAttribute(
        "style",
        `border-bottom: 4px solid ${colorPalete} !important;color:${colorPalete} !important`
      );
  }, [tab_one_Active, colorPalete]);

  return (
    <Tabs onSelect={() => setActiveTab({ tab_one_Active: !tab_one_Active })}>
      <Tab eventKey={1} title="All" tabClassName="dashboard-tab-all">
        {noTransactionView()}
      </Tab>
      <Tab eventKey={2} title="Savings" tabClassName="dashboard-tab-savings">
        {noTransactionView()}
      </Tab>
      <Tab
        eventKey={3}
        title="Withdrawals"
        tabClassName="dashboard-tab-withdrawals"
      ></Tab>
    </Tabs>
  );
};

export default TransactionHistory;
