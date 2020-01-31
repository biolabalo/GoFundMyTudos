import React from "react";
import "./AdminNavbar.scss";

export const AdminNavbar = ({ userProfile, isUserProfileEmpty, title }) => {
  return (
    <>
      <div className="admin-navbar">
        <div className="admin-navbar-container">
          <div className="admin-navbar-title">
            <h3>{title}</h3>
          </div>
          <div className="admin-navbar-profile">
            <div>
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1576590167/USER_IMAGE_tko5rq.png"
                alt="user"
              />
            </div>
            <div>
              <div>{isUserProfileEmpty ? "" : <p>Adeniyi Adeyokunnu</p>}</div>
            </div>
            <div>
              <i
                className="fas fa-chevron-down"
                style={{ color: "#000D37B3", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
