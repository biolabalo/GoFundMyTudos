import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const VerifyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.TUDU_token) {
        return <Redirect to="/dashboard" />;
      }
      if (
        !localStorage.TUDU_token &&
        sessionStorage.registered_unverifiedUser_TUDU
      ) {
        return <Component {...props} />;
      }
      if (
        !localStorage.TUDU_token &&
        !sessionStorage.registered_unverifiedUser_TUDU
      ) {
        return <Redirect to="/login" />;
      }
    }}
  />
);

VerifyRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(VerifyRoute);
