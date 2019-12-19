import {
  FETCH_BANK_CARDS,
  FLIP_BANK_CARD,
  UNFLIP_BANK_CARD
} from "./cardTypes";

const initialState = {
  userCards: []
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
    default:
      return state;
  }
}
