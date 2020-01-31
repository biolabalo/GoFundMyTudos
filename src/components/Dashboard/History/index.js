import React from "react";

import Sidebar from "../../Sidebar/";
import Bottombar from "../../Bottombar";
import AuthNavBar from "../../commons/AuthNavBar";
import TransactionHistory from "../../TransactionHistory";

const HistoryComponent = () => {
  const history = window;

  return (
    <div className="tudu">
      <div className="tudu-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="tudu-bottombar">
        <Bottombar path={history} />
      </div>
      <div className="tudu-body">
        <AuthNavBar />
        <div className="history-body-content">
          <div className="tudu-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;
