import React, { useState } from "react";
import PaystackButton from "react-paystack";
import Modal from "react-responsive-modal";
import axios from "axios";
import axioz from "../../../axios-instance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";



const PayStackModal = ({ openPayStackModal, onClosePayStackModal }) => {

  const {
    email
  } = useSelector(state => state.loggedInUserProfile.userProfile);

  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(false);

  const state = {
    key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, //PAYSTACK PUBLIC KEY
    email,
    amount: 10000
  };

  const callback = async response => {
    if (!response.reference) return onClosePayStackModal();

    try {
      const result = await axios.get(
        `https://api.paystack.co/transaction/verify/${response.reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`
          }
        }
      );

      const {
        data: {
          data: { authorization }
        }
      } = result;

      const dataFromPayStack = {
        authorization_code: authorization.authorization_code,
        card_type: authorization.card_type,
        last_four: authorization.last4,
        exp_month: authorization.exp_month,
        exp_year: authorization.exp_year,
        first_six: authorization.bin,
        card_bank: authorization.bank
      };

      const finalResponse = await axioz.post("/card-details", dataFromPayStack);
      const { data } = finalResponse;
      setCloseOnOverlayClick(true);
      if (
        data.status === 201 &&
        data.message === "Card details successfully added"
      ) {
        onClosePayStackModal();
        return toast.success("Card succesfully added");
      }
      return toast.error("Failed to add card try again");
    } catch (err) {
      setCloseOnOverlayClick(true);
      return toast.error("Failed to add card try again");
    }
  };

  const close = () => {};

  const getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  return (
    <div>
      <Modal
        open={openPayStackModal}
        onClose={onClosePayStackModal}
        className="add-bank-modal"
        closeOnOverlayClick={closeOnOverlayClick}
      >
        <PaystackButton
          text="Make Payment"
          className="payButton"
          callback={callback}
          close={close}
          disabled={true}
          embed={true}
          reference={getReference()}
          email={state.email}
          amount={state.amount}
          paystackkey={state.key}
          tag="button"
        />
      </Modal>
    </div>
  );
};

export default PayStackModal;
