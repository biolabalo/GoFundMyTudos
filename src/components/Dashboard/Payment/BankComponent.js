import React, { useState, useEffect, memo } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../../axios-instance";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/authAction";
import BankModal from "./BankModal";
import { toast } from "react-toastify";

import checkTokenValidityAndLogout from "../../../checkTokenValidityAndLogout";

import {
  FETCH_BANK_ACCOUNTS,
  DELETE_BANK_ACCOUNT,
  FLIP_CARD,
  UNFLIP_CARD
} from "../../../redux/bankAccounts/bankTypes";

const BankComponent = memo(({ isBankHovered, setIsBankHovered, history }) => {
  const [isBankModalOpen, setBankModalOpen] = useState(false);
  const [isCleanUpBankModal, setCleanUpBankModal] = useState(false);
  const dispatch = useDispatch();

  const closeBankModal = () => setBankModalOpen(false);
  const userBankAccounts = useSelector(
    state => state.bankAccounts.userBankAccounts
  );

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get("/bank-details");
        const {
          data: { data }
        } = response;

        const newPayloadWithFlippedStatus = data.map(each => ({
          ...each,
          isFlipped: false
        }));

        dispatch({
          type: FETCH_BANK_ACCOUNTS,
          payload: newPayloadWithFlippedStatus
        });
      } catch (err) {
        err.response.status === 403 &&
        err.response.data.error === "Authentication Failed"
          ? checkTokenValidityAndLogout(logout, history, dispatch)
          : dispatch({ type: FETCH_BANK_ACCOUNTS, payload: [] });
      }
      return () => setCleanUpBankModal(true);
    })();
  }, [dispatch, history]);

  const deleteBankAccount = async id => {
    try {
      const response = await axios.delete(`/bank-details/${id}`);
      const {
        data: { message, status }
      } = response;
      if (message === "Successfully deleted bank detail" && status === 200) {
        dispatch({ type: DELETE_BANK_ACCOUNT, payload: id });
      }
    } catch (err) {
      err.response.status === 403 &&
      err.response.data.error === "Authentication Failed"
        ? checkTokenValidityAndLogout(logout, history, dispatch)
        : toast.error("Failed to delete bank account");
    }
  };

  return (
    <>
      <div
        className={
          isBankHovered
            ? "pt-5 pl-2 flex-container-payment-tab animated fadeIn"
            : "pt-5 pl-2"
        }
      >
        {isBankHovered ? (
          <>
            <div className="add-new-bank-box shadow text-center add-bank-flex-item-payment-tab">
              <span className="dot" onClick={() => setBankModalOpen(true)}>
                <span className="plus-symbol-add-card">&#43;</span>
              </span>
              <br />
              <h6>Add Bank Account</h6>
            </div>

            {userBankAccounts.map(eachBankDetail => (
              <div
                className="flex-item-payment-tab"
                key={eachBankDetail.id}
                onClick={() =>
                  dispatch(
                    eachBankDetail.isFlipped
                      ? { type: UNFLIP_CARD, payload: eachBankDetail.id }
                      : { type: FLIP_CARD, payload: eachBankDetail.id }
                  )
                }
                onMouseLeave={() =>
                  dispatch({ type: UNFLIP_CARD, payload: eachBankDetail.id })
                }
              >
                <div className="p-4">
                  {eachBankDetail.isFlipped ? (
                    <b
                      onClick={() => deleteBankAccount(eachBankDetail.id)}
                      className="font-weight-bold delete-bank-accnt"
                    >
                      <i className="fas fa-trash"></i>
                      &nbsp;&nbsp;Remove Bank Account
                    </b>
                  ) : (
                    <>
                      <small>Account Name</small>
                      <p className="mb-5">{eachBankDetail.account_name}</p>

                      <div>
                        <p className="mb-1">
                          <small>Account Number</small>
                        </p>
                        <p className="float-left ">
                          {eachBankDetail.account_number}
                        </p>
                        <p className="float-right font-weight-bold">
                          {eachBankDetail.bank_name}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="add-new-bank-box shadow text-center">
            <span className="dot" onClick={() => setBankModalOpen(true)}>
              <span className="plus-symbol-add-card">&#43;</span>
            </span>
            <br />
            <h6>Add Bank Account</h6>
            <section
              onMouseEnter={() => {
                setIsBankHovered(true);
              }}
            >
              {userBankAccounts.map((eachBankDetail, index) => (
                <div
                  key={eachBankDetail.id}
                  className="card-divs"
                  style={{
                    position: "absolute",
                    left: index * 150,
                    top: index * 40
                  }}
                >
                  <small>Account Name</small>
                  <p className="mb-5">{eachBankDetail.account_name}</p>

                  <div>
                    <p className="mb-1">
                      <small>Account Number</small>
                    </p>
                    <p className="float-left ">
                      {eachBankDetail.account_number}
                    </p>
                    <p className="float-right font-weight-bold">
                      {eachBankDetail.bank_name}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
      {isCleanUpBankModal ? (
        ""
      ) : (
        <BankModal openModal={isBankModalOpen} closeModal={closeBankModal} />
      )}
    </>
  );
});

export default withRouter(BankComponent);
