import {
  CREATE_TARGET_CREATING,
  CREATE_TARGET_FAIL,
  CREATE_TARGET_SUCCESS,
  GET_SAVINGS_SUCCESS,
  GET_SAVINGS_FAIL,
  GET_SAVINGS_LOADING
} from "./types";

const initialState = {
  isCreating: false,
  isCreated: false,
  createdSavings: [],
  savings: [],
  savingsPrev: "",
  savingsNext: "",
  isLoading: false,
  isloaded: false,
  createError: "",
  getError: "",
  paymentUrl: ""
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TARGET_CREATING:
      return { ...state, isCreating: true };

    case CREATE_TARGET_SUCCESS:
      return {
        ...state,
        isCreating: false,
        isCreated: true,
        createdTudos: payload
      };

    case CREATE_TARGET_FAIL:
      return {
        ...state,
        isCreating: false,
        isCreated: false,
        createError: payload
      };

    case GET_SAVINGS_LOADING:
      return { ...state, isLoading: true };

    case GET_SAVINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        savings: payload
      };

    case GET_SAVINGS_FAIL:
      return { ...state, isLoading: false, isLoaded: false, getError: payload };

    default:
      return state;
  }
};
