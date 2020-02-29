import {
  FETCH_BANK_CARDS,
  FLIP_BANK_CARD,
  UNFLIP_BANK_CARD,
  GET_DEBIT_CARDS_FAILED,
  GET_DEBIT_CARDS
} from "./cardTypes";

const initialState = {
  userCards: [],
  debitCards: [],
  debitCardError: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_BANK_CARDS:
      return {
        ...state,
        userCards: payload
      };
    case FLIP_BANK_CARD:
      return {
        ...state,
        userBankAccounts: state.userCards.map(eachAccount =>
          eachAccount.id === payload
            ? { ...eachAccount, isFlipped: true }
            : eachAccount
        )
      };
    case UNFLIP_BANK_CARD:
      return {
        ...state,
        userBankAccounts: state.userCards.map(eachAccount =>
          eachAccount.id === payload
            ? { ...eachAccount, isFlipped: false }
            : eachAccount
        )
      };
    case GET_DEBIT_CARDS:
      return {
        ...state,
        debitCards: payload
      };
    case GET_DEBIT_CARDS_FAILED:
      return {
        ...state,
        debitCardError: true
      };
    default:
      return state;
  }
}
