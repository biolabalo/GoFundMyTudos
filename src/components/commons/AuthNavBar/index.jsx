import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/authAction";
import { fetchUserData } from "../../../redux/userProfile/userProfileAction";
import { ADD_USER_NOTIFICATION } from "../../../redux/notification/notificationTypes";
import axios from "../../../axios-instance";
import "./header.scss";

const DashboardHeader = ({ history }) => {
  const { colorPalete } = useSelector(state => state.auth.userThemePrefrences);

  const dispatch = useDispatch();

  const {
    notification,
    isUserNotificationsloaded,
    notification_count
  } = useSelector(state => state.userNotication);

  const logoutUser = () => logout(history, dispatch);

  const {
    userProfile,
    isUserProfileEmpty,
    isFetchUserProfileError
  } = useSelector(state => state.loggedInUserProfile);

  useEffect(() => {
    if (isUserProfileEmpty && !isFetchUserProfileError) {
      fetchUserData(logout, history, dispatch);
    }
  }, [dispatch, history, isFetchUserProfileError, isUserProfileEmpty]);

  useEffect(() => {
    if (isUserNotificationsloaded) return;
    (async function() {
      try {
        const response = await axios.get("/user-notification");
        const { data } = response;

        dispatch({
          type: ADD_USER_NOTIFICATION,
          payload: data
        });
      } catch (err) {
        dispatch({
          type: ADD_USER_NOTIFICATION,
          payload: []
        });
      }
    })();
  }, [dispatch, isUserNotificationsloaded]);

  const popover = (
    <Popover id="popover-basic" className="auth-header-profile-popover">
      <Popover.Content>
        <ul>
          <li>
            <Link to="/profile" style={{ color: colorPalete }}>
              <i className="fas fa-user"></i> Profile
            </Link>
          </li>
          <hr />
          {axios.defaults.headers.common.Authorization ? (
            <li>
              <Link to="#" style={{ color: colorPalete }} onClick={logoutUser}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </Popover.Content>
    </Popover>
  );

  return (
    <div
      className="auth-header"
      style={{ borderBottom: `2px solid ${colorPalete}` }}
    >
      <div className="auth-header-space">
        <div className="auth-header-logo"></div>
        <div className="auth-header-right">
          <div className="auth-header-profile">
            <Link to="/user/notifications">
              {isUserNotificationsloaded &&
              notification &&
              notification_count ? (
                <div className="auth-header-profile-image float-left">
                  <i className="fas fa-bell bell-icon"></i>
                  <span className="badgecount">{notification_count}</span>
                </div>
              ) : (
                ""
              )}
            </Link>

            <div className="auth-header-profile-image">
              <img src={userProfile.profile_image} alt="user" />
            </div>
            <div className="auth-header-profile-name">
              {isUserProfileEmpty ? (
                ""
              ) : (
                <p>
                  {userProfile.first_name} {userProfile.last_name}
                </p>
              )}
            </div>
            <div className="auth-header-profile-chevron">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
              >
                <i
                  className="fas fa-chevron-down"
                  style={{ color: colorPalete }}
                ></i>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DashboardHeader);
