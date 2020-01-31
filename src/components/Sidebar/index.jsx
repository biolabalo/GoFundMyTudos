import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./sidebar.scss";

const Sidebar = ({ path }) => {
  const pageURL = path ? path.location.pathname : "/dashboard";
  const { colorPalete } = useSelector(state => state.auth.userThemePrefrences);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link to="/dashboard">
            <img src="https://res.cloudinary.com/xerdetech/image/upload/v1576741967/tudo_logo_jtzeop.png" />
          </Link>
        </div>
        <div
          className="sidebar-nav"
          style={{ borderTop: `2px solid ${colorPalete}` }}
        >
          <Nav
            variant="pills"
            defaultActiveKey="/dashboard"
            className="flex-column pt-4"
          >
            <NavLink
              to="/dashboard"
              style={
                pageURL === "/dashboard"
                  ? { color: "#ffff", background: colorPalete }
                  : { color: "#717ba0" }
              }
            >
              <span>
                <i className="fas fa-home"></i>
              </span>{" "}
              Home
            </NavLink>
            <NavLink
              to="/dashboard/tudo"
              style={
                pageURL.startsWith("/dashboard/tudo")
                  ? { color: "#ffff", background: colorPalete }
                  : { color: "#717ba0" }
              }
            >
              <span>
                <i className="fas fa-clipboard-list"></i>
              </span>{" "}
              My Tudo
            </NavLink>
            <NavLink
              to="/dashboard/savings"
              style={
                pageURL.startsWith("/dashboard/savings")
                  ? { color: "#ffff", background: colorPalete }
                  : { color: "#717ba0" }
              }
            >
              <span>
                <i className="fas fa-piggy-bank"></i>
              </span>{" "}
              Savings
            </NavLink>
            <NavLink
              to="/dashboard/history"
              style={
                pageURL === "/dashboard/history"
                  ? { color: "#ffff", background: colorPalete }
                  : { color: "#717ba0" }
              }
            >
              <span>
                <i className="fas fa-list-alt"></i>
              </span>{" "}
              History
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              style={
                pageURL === "/dashboard/settings"
                  ? { color: "#ffff", background: colorPalete }
                  : { color: "#717ba0" }
              }
            >
              <span>
                <i className="fas fa-cog"></i>
              </span>{" "}
              Settings
            </NavLink>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
