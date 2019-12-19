import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import "./dashboard.scss";
import AuthNavBar from "../commons/AuthNavBar";

const Dashboard = () => {
  const history = window;

  const { backgroundColor, color } = useSelector(
    state => state.auth.userThemePrefrences
  );

  const {
    userProfile,
    isUserProfileEmpty,
    isFetchUserProfileError
  } = useSelector(state => state.loggedInUserProfile);

  return (
    <div className="dashboard" style={{ backgroundColor, color }}>
      <div className="dashboard-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="dashboard-body">
        <AuthNavBar
          isUserProfileEmpty={isUserProfileEmpty}
          userProfile={userProfile}
        />
        <div className="dashboard-body-content">
          <div className="dashboard-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>
          <div className="dashboard-body-content-row">
            <div className="row">
              <div className="col-md-8">
                <div className="dashboard-body-content-sect1">
                  <div className="dashboard-body-content-sect1-welcome">
                    {isUserProfileEmpty && !isFetchUserProfileError ? (
                      ""
                    ) : (
                      <h2>Hi {userProfile.first_name}</h2>
                    )}
                    <p>Let’s get to work and smash some goals.</p>
                  </div>
                  <div className="dashboard-body-content-sect1-savings">
                    <div className="dashboard-body-content-sect1-savings-header">
                      <h5>Create a tudo list or start saving straight away</h5>
                    </div>
                    <div className="dashboard-body-content-sect1-savings-cards">
                      <Link to="/dashboard/tudo/new">
                        <div className="dashboard-body-content-sect1-tudo-card">
                          <div className="dashboard-body-content-sect1-tudo-card-text">
                            <h5>Create your Tudo list</h5>
                            <p>
                              Click here to create goals and achieve them faster
                            </p>
                          </div>
                          <div className="dashboard-body-content-sect1-tudo-card-icon">
                            <i className="fas fa-arrow-right"></i>
                          </div>
                        </div>
                      </Link>

                      <Link to="/dashboard/savings/plans">
                        <div className="dashboard-body-content-sect1-savings-card">
                          <div className="dashboard-body-content-sect1-savings-card-text">
                            <h5>Start a Savings plan</h5>
                            <p>Click here to save periodically</p>
                          </div>
                          <div className="dashboard-body-content-sect1-savings-card-icon">
                            <i className="fas fa-arrow-right"></i>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="dashboard-body-content-sect2">
                  <div className="dashboard-body-content-sect2-header">
                    <h5>Tudo list Feed</h5>
                    <Link to="#">View All</Link>
                  </div>
                  <div className="dashboard-body-content-sect2-tudufeed">
                    <div className="dashboard-body-content-sect2-emptyfeed">
                      <p>
                        Link your social media accounts to your tudo account so
                        you can see what your friends are up to
                      </p>
                      <Link
                        to="#"
                        className="dashboard-body-content-sect2-emptyfeed-link"
                      >
                        Link Account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="dashboard-body-content-sect1-friends">
                  <div className="dashboard-body-content-sect1-friends-card">
                    <div className="dashboard-body-content-sect1-friends-card-header">
                      <h5>Updates</h5>
                      <button>See All</button>
                    </div>
                    <div className="dashboard-body-content-sect1-friends-card-body">
                      <div className="dashboard-body-content-sect1-friends-card-body-empty">
                        <p>You have no recent updates yet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
