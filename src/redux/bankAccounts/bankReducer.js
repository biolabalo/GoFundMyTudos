import {
  FETCH_BANK_ACCOUNTS,
  ADD_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
  FLIP_CARD,
  UNFLIP_CARD
} from "./bankTypes";
import { LOGOUT } from "../../redux/auth/authTypes";

const initialState = {
  userBankAccounts: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT:
      return {
        ...state,
        userBankAccounts: []
      };
    case FETCH_BANK_ACCOUNTS:
      return {
        ...state,
        userBankAccounts: payload
      };
    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        userBankAccounts: [payload, ...state.userBankAccounts]
      };
    case DELETE_BANK_ACCOUNT:
      return {
        ...state,
        userBankAccounts: state.userBankAccounts.filter(
          eachAccount => eachAccount.id !== payload
        )
      };
    case FLIP_CARD:
      return {
        ...state,
        userBankAccounts: state.userBankAccounts.map(eachAccount =>
          eachAccount.id === payload
            ? { ...eachAccount, isFlipped: true }
            : eachAccount
        )
      };
    case UNFLIP_CARD:
      return {
        ...state,
        userBankAccounts: state.userBankAccounts.map(eachAccount =>
          eachAccount.id === payload
            ? { ...eachAccount, isFlipped: false }
            : eachAccount
        )
      };
    default:
      return state;
  }
}
