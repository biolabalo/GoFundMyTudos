import axios from "../../axios-instance";
import checkTokenValidityAndLogout from "../../checkTokenValidityAndLogout";
import { FETCH_USER_FAILURE, FETCH_USER_SUCCESS } from "./userProfileType";

export const fetchUserData = async (logout, history, dispatch) => {
  try {
    const response = await axios.get("/user-profile");
    const {
      data: { data }
    } = response;

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: data
    });
  } catch (err) {
    err.response.status === 403 &&
    err.response.data.error === "Authentication Failed"
      ? checkTokenValidityAndLogout(logout, history, dispatch)
      : dispatch({ type: FETCH_USER_FAILURE, payload: {} });
  }
};
