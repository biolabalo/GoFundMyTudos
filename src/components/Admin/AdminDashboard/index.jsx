import React from "react";
import AdminLayout from "../AdminLayout";
import SummaryComponent from "../AdminDashboardComponents/SummaryComponent";
// import MainDashboardComponent from "./AdminDashboardComponents/MainDashboardComponent";
import "./AdminDashboard.scss";

export class AdminDashboard extends React.Component {
  state = {
    filter: "Last 30 Days"
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <AdminLayout props={this.props} window={window} title="Dashboard">
          <div className="admin-dashboard">
            <div className="admin-dashboard-container">
              <div className="admin-dashboard-filter">
                <p>Showing Results for </p>
                <div className="admin-dashboard-filter-toggle">
                  <p>{filter}</p>
                  <i
                    className="fas fa-chevron-down"
                    style={{ color: "#000D37B3", marginTop: "1px" }}
                  />
                </div>
              </div>
              <div className="admin-dashboard-summary-container">
                <div className="admin-dashboard-summary">
                  <SummaryComponent />
                </div>
              </div>
              <div className="admin-dashboard-main-container">
                <div className="admin-dashboard-main">
                  {/*<MainDashboardComponent />*/}
                  <p>Select a tab to view details</p>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default AdminDashboard;
