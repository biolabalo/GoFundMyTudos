import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "../components/SignUp";
import Verify from "../components/Verification";
import Login from "../components/Login";
import Landing from "../components/Landing";
import PolicyPage from "../components/Landing/policyPage";
import Dashboard from "../components/Dashboard";
import Savings from "../components/Dashboard/Savings";
import Plans from "../components/Dashboard/Savings/Plans";
import Target from "../components/Dashboard/Savings/Target";
import Periodic from "../components/Dashboard/Savings/Periodic";
import PasswordResetRequest from "../components/PasswordResetRequest";
import PasswordResetChange from "../components/PasswordResetChange";
import Payment from "../components/Dashboard/Payment";
import History from "../components/Dashboard/History";
import Notification from "../components/Dashboard/Notification";
import TudoFeeds from "../components/Dashboard/TudoFeeds";
import Display from "../components/Dashboard/Display";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "../routing/privateRoute";
import PublicRoute from "../routing/publicRoute";
import VerifyRoute from "../routing/verifyRoute";
import Active from "../components/Dashboard/Savings/Active";
import Tudo from "../components/Tudo/container/tudo";
import CreateNewTudu from "../components/Tudo/container/createTudo";
import Profile from "../components/Profile";
import SingleTudo from "../components/Tudo/SingleTudo";
import NotFoundPage from "../components/NotFoundPage";
import ShareTudo from "../components/Tudo/ShareTudo";
import SucessPage from "../components/success";
import CreateToDo from "../components/LearnMore/CreateToDo";
import LearnMoreSavings from "../components/LearnMore/Savings";
import Engage from "../components/LearnMore/Engage";
import Reach from "../components/LearnMore/Reach";
import Celebrate from "../components/LearnMore/Celebrate";
import TopUpTudo from "../components/Tudo/TopUpTudo";
import WithdrawTudo from "../components/Tudo/WithdrawTudo";
import WithdrawSavings from "../components/WithdrawSavings";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminLogin from "../components/Admin/AdminLogin";
import Locked from "../components/Dashboard/Savings/Locked";
import EditTudo from "../components/Tudo/EditTudo";
import SingleSavings from "../components/Dashboard/Savings/SingleSavings";
import EditLockedSavings from "../components/Dashboard/Savings/EditSavings/EditLockedSavings";
import EditPeriodicSavings from "../components/Dashboard/Savings/EditSavings/editPeriodicSavings";
import EditTargetSavings from "../components/Dashboard/Savings/EditSavings/EditTargetSavings";
import Market from "../components/Dashboard/Market";

// lazy loaded/splitted Components
const Settings = lazy(() => import("../components/Dashboard/Settings"));
const Contribute = lazy(() => import("../components/Contribute"));

