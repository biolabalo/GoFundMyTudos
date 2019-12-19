import React from "react";
import Sidebar from "../../../Sidebar";
import AuthNavBar from "../../../commons/AuthNavBar";

const Active = () => {
  const history = window;

  return (
    <div>
      <AuthNavBar />
      <div className="savings-body">
        <div className="savings-body-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="savings-body-content">
          <h2>Active</h2>
        </div>
      </div>
    </div>
  );
};

export default Active;
