import {
  CREATE_TUDO_FAIL,
  CREATE_TUDO_CREATING,
  CREATE_TUDO_SUCCESS,
  GET_TUDO_SUCCESS,
  GET_TUDO_LOADING,
  GET_TUDO_FAIL,
  CLOSE_MODAL
} from "./tudoTypes";

const initialState = {
  isCreating: false,
  isCreated: false,
  isLoading: false,
  isLoaded: false,
  error: "",
  tudos: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TUDO_CREATING:
      return { ...state, isCreating: true };

    case CREATE_TUDO_SUCCESS:
      return { ...state, isCreating: false, isCreated: true };

    case CREATE_TUDO_FAIL:
      return { ...state, isCreating: false, isCreated: false, error: payload };

    case GET_TUDO_LOADING:
      return { ...state, isLoading: true };

    case GET_TUDO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        tudos: payload,
        error: ""
      };

    case GET_TUDO_FAIL:
      return { ...state, isLoading: false, isLoaded: false, error: payload };

    case CLOSE_MODAL:
      return { ...state, isCreated: false };

    default:
      return state;
  }
};
