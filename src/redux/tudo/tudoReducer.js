import {
  CREATE_TUDO_FAIL,
  CREATE_TUDO_CREATING,
  CREATE_TUDO_SUCCESS,
  GET_TUDO_SUCCESS,
  GET_TUDO_LOADING,
  GET_TUDO_FAIL,
  CLOSE_MODAL,
  UPDATE_TUDO_VISIBILITY_FAIL,
  UPDATE_TUDO_VISIBILITY_UPDATING,
  UPDATE_TUDO_VISIBILITY_SUCCESS,
  TOP_UP_TODO,
  TOP_UP_TODO_SUCCESS,
  TOP_UP_TODO_FAIL,
  WITHDRAW_TODO,
  WITHDRAW_TODO_SUCCESS,
  WITHDRAW_TODO_FAIL
} from "./tudoTypes";

const initialState = {
  isCreating: false,
  isCreated: false,
  isLoading: false,
  isLoaded: false,
  isTopingUp: false,
  isWithdrawing: false,
  visibilityIsUpdated: false,
  visibilityIsUpdating: false,
  visibilityError: "",
  visibility: false,
  error: "",
  tudos: [],
  createdTudos: [],
  data: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TUDO_CREATING:
      return { ...state, isCreating: true };

    case CREATE_TUDO_SUCCESS:
      return {
        ...state,
        isCreating: false,
        isCreated: true,
        createdTudos: payload
      };

    case CREATE_TUDO_FAIL:
      return { ...state, isCreating: false, isCreated: false, error: payload };

    case GET_TUDO_LOADING:
      return { ...state, isLoading: true };

    case TOP_UP_TODO:
      return { ...state, isTopingUp: true };

    case GET_TUDO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        tudos: payload,
        error: ""
      };

    case TOP_UP_TODO_SUCCESS:
      return {
        ...state,
        isTopingUp: false,
        data: payload,
        error: ""
      };

    case WITHDRAW_TODO:
      return { ...state, isWithdrawing: true };

    case WITHDRAW_TODO_SUCCESS:
      return {
        ...state,
        isWithdrawing: false,
        data: payload,
        error: ""
      };

    case GET_TUDO_FAIL:
      return { ...state, isLoading: false, isLoaded: false, error: payload };

    case TOP_UP_TODO_FAIL:
      return { ...state, isTopingUp: false, error: payload };

    case WITHDRAW_TODO_FAIL:
      return { ...state, isWithdrawing: false, error: payload };

    case CLOSE_MODAL:
      return { ...state, isCreated: false };

    case UPDATE_TUDO_VISIBILITY_SUCCESS:
      return { ...state, visibilityIsUpdated: true, visibility: payload };

    case UPDATE_TUDO_VISIBILITY_UPDATING:
      return {
        ...state,
        visibilityIsUpdated: false,
        visibilityIsUpdating: true
      };

    case UPDATE_TUDO_VISIBILITY_FAIL:
      return {
        ...state,
        visibilityIsUpdated: false,
        visibilityIsUpdating: false,
        visibilityError: payload
      };

    default:
      return state;
  }
};
