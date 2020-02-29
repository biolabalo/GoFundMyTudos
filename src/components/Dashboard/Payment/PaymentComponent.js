import React, { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../../../axios-instance";
import { useSelector, useDispatch } from "react-redux";
import {
  FETCH_BANK_CARDS,
  UNFLIP_BANK_CARD,
  FLIP_BANK_CARD
} from "../../../redux/cards/cardTypes";
import payWithPaystack from "./payStackFunction";
import checkTokenValidityAndLogout from "../../../checkTokenValidityAndLogout";
import { withRouter } from "react-router-dom";
import { logout } from "../../../redux/auth/authAction";

const PaymentComponent = ({ setIsCardHovered, isCardHovered, history }) => {
  const dispatch = useDispatch();
  const userCards = useSelector(state => state.cards.userCards);
  
  const {
    email
  } = useSelector(state => state.loggedInUserProfile.userProfile);




  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get("/card-details");
        const {
          data: { data }
        } = response;

        const newPayloadWithFlippedStatus = data.map(each => ({
          ...each,
          isFlipped: false
        }));

        dispatch({
          type: FETCH_BANK_CARDS,
          payload: newPayloadWithFlippedStatus
        });
      } catch (err) {
        err.response.status === 403 &&
        err.response.data.error === "Authentication Failed"
          ? checkTokenValidityAndLogout(logout, history, dispatch)
          : dispatch({ type: FETCH_BANK_CARDS, payload: [] });
      }
    })();
  }, [dispatch, history]);



  const showSweetAlert = () => {
    Swal.fire({
      html:
        "<hr class='mt-0'/> <p class='kjxnfv'> A sum  of N100 naira will be charged on your card for card verification. <br/> This amount will be added to your saving goal.</p>",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        payWithPaystack(email);
      }
    });
  };

  return (
    <>
      <div
        className={
          isCardHovered
            ? "pt-5 pl-2 flex-container-payment-tab  animated fadeIn"
            : "pt-5 pl-2"
        }
      >
        {isCardHovered ? (
          <>
            <div className="add-new-bank-box shadow text-center add-bank-flex-item-payment-tab">
              <span className="dot" onClick={() => showSweetAlert()}>
                <span className="plus-symbol-add-card">&#43;</span>
              </span>
              <br />
              <h6>Add New Card</h6>
            </div>

            {userCards.map(eachCardDetail => (
              <div
                className="flex-item-bank-payment-tab"
                key={eachCardDetail.id}
                onClick={() =>
                  dispatch(
                    eachCardDetail.isFlipped
                      ? { type: UNFLIP_BANK_CARD, payload: eachCardDetail.id }
                      : { type: FLIP_BANK_CARD, payload: eachCardDetail.id }
                  )
                }
                // onMouseLeave={() =>
                //   dispatch({
                //     type: UNFLIP_BANK_CARD,
                //     payload: eachCardDetail.id
                //   })
                // }
              >
                <div className="p-4">
                  {eachCardDetail.isFlipped ? (
                    <b
                      //   onClick={() => deleteBankAccount(eachCardDetail.id)}
                      className="font-weight-bold delete-bank-accnt"
                    >
                      <i className="fas fa-trash"></i>
                      &nbsp;&nbsp;Remove Bank Account
                    </b>
                  ) : (
                    <>
                      <small>Account Name</small>
                      <p className="mb-5">{eachCardDetail.account_name}</p>

                      <div>
                        <p className="mb-1">
                          <small>Account Number</small>
                        </p>
                        <p className="float-left ">
                          {eachCardDetail.account_number}
                        </p>
                        <p className="float-right font-weight-bold">
                          {eachCardDetail.bank_name}
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
            <span className="dot" onClick={() => showSweetAlert()}>
              <span className="plus-symbol-add-card">&#43;</span>
            </span>
            <br />
            <h6>Add New Card</h6>
            <section
              onMouseEnter={() => {
                setIsCardHovered(true);
              }}
            >
              {userCards.map((eachCardDetail, index) => (
                <div
                  key={eachCardDetail.id}
                  className="card-divs-bank"
                  style={{
                    position: "absolute",
                    left: index * 150,
                    top: index * 40
                  }}
                >
                  <small>Account Name</small>
                  <p className="mb-5">{eachCardDetail.account_name}</p>

                  <div>
                    <p className="mb-1">
                      <small>Account Number</small>
                    </p>
                    <p className="float-left ">
                      {eachCardDetail.account_number}
                    </p>
                    <p className="float-right font-weight-bold">
                      {eachCardDetail.bank_name}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(PaymentComponent);