const Routes = () => {
  return (
    <Switch>

      <VerifyRoute exact key="/verify" path="/verify" component={Verify} />

      <PublicRoute exact key="/" path="/" component={Landing} />

      <PublicRoute exact key="/signup" path="/signup" component={SignUp} />

      <PublicRoute exact key="/login" path="/login" component={Login} />

      <PublicRoute
        exact
        key="/admin/login"
        path="/admin/login"
        component={AdminLogin}
      />
      
      <PublicRoute exact key="/policy" path="/policy" component={PolicyPage} />

      <PublicRoute
        exact
        key="/password-reset-request"
        path="/password-reset-request"
        component={PasswordResetRequest}
      />
      
      <PublicRoute
        exact
        key="/password-reset-change/:uiid/:token"
        path="/password-reset-change/:uiid/:token"
        component={PasswordResetChange}
      />
      
      <Route
        exact
        key="/contribute/:todoID"
        path="/contribute/:todoID"
        component={Contribute}
      />
      
      <Route
        exact
        key="/contribute-success"
        path="/contribute-success"
        component={SucessPage}
      />
      
      <PublicRoute
        exact
        key="/learnMore/createToDo"
        path="/learnMore/createToDo"
        component={CreateToDo}
      />
      
      <PublicRoute
        exact
        key="/learnMore/engage"
        path="/learnMore/engage"
        component={Engage}
      />
      
      <PublicRoute
        exact
        key="/learnMore/reach"
        path="/learnMore/reach"
        component={Reach}
      />
      
      <PublicRoute
        exact
        key="/learnMore/celebrate"
        path="/learnMore/celebrate"
        component={Celebrate}
      />
      <PublicRoute
        exact
        key="/learnMore/savings"
        path="/learnMore/savings"
        component={LearnMoreSavings}
      />

      <PrivateRoute
        exact
        key="/dashboard"
        path="/dashboard"
        component={Dashboard}
      /> 

      <PrivateRoute
        exact
        key="/dashboard/payment"
        path="/dashboard/payment"
        component={Payment}
      />

      <PrivateRoute
        exact
        key="/dashboard/savings"
        path="/dashboard/savings"
        component={Savings}
      />

      <PrivateRoute
        exact
        key="/dashboard/history"
        path="/dashboard/history"
        component={History}
      />

      <PrivateRoute
        exact
        key="/dashboard/display"
        path="/dashboard/display"
        component={Display}
      />

      <PrivateRoute
        exact
        key="/dashboard/Tudo"
        path="/dashboard/tudo"
        component={Tudo}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/Market"
        path="/dashboard/market"
        component={Market}
      />
      
      <PrivateRoute exact key="/profile" path="/profile" component={Profile} />,
      <PrivateRoute
        exact
        key="/user/notifications"
        path="/user/notifications"
        component={Notification}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudoFeeds"
        path="/dashboard/tudoFeeds"
        component={TudoFeeds}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo-single/:tudoid"
        path="/dashboard/tudo-single/:tudoid"
        component={SingleTudo}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo-single/:tudoid/edit"
        path="/dashboard/tudo-single/:tudoid/edit"
        component={EditTudo}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/settings"
        path="/dashboard/settings"
        component={Settings}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo/new"
        path="/dashboard/tudo/new"
        component={CreateNewTudu}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/savings/:id/single"
        path="/dashboard/savings/:id/single"
        component={SingleSavings}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo-single/:tudoid/edit"
        path="/dashboard/savings/:id/single/Periodic/edit"
        component={EditPeriodicSavings}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo-single/:tudoid/edit"
        path="/dashboard/savings/:id/single/Targeted/edit"
        component={EditTargetSavings}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo-single/:tudoid/edit"
        path="/dashboard/savings/:id/single/Locked/edit"
        component={EditLockedSavings}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/savings/active/:id"
        path="/dashboard/savings/active/:id"
        component={Active}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/savings/plans"
        path="/dashboard/savings/plans"
        component={Plans}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/savings/plans/target"
        path="/dashboard/savings/plans/target"
        component={Target}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/savings/plans/locked"
        path="/dashboard/savings/plans/locked"
        component={Locked}
      />
      
      <PrivateRoute
        key="/dashboard/savings/plans/periodic"
        path="/dashboard/savings/plans/periodic"
        component={Periodic}
      />
      
      <Route
        exact
        key="/contribute/:tudoID"
        path="/contribute/:todoID"
        component={Contribute}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo/share/:shareID"
        path="/dashboard/tudo/share/:shareID"
        component={ShareTudo}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo/topup/:id"
        path="/dashboard/tudo/topup/:id"
        component={TopUpTudo}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/tudo/withdraw/:id"
        path="/dashboard/tudo/withdraw/:id"
        component={WithdrawTudo}
      />
      
      <PrivateRoute
        exact
        key="/dashboard/savings/withdraw/:id"
        path="/dashboard/savings/withdraw/:id"
        component={WithdrawSavings}
      />

      <Route key={1} exact path="/admin/dashboard" component={AdminDashboard} />


      <Route exact key="/404" path="/404" component={NotFoundPage} />,
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
