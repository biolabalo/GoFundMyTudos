import axios from "../../axios-instance";
import { toast } from "react-toastify";

import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS
} from "./adminTypes";

import setAdminAuthToken from "../../helpers/adminAuthentication";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

// Login Admin
export const adminLogin = data => async dispatch => {
  dispatch({ type: ADMIN_LOGIN_LOADING });
  try {
    const res = await axios.post("/admin/login", data, config);

    if (res.data.status === 200) {
      setAdminAuthToken(res.data.token);
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data.token });
      toast.success("Successful login");
    }
  } catch (err) {
    if (err.response && err.response.data.error) {
      toast.error("login Failed Try Again!");
      return dispatch({ type: ADMIN_LOGIN_FAIL });
    }
  }
};
