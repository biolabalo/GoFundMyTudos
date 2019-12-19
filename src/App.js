import React, { Fragment, useEffect, Suspense, lazy } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import Verify from "./components/Verification";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Savings from "./components/Dashboard/Savings";
import Plans from "./components/Dashboard/Savings/Plans";
import Target from "./components/Dashboard/Savings/Target";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordResetChange from "./components/PasswordResetChange";
import { ToastContainer } from "react-toastify";
import Payment from "./components/Dashboard/Payment";
import History from "./components/Dashboard/History";
import Display from "./components/Dashboard/Display";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./redux/auth/authAction";
import PrivateRoute from "./routing/privateRoute";
import PublicRoute from "./routing/publicRoute";
import VerifyRoute from "./routing/verifyRoute";
import Active from "./components/Dashboard/Savings/Active";
import Tudo from "./components/Tudo/container/tudo";
import CreateNewTudu from "./components/Tudo/container/createTudo";
import Profile from "./components/Profile";
import SingleTudo from "./components/Tudo/SingleTudo";
import NotFoundPage from "./components/NotFoundPage";
import ShareTudo from "./components/Tudo/ShareTudo";

// lazy loaded/splitted Components
const Settings = lazy(() => import("./components/Dashboard/Settings"));
const Contribute = lazy(() => import("./components/Contribute"));

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const {
    isAuthenticated,
    userThemePrefrences: { backgroundColor, color }
  } = useSelector(state => state.auth);

  let routes;
  if (isAuthenticated) {
    routes = (
      <main style={{ backgroundColor, color }}>
        <Suspense
          fallback={<Spinner animation="grow" className="suspense-spinner" />}
        >
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboard/payment" component={Payment} />
            <PrivateRoute exact path="/dashboard/savings" component={Savings} />
            <PrivateRoute exact path="/dashboard/history" component={History} />
            <PrivateRoute exact path="/dashboard/display" component={Display} />
            <PrivateRoute exact path="/dashboard/tudo" component={Tudo} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/dashboard/tudo-single/:tudoid"
              component={SingleTudo}
            />
            <PrivateRoute
              exact
              path="/dashboard/settings"
              component={Settings}
            />
            <PrivateRoute
              exact
              path="/dashboard/tudo/new"
              component={CreateNewTudu}
            />
            <PrivateRoute
              exact
              path="/dashboard/savings/active/:id"
              component={Active}
            />
            <PrivateRoute
              exact
              path="/dashboard/savings/plans"
              component={Plans}
            />
            <PrivateRoute
              exact
              path="/dashboard/savings/plans/target"
              component={Target}
            />
            <Route exact path="/contribute/:todoID" component={Contribute} />
            <Route
              exact
              path="/dashboard/tudo/share/:shareID"
              component={ShareTudo}
            />
            <Route exact path="/404" component={NotFoundPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </main>
    );
  } else {
    routes = (
      <div>
        <Suspense fallback={<Spinner animation="grow" />}>
          <Switch>
            <PublicRoute exact path="/" component={Landing} />
            <PublicRoute exact path="/signup" component={SignUp} />
            <VerifyRoute exact path="/verify" component={Verify} />
            <PublicRoute exact path="/login" component={Login} />
            <Route
              exact
              path="/password-reset-request"
              component={PasswordResetRequest}
            />
            <Route
              exact
              path="/password-reset-change/:uiid/:token"
              component={PasswordResetChange}
            />
            <Route exact path="/contribute/:todoID" component={Contribute} />
            <Route exact path="/404" component={NotFoundPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    );
  }
  return (
    <Router>
      <Fragment>
        <ToastContainer autoClose={false} />
        {routes}
      </Fragment>
    </Router>
  );
}

export default App;
