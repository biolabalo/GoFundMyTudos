import { combineReducers } from "redux";
import auth from "./auth/authReducer";
import bankAccounts from "./bankAccounts/bankReducer";
import cards from "./cards/cardReducer";
import tudo from "./tudo/tudoReducer";
import loggedInUserProfile from "./userProfile/userProfileReducer";

export default combineReducers({
  auth,
  tudo,
  bankAccounts,
  cards,
  loggedInUserProfile
});
