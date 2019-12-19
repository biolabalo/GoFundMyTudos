import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // eslint-disable-next-line no-unused-vars
  const auth = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.TUDU_token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
