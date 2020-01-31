import React from "react";
import { connect } from "react-redux";
import AdminSidebar from "../AdminSidebar";
import AdminNavbar from "../AdminNavbar";

import "./AdminLayout.scss";

export class AdminLayout extends React.Component {
  render() {
    const {
      window,
      userProfile: { isUserProfileEmpty },
      userProfile,
      title
    } = this.props;

    return (
      <div className="admin-layout">
        <AdminSidebar window={window} />
        <div className="admin-layout-central">
          <AdminNavbar
            isUserProfileEmpty={isUserProfileEmpty}
            userProfile={userProfile}
            title={title}
          />
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    userProfile: state.loggedInUserProfile.userProfile
  };
};

export default connect(mapStateToProps)(AdminLayout);
