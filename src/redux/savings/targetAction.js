import axios from "../../axios-instance";
import {
  CREATE_TARGET_CREATING,
  CREATE_TARGET_FAIL,
  CREATE_TARGET_SUCCESS
} from "./targetTypes";

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
