import React from "react";
import totalWithdrawalIcon from "../../../images/admin_dashboard_total_withdrawal.svg";
import totalUsersIcon from "../../../images/admin_dashboard_total_users.svg";
import totalRevenueIcon from "../../../images/admin_dashboard_total_revenue.svg";
import totalWebsiteVisitsIcon from "../../../images/admin_dashboard_total_website_visits.svg";
import totalAppDownloadsIcon from "../../../images/admin_dashboard_total_app_downloads.svg";
import upperRightArrow from "../../../images/up-right.png";

import "./SummaryComponent.scss";

export class SummaryComponent extends React.Component {
  state = {
    totalUsers: "90 000",
    totalRevenue: "2,000,000",
    totalWithdrawals: "800,000",
    totalWebsiteVisits: "120,000",
    totalAppDownloads: "250,000"
  };

  render() {
    const {
      totalUsers,
      totalRevenue,
      totalWithdrawals,
      totalWebsiteVisits,
      totalAppDownloads
    } = this.state;
    return (
      <div className="summary-component">
        <div className="summary-component-pod">
          <img
            className="summary-component-pod-expand"
            src={upperRightArrow}
            alt=""
          />
          <img src={totalUsersIcon} alt="" />
          <div className="summary-component-pod-text">
            <p>Total Users</p>
            <p>{totalUsers}</p>
          </div>
        </div>
        <div className="summary-component-pod">
          <img
            className="summary-component-pod-expand"
            src={upperRightArrow}
            alt=""
          />
          <img src={totalRevenueIcon} alt="" />
          <div className="summary-component-pod-text">
            <p>Total Revenue</p>
            <p>
              <sup>₦</sup>
              {totalRevenue}
            </p>
          </div>
        </div>
        <div className="summary-component-pod">
          <img
            className="summary-component-pod-expand"
            src={upperRightArrow}
            alt=""
          />
          <img src={totalWithdrawalIcon} alt="" />
          <div className="summary-component-pod-text">
            <p>Total Withdrawals</p>
            <p>
              <sup>₦</sup>
              {totalWithdrawals}
            </p>
          </div>
        </div>
        <div className="summary-component-pod">
          <img
            className="summary-component-pod-expand"
            src={upperRightArrow}
            alt=""
          />
          <img src={totalWebsiteVisitsIcon} alt="" />
          <div className="summary-component-pod-text">
            <p>Total Website Visits</p>
            <p>{totalWebsiteVisits}</p>
          </div>
        </div>
        <div className="summary-component-pod">
          <img
            className="summary-component-pod-expand"
            src={upperRightArrow}
            alt=""
          />
          <img src={totalAppDownloadsIcon} alt="" />
          <div className="summary-component-pod-text">
            <p>Total App Downloads</p>
            <p>{totalAppDownloads}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SummaryComponent;
