import { toast } from "react-toastify";
import axios from "../../axios-instance";
import checkTokenValidityAndLogout from "../../checkTokenValidityAndLogout";
import { logout } from "../../redux/auth/authAction";

import {
  CREATE_TUDO_SUCCESS,
  CREATE_TUDO_CREATING,
  CREATE_TUDO_FAIL,
  GET_TUDO_SUCCESS,
  GET_TUDO_LOADING,
  GET_TUDO_FAIL,
  CLOSE_MODAL
} from "./tudoTypes";

export const createTudo = tudos => async dispatch => {
  const token = localStorage.getItem("TUDU_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  const data = JSON.stringify({ tudos });
  dispatch({
    type: CREATE_TUDO_CREATING
  });

  try {
    const response = await axios.post("tudo", data, config);

    dispatch({
      type: CREATE_TUDO_SUCCESS,
      payload: response.data.data.tudos
    });
  } catch (err) {
    if (
      err.response.status === 403 &&
      err.response.data.error === "Authentication Failed"
    ) {
      // return checkTokenValidityAndLogout(logout, history, dispatch);
    }
    toast.error("Unable to create Tudo List");
    dispatch({
      type: CREATE_TUDO_FAIL,
      payload: "Unable to create Tudo list, please try again later"
    });
  }
};

export const closeModal = () => dispatch => {
  dispatch({
    type: CLOSE_MODAL
  });
};

export const getTudos = () => async dispatch => {
  dispatch({
    type: GET_TUDO_LOADING
  });

  try {
    const tudos = await axios.get("tudo");

    dispatch({
      type: GET_TUDO_SUCCESS,
      payload: tudos.data.data
    });
  } catch (err) {
    if (
      err.response.status === 403 &&
      err.response.data.error === "Authentication Failed"
    ) {
      // return checkTokenValidityAndLogout(logout, history, dispatch);
    }
    dispatch({
      type: GET_TUDO_FAIL,
      payload: err.response.data.error
    });
  }
};
