import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_RESET,
  CLEAR_LOGIN_ERROR
} from "./authTypes";

const initialState = {
  token: localStorage.getItem("TUDU_token"),
  isAuthenticated: false,
  isLoading: false,
  isLoginError: false,
  userThemePrefrences: {
    backgroundColor: "#ffffff",
    color: "#aeb2c4",
    colorPalete: "#7594fb",
    titleColor: "#717ba0",
    cardHeaderBackgroundColor: "#FAFAFC",
    cardBackgroundColor: "#fffff"
  },
  userFeed: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_LOADING:
      localStorage.removeItem("TUDU_token");
      return {
        ...state,
        isLoading: true,
        isLoginError: false
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        isLoginError: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("TUDU_token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        isLoading: false,
        isLoginError: false
      };

    case LOGIN_FAIL:
      localStorage.removeItem("TUDU_token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isLoginError: true
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isLoginError: false
      };
    case LOGIN_RESET:
      localStorage.removeItem("TUDU_token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isLoginError: false
      };
    case "SET_BG_TO_DARK":
      return {
        ...state,
        userThemePrefrences: {
          ...state.userThemePrefrences,
          backgroundColor: "#101522",
          cardHeaderBackgroundColor: "#1C2135",
          cardBackgroundColor: "#191E31"
        }
      };
    case "SET_BG_TO_WHITE":
      return {
        ...state,
        userThemePrefrences: {
          ...state.userThemePrefrences,
          backgroundColor: "#ffffff",
          cardHeaderBackgroundColor: "#FAFAFC",
          cardBackgroundColor: "#ffffff"
        }
      };
    case "UPDATE_COLOR_PALETTE":
      return {
        ...state,
        userThemePrefrences: {
          ...state.userThemePrefrences,
          colorPalete: payload
        }
      };
      case "ADD_TODO_FEEDS":
        return {
          ...state,
          userFeed: payload
        };
    default:
      return state;
  }
}
