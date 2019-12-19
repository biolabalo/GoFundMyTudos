import React, { useState } from "react";
import PaystackButton from "react-paystack";
import Modal from "react-responsive-modal";
import axios from "axios";
import axioz from "../../../axios-instance";
import { toast } from "react-toastify";

const PayStackModal = ({ openPayStackModal, onClosePayStackModal }) => {
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(false);
  const state = {
    key: "pk_test_c3b1a4bd70c7c501aa2222ea03648beccbc0c97e", //PAYSTACK PUBLIC KEY
    email: "foobar@example.com",
    amount: 10000
  };

  const callback = async response => {
    if (!response.reference) return onClosePayStackModal();

    try {
      const result = await axios.get(
        `https://api.paystack.co/transaction/verify/${response.reference}`,
        {
          headers: {
            Authorization:
              "Bearer sk_test_32339a96e3d16058cb85661fb40bf9603cbfce98"
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
