import { FETCH_USER_FAILURE, FETCH_USER_SUCCESS } from "./userProfileType";

const initialState = {
  userProfile: {},
  isUserProfileEmpty: true,
  isFetchUserProfileError: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER_FAILURE:
      return {
        userProfile: {},
        isUserProfileEmpty: true,
        isFetchUserProfileError: true
      };
    case FETCH_USER_SUCCESS:
      return {
        userProfile: payload,
        isUserProfileEmpty: false,
        isFetchUserProfileError: false
      };
    default:
      return state;
  }
}
