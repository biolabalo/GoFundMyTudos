import React from "react";
import { NavLink } from "react-router-dom";

import "./bottombar.scss";

const Bottombar = () => (
  <div className="bottombar">
    <nav>
      <NavLink exact to="/dashboard" activeClassName="active">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </NavLink>
      <NavLink exact to="/dashboard/tudo" activeClassName="active">
        <i className="fas fa-clipboard-list"></i>
        <span>My Tudo</span>
      </NavLink>
      <NavLink exact to="/dashboard/savings" activeClassName="active">
        <i className="fas fa-piggy-bank"></i>
        <span>Savings</span>
      </NavLink>
      <NavLink exact to="/dashboard/history" activeClassName="active">
        <i className="fas fa-list-alt"></i>
        <span>History</span>
      </NavLink>
      <NavLink exact to="/dashboard/settings" activeClassName="active">
        <i className="fas fa-cog"></i>
        <span> Settings</span>
      </NavLink>
    </nav>
  </div>
);

export default Bottombar;
