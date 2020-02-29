import axios from "../../axios-instance";
import { GET_DEBIT_CARDS, GET_DEBIT_CARDS_FAILED } from "./cardTypes";

export const getCard = () => async dispatch => {
  const token = localStorage.getItem("TUDU_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get("/card-details", config);
    dispatch({
      type: GET_DEBIT_CARDS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: GET_DEBIT_CARDS_FAILED
    });
  }
};
