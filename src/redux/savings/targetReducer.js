import {
  CREATE_TARGET_CREATING,
  CREATE_TARGET_FAIL,
  CREATE_TARGET_SUCCESS
} from "./targetTypes";

const initialState = {
  isCreating: false,
  isCreated: false,
  createdSavings: [],
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
      return { ...state, isCreating: false, isCreated: false, error: payload };

    default:
      return state;
  }
};
