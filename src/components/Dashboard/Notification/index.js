import React, { Component } from "react";
import Sidebar from "../../Sidebar/";
import Bottombar from "../../Bottombar";
import AuthNavBar from "../../commons/AuthNavBar";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import {
  MARK_AS_READ,
  ADD_ADDITIONAL_NOTIFICATION
} from "../../../redux/notification/notificationTypes";
import axios from "../../../axios-instance";
import { connect } from "react-redux";
import {
  Badge,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Button
} from "react-bootstrap";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

class Notification extends Component {
  state = {
    loader: (
      <Spinner
        animation="border"
        variant="primary"
        className="ml-5 mt-2 d-block"
      />
    )
  };

  addMoreData = async url => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      console.log(data);
      this.props.dispatch({
        type: ADD_ADDITIONAL_NOTIFICATION,
        payload: data
      });
    } catch (err) {
      this.setState({ loader: "" });
    }
  };

  markAsRead = async id => {
    try {
      const response = await axios.patch(`/user-notification/${id}`, {
        status: "read"
      });
      if (response.status === 200) {
        this.props.dispatch({
          type: MARK_AS_READ,
          payload: id
        });
      }
    } catch (err) {}
  };

  render() {
    const { dataFromRedux } = this.props;
    const { notification, notification_count ,isUserNotificationsloaded, isNext } = dataFromRedux;
    return (
      <div className="tudu">
        <div className="tudu-sidebar">
          <Sidebar path={window} />
        </div>
        <div className="tudu-bottombar">
          <Bottombar path={window} />
        </div>
        <div className="tudu-body">
          <AuthNavBar />
          <div className="history-body-content">
            <div className="tudu-body-content-image">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
                alt=""
              />
            </div>

            <div className="row">
              <div className="col-md-1">
                <div className="share-tudo-body-content-back">
                  <Link to="/dashboard">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              {isUserNotificationsloaded ? (
                <div className="col-md-9">
                  <h2 style={{ color: "rgb(74,83,113)" }}>Notifications</h2>

                  {notification ? (
                    <>
                      <ListGroup variant="flush">
                        <InfiniteScroll
                          dataLength={notification.length}
                          next={isNext ? () => this.addMoreData(isNext) : null}
                          hasMore={isNext ? true : false}
                          loader={this.state.loader}
                        >
                          {notification.map((each, index) => {
                            return (
                              <ListGroup.Item
                                key={index}
                                className="p-3 notifi-list-grp"
                                style={
                                  each.status === "NotificationStatus.unread"
                                    ? { background: "aliceblue" }
                                    : {}
                                }
                              >
                                <div className="media">
                                  <img
                                    src={each.triggered_by.profile_image}
                                    alt="John Doe"
                                    className="mr-3 rounded-circle notifi-img"
                                  />
                                  <div className="media-body">
                                    {each.notification_text}
                                    <p>
                                      <small>
                                        {moment(`${each.created_at}`).fromNow()}
                                      </small>
                                    </p>
                                  </div>
                                  {each.status ===
                                  "NotificationStatus.unread" ? (
                                    <OverlayTrigger
                                      placement="top"
                                      delay={{ show: 250, hide: 400 }}
                                      popperConfig={{
                                        modifiers: {
                                          preventOverflow: {
                                            enabled: false
                                          }
                                        }
                                      }}
                                      overlay={
                                        <Tooltip>
                                          Mark as read
                                        </Tooltip>
                                      }
                                    >
                                      <Badge
                                        onClick={() => this.markAsRead(each.id)}
                                        variant="info"
                                      >
                                        .
                                      </Badge>
                                    </OverlayTrigger>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </ListGroup.Item>
                            );
                          })}
                        </InfiniteScroll>

                      {isNext ? (
                        <Button variant="primary" className="mt-2 mb-2" onClick={this.addMoreData(isNext) }>
                        Load More <Badge variant="light">{notification_count}</Badge>
                          <span className="sr-only">Load More</span>
                        </Button>
                      ) : (
                        ""
                      )}
                      </ListGroup>

                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="col-md-9">
                  <h2 style={{ color: "rgb(74,83,113)" }}>Notifications</h2>
                  <div className="col-md-12 linear-background"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataFromRedux: state.userNotication
});

export default connect(mapStateToProps)(Notification);
