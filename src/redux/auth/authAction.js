// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "../../axios-instance";
import setAuthToken from "../../setAuthToken";
import Swal from "sweetalert2";

import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_RESET,
  LOGIN_FAIL,
  LOGOUT
} from "./authTypes";
import { toast } from "react-toastify";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const logout = (history, dispatch) => {
  localStorage.removeItem("TUDU_token");
  history.push("/");
  dispatch({ type: LOGOUT });
  axios.post("/logout");
  setAuthToken();
};

export const loadUser = () => dispatch => {
  if (!localStorage.TUDU_token) return dispatch({ type: LOGOUT });

  if (localStorage.TUDU_token) {
    dispatch({ type: LOGIN_SUCCESS, payload: localStorage.TUDU_token });
    return setAuthToken(localStorage.TUDU_token);
  }
};

// Login User
export const login = async (data, history, dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const res = await axios.post("/login", data, config);

    if (
      res.data.status === 200 &&
      res.data.message === "Your login was successfull"
    ) {
      setAuthToken(res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      return history.push("/dashboard");
    }
    return dispatch({ type: LOGIN_RESET });
  } catch (err) {
    if (
      err.response &&
      err.response.data.error === "Your account has not been activated"
    ) {
      Swal.fire({
        title: "Unverified Account",
        html:
          "<p className='swall_verify_modal'>Your account has not been activated, do you want to verify your account</p>",
        showCancelButton: true,
        confirmButtonColor: "#7594FB;",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          window.sessionStorage.setItem(
            "registered_unverifiedUser_TUDU",
            data.email
          );
          axios.post("/user/generate_otp", data, config);
          history.push("/verify");
          dispatch({ type: LOGIN_RESET });
        } else {
          dispatch({ type: LOGIN_RESET });
        }
      });
      return;
    }

    if (err.response && err.response.data.error) {
      return dispatch({ type: LOGIN_FAIL });
    }
    dispatch({ type: LOGIN_RESET });
    return toast.error("SignUp Failed Try Again!");
  }
};
