import { toast } from "react-toastify";
import axios from "../../axios-instance";
// import checkTokenValidityAndLogout from "../../checkTokenValidityAndLogout";
// import { logout } from "../../redux/auth/authAction";

import {
  CREATE_TUDO_SUCCESS,
  CREATE_TUDO_CREATING,
  CREATE_TUDO_FAIL,
  GET_TUDO_SUCCESS,
  GET_TUDO_LOADING,
  GET_TUDO_FAIL,
  CLOSE_MODAL,
  UPDATE_TUDO_VISIBILITY_SUCCESS,
  UPDATE_TUDO_VISIBILITY_UPDATING,
  UPDATE_TUDO_VISIBILITY_FAIL,
  TOP_UP_TODO,
  TOP_UP_TODO_FAIL,
  TOP_UP_TODO_SUCCESS,
  WITHDRAW_TODO,
  WITHDRAW_TODO_SUCCESS,
  WITHDRAW_TODO_FAIL
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

export const topUp = (compiledData, history) => async dispatch => {
  const { compiledAmount, cardId, tudoId } = compiledData;
  const token = localStorage.getItem("TUDU_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  dispatch({
    type: TOP_UP_TODO
  });

  const data = JSON.stringify({
    topup_amount: compiledAmount,
    card_id: cardId,
    tudo_id: tudoId
  });

  const url = `tudo/top-up`;

  try {
    const response = await axios.post(url, data, config);

    dispatch({
      type: TOP_UP_TODO_SUCCESS,
      payload: response.data.data
    });

    if (response.data.data.authorization_url) {
      toast.success(response.data.message);
      return window.location.assign(response.data.data.authorization_url);
    } else {
      toast.success(response.data.message);
      return history.goBack();
    }
  } catch (e) {
    dispatch({
      type: TOP_UP_TODO_FAIL,
      payload: "Unable to top up Tudo at the moment, please try again later"
    });
    toast.error("Unable to top up Tudo at the moment, please try again later");
  }
};

export const withdrawTudo = (compiledData, callBack) => async dispatch => {
  const { bankAccountId, tudoId } = compiledData;
  const token = localStorage.getItem("TUDU_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  dispatch({
    type: WITHDRAW_TODO
  });

  const data = JSON.stringify({
    bank_account_id: bankAccountId,
    tudo_id: tudoId
  });

  const url = `tudo/withdraw`;

  try {
    const response = await axios.post(url, data, config);

    dispatch({
      type: WITHDRAW_TODO_SUCCESS,
      payload: response.data.data
    });

    toast.success(response.data.message);
    return callBack();
  } catch (e) {
    dispatch({
      type: WITHDRAW_TODO_FAIL,
      payload: "Unable to withdraw at the moment, please try again later"
    });
    toast.error("Unable to withdraw at the moment, please try again later");
  }
};

export const closeModal = () => dispatch => {
  dispatch({
    type: CLOSE_MODAL
  });
};

export const getRunningTudos = () => async dispatch => {
  dispatch({
    type: GET_TUDO_LOADING
  });

  try {
    const tudos = await axios.get("tudo?type=running");

    dispatch({
      type: GET_TUDO_SUCCESS,
      payload: tudos.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_TUDO_FAIL,
      payload: "Unable to display Tudo list at the moment, please try later"
    });

    // if (
    //   err.response.status === 403 &&
    //   err.response.data.error === "Authentication Failed"
    // ) {
    //   // return checkTokenValidityAndLogout(logout, history, dispatch);
    // }
  }
};

export const updateTudoVisibility = (id, bool) => async dispatch => {
  dispatch({
    type: UPDATE_TUDO_VISIBILITY_UPDATING
  });

  const token = localStorage.getItem("TUDU_token");
  const data = JSON.stringify({ is_visible: bool });
  const url = `tudo/${id}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.patch(url, data, config);

    toast.success("Yes!");

    dispatch({
      type: UPDATE_TUDO_VISIBILITY_SUCCESS,
      payload: response
    });
  } catch (e) {
    toast.error("Unable to set visibility now, please try again later");

    dispatch({
      type: UPDATE_TUDO_VISIBILITY_FAIL,
      payload: "Unable to set visibility now, please try again later"
    });
  }
};
