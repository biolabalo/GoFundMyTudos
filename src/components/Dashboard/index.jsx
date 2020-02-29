import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Bottombar from "../Bottombar";
import axios from "../../axios-instance";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.scss";
import AuthNavBar from "../commons/AuthNavBar";
import TuduFeedCard2 from "./TuduFeedCard/tuduFeedCard";

const Dashboard = () => {
  const [isContactSynced, setContactSynced] = useState("initial");
  const [contactDetails, setContactDetails] = useState(null);
  const dispatch = useDispatch();

  const history = window;

  const { userThemePrefrences, userFeed } = useSelector(state => state.auth);

  const { backgroundColor, color } = userThemePrefrences;

  const {
    userProfile,
    isUserProfileEmpty,
    isFetchUserProfileError
  } = useSelector(state => state.loggedInUserProfile);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    (async function() {
      if (userFeed.length) {
        setContactSynced("synced");
        return setContactDetails(userFeed);
      }

      try {
        const response = await axios.get("/my-tudo-feed");

        const {
          data: { message, status, data }
        } = response;

        if (status === 200 && message === "You have not sync contact") {
          return setContactSynced("not synced");
        }

        if (status === 200 && message === "Tudo Feeds retrieved successfully") {
          setContactSynced("synced");
          setContactDetails(data);

          if (data.length > 2) {
            return dispatch({ type: "ADD_TODO_FEEDS", payload: data });
          }
          return;
        }
      } catch (err) {
        setContactDetails([]);
      }
    })();
  }, [dispatch, userFeed]);

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
          <div className="dashboard-bottombar">
            <Bottombar path={history} />
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
                              Click here to set financial goals and collaborate
                              to achieve them faster
                            </p>
                          </div>
                          <div className="dashboard-body-content-sect1-tudo-card-icon">
                            <i className="fas fa-chevron-right"></i>
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
                            <i className="fas fa-chevron-right"></i>
                          </div>
                        </div>
                      </Link>

                      <Link to="/dashboard/market">
                        <div className="dashboard-body-content-sect1-market-card">
                          <div className="dashboard-body-content-sect1-market-card-text">
                            <h5>Tudo Market Place</h5>
                            <p>Coming Soon</p>
                          </div>
                          <div className="dashboard-body-content-sect1-savings-card-icon">
                            <i className="fas fa-chevron-right"></i>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="dashboard-body-content-sect2">
                  <div className="dashboard-body-content-sect2-header">
                    <h5>Tudo list Feed</h5>
                    {isContactSynced === "synced" &&
                    contactDetails &&
                    contactDetails.length > 2 ? (
                      <Link to="/dashboard/tudoFeeds">View All</Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="dashboard-body-content-sect2-tudufeed">
                    {isContactSynced === "not synced" ? (
                      <div className="dashboard-body-content-sect2-emptyfeed">
                        <p>
                          Sync Your contacts via our mobile app to see what your
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    {isContactSynced === "synced" &&
                    contactDetails &&
                    contactDetails.length > 0
                      ? contactDetails
                          .slice(0, 2)
                          .map((eachFeed, index) => (
                            <TuduFeedCard2 key={index} eachFeed={eachFeed} />
                          ))
                      : ""}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                {/* <div className="dashboard-body-content-sect1-friends">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
