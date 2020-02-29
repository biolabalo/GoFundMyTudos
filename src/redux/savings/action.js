import axios from "../../axios-instance";
import {
  CREATE_TARGET_CREATING,
  CREATE_TARGET_FAIL,
  CREATE_TARGET_SUCCESS,
  GET_SAVINGS_SUCCESS,
  GET_SAVINGS_FAIL,
  GET_SAVINGS_LOADING
} from "./types";

export const getSavings = id => async dispatch => {
  const url = `savings/list/${id}`;

  const token = localStorage.getItem("TUDU_token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  dispatch({
    type: GET_SAVINGS_LOADING
  });

  try {
    const response = await axios.get(url, config);
    dispatch({
      type: GET_SAVINGS_SUCCESS,
      payload: response.data.data
    });
  } catch (e) {
    dispatch({
      type: GET_SAVINGS_FAIL
    });
  }
};

export const createTargetSavings = savingsData => async dispatch => {
  const token = localStorage.getItem("TUDU_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  dispatch({
    type: CREATE_TARGET_CREATING
  });

  try {
    const response = await axios.post("savings/targeted", savingsData, config);

    dispatch({
      type: CREATE_TARGET_SUCCESS,
      payload: response.data
    });
  } catch (e) {
    dispatch({
      type: CREATE_TARGET_FAIL
    });
  }
};
