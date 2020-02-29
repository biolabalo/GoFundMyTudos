import Routes from "./routing";
import React, { Fragment, Component, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IdleTimer from "react-idle-timer";

import axios from "./axios-instance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./redux/auth/authAction";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.idleTimer = null;
    this.state = {
      timeout: 600000,
      remaining: null,
      isIdle: false,
      lastActive: null,
      elapsed: null,
      isAuthenticated: "",
      backgroundColor: "",
      color: ""
    };

    // Bind event handlers and methods
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.onOtherIdle = this._onOtherIdle.bind(this);
    this.changeTimeout = this._changeTimeout.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(script);

    const {
      isAuthenticated,
      userThemePrefrences: { backgroundColor, color, colorPalete }
    } = this.props.auth;

    this.setState({
      isAuthenticated,
      backgroundColor,
      color
    });

    // eslint-disable-next-line no-console
    script.onload = () => console.log("paystack loaded");

    // set colorPalete as a global css variable
    document.documentElement.style.setProperty("--color-palette", colorPalete);

    this.setState({
      remaining: this.idleTimer.getRemainingTime(),
      lastActive: this.idleTimer.getLastActiveTime(),
      elapsed: this.idleTimer.getElapsedTime()
    });

    setInterval(() => {
      this.setState({
        remaining: this.idleTimer.getRemainingTime(),
        lastActive: this.idleTimer.getLastActiveTime(),
        elapsed: this.idleTimer.getElapsedTime()
      });
    }, 1000);
  }

  render() {
    const { isAuthenticated, backgroundColor, color } = this.state;

    const appToken = localStorage.getItem("TUDU_token");

    return (
      <BrowserRouter>
        <div>
          {appToken ? (
            <IdleTimer
              ref={ref => {
                this.idleTimer = ref;
              }}
              onActive={this.onActive}
              onIdle={this.onIdle}
              timeout={this.state.timeout}
              startOnLoad
            />
          ) : (
            <IdleTimer
              ref={ref => {
                this.idleTimer = ref;
              }}
              onActive={this.onActive}
              onIdle={this.onOtherIdle}
              timeout={this.state.timeout}
              startOnLoad
            />
          )}
        </div>
        <Fragment>
          <ToastContainer autoClose={false} />
          <main style={isAuthenticated ? { backgroundColor, color } : {}}>
            <Suspense fallback={<Spinner animation="grow" />}>
              <Switch>
                {" "}
                <Route component={Routes} />
              </Switch>
            </Suspense>
          </main>
        </Fragment>
      </BrowserRouter>
    );
  }

  _onActive = () => {
    this.setState({ isIdle: false });
  };

  _onIdle = () => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    this.setState({ isIdle: true });
    axios.post("/logout", config);

    localStorage.setItem("TUDU_token", "");
  };

  _onOtherIdle = () => {
    this.setState({ isIdle: false });
  };

  _changeTimeout = () => {
    this.setState({
      timeout: this.refs.timeoutInput.state.value()
    });
  };
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => ({
  loadUser: () => {
    dispatch(loadUser());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
