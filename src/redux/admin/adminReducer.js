import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_FAIL
} from "./adminTypes";

const initialState = {
  adminToken: localStorage.getItem("admin_token"),
  isAdminAuthenticated: false,
  isAdminLoginLoading: false,
  isAdminLoginError: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOGIN_LOADING:
      localStorage.removeItem("admin_token");
      return {
        ...state,
        isAdminLoginLoading: true,
        isAdminLoginError: false
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("admin_token", payload);
      return {
        ...state,
        adminToken: payload,
        isAdminAuthenticated: true,
        isAdminLoginLoading: false,
        isAdminLoginError: false
      };
    case ADMIN_LOGIN_FAIL:
      localStorage.removeItem("admin_token");
      return {
        ...state,
        adminToken: null,
        isAdminAuthenticated: false,
        isAdminLoginLoading: false,
        isAdminLoginError: true
      };
    default:
      return state;
  }
}
