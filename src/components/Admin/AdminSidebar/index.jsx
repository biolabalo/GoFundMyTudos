import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import collapseImage from "../../../images/menu.svg";
import expandMenu from "../../../images/menuExpanded.svg";
import dashboard from "../../../images/dashboard.svg";
import transactions from "../../../images/ic_credit_card_24px.svg";
import balance from "../../../images/ic_receipt_24px.svg";
import customers from "../../../images/ic_assignment_ind_24px.svg";
import insights from "../../../images/pie-chart.svg";
import recentActivities from "../../../images/ic_notifications_active_24px.svg";
import activityLog from "../../../images/ic_content_paste_24px.svg";
import settings from "../../../images/ic_settings_24px.svg";
import "./adminSidebar.scss";

export class AdminSidebar extends React.Component {
  state = {
    collapse: false,
    pageURL: "/admin/dashboard",
    selectedStyle: {
      color: "#ffff",
      background: "#ffffff4d",
      borderRadius: "10px 0 0 10px"
    }
  };

  componentDidMount() {
    const { window } = this.props;

    this.setState({
      ...this.state,
      pageURL: window.location.pathname
    });
  }

  toggleSidebar = () => {
    this.setState({
      ...this.state,
      collapse: !this.state.collapse
    });
  };

  render() {
    const { pageURL, selectedStyle, collapse } = this.state;

    return (
      <>
        <Nav
          variant="pills"
          defaultActiveKey="/dashboard"
          className={collapse ? "admin-sidebar-collapsed" : "admin-sidebar"}
        >
          <div
            onClick={() => this.toggleSidebar()}
            className={
              collapse
                ? "admin-sidebar-sections-collapsed-button"
                : "admin-sidebar-sections-expand"
            }
          >
            <img src={collapse ? expandMenu : collapseImage} alt="" />
            {!collapse && <p>Collapse Menu</p>}
          </div>

          <div
            className={
              collapse
                ? "admin-sidebar-sections-collapsed"
                : "admin-sidebar-sections"
            }
          >
            <NavLink
              to="/admin/dashboard"
              style={pageURL === "/admin/dashboard" ? selectedStyle : null}
            >
              <img src={dashboard} alt="" />
              {!collapse && <p>Dashboard</p>}
            </NavLink>
            <NavLink
              to="#"
              style={pageURL.startsWith("#") ? selectedStyle : {}}
            >
              <img src={transactions} alt="" />
              {!collapse && <p>Transactions</p>}
            </NavLink>
            <NavLink to="#" style={pageURL === "#" ? selectedStyle : {}}>
              <img src={balance} alt="" />
              {!collapse && <p>Balance History</p>}
            </NavLink>
            <NavLink to="#" style={pageURL === "#" ? selectedStyle : {}}>
              <img src={customers} alt="" />
              {!collapse && <p>Customers</p>}
            </NavLink>
            <NavLink to="#" style={pageURL === "#" ? selectedStyle : {}}>
              <img src={insights} alt="" />
              {!collapse && <p>Insights</p>}
            </NavLink>
            <NavLink to="#" style={pageURL === "#" ? selectedStyle : {}}>
              <img src={recentActivities} alt="" />
              {!collapse && <p>Recent Activities</p>}
            </NavLink>
          </div>

          <div
            className={
              collapse
                ? "admin-sidebar-sections-collapsed"
                : "admin-sidebar-sections"
            }
          >
            <NavLink to="#" style={pageURL === "#" ? selectedStyle : {}}>
              <img src={activityLog} alt="" />
              {!collapse && <p>Activity Log</p>}
            </NavLink>
            <NavLink to="#" style={pageURL === "#" ? selectedStyle : {}}>
              <img src={settings} alt="" />
              {!collapse && <p>Settings</p>}
            </NavLink>
          </div>
        </Nav>
      </>
    );
  }
}

export default AdminSidebar;
