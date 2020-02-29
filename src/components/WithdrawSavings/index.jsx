import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../axios-instance";
import Sidebar from "../Sidebar";
import AuthNavBar from "../commons/AuthNavBar";
import Bottombar from "../Bottombar";
import AddBankAccountModal from "../Modal/addBankAccountModal";
import Confirmation from "../Modal/confirmation";
import Congratulations from "../Modal/congratulations";
import { useSelector, useDispatch } from "react-redux";
import downArrow from "../../images/drop-down-30.png";

import { FETCH_BANK_ACCOUNTS } from "../../redux/bankAccounts/bankTypes";

import "../Tudo/WithdrawTudo/WithdrawTudo.scss";


const WithdrawSavings = ({  match: { params: id }, history }) => {

  const [noEmptyFields, setNoEmptyFields] = useState(false);
  const [savingsId, setSavingsId] = useState("");
  const [bankAccountId, setBankAccountId] = useState("");
  const [ formValues, setFormValues] = useState({
    paymentMethod: "",
    amountGenerated: ""
  });
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [ openModal, setOpenModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);

  const dispatch = useDispatch();
  const { tudo } = useSelector(state => state);
  const { isWithdrawing, data, tudos } = tudo
  const { userBankAccounts } = useSelector(state => state.bankAccounts);
  

  useEffect(() => {

    (async function() {
       try {

        const response = await axios.get("/bank-details");
        const {
          data: { data }
        } = response;
        setBankAccounts(data)
        dispatch({ type: FETCH_BANK_ACCOUNTS, payload: [...data] });
  
      } catch (err) {
        return err;
      }
    })();

  }, [formValues, dispatch , id.id]);


  const displayAccount = account => {
    return (
      <div key={account.id}>
        <p onClick={e => handleSelect(e, account)}>
          {account.account_number}
        </p>
      </div>
    );
  };

   const handleToggleDropDown = () => setToggleDropDown(!toggleDropDown);
   


   const handleSelect = (e, account) => {
  setFormValues({...formValues, paymentMethod: e.target.textContent});
  setNoEmptyFields(true)
  setToggleDropDown(!toggleDropDown);
  setBankAccountId( account ? account.id : "")
  };

  const handleWithdraw = async e => {

  e.preventDefault();

  const data = {
    bank_account_id: bankAccountId,
    savings_id: savingsId
  };

  try {
   const response = await axios.post('/savings/withdraw', data);
   toast.success(response.data.message);
   setSelectedModal("congratulations");
   setOpenModal(true);
   return history.push("/dashboard");
 
  } catch (e) {
    console.log(e.response.data.error.saving)
    if(e.response.data.error &&  e.response.data.error.saving){
     return toast.error(e.response.data.error.saving[0]);
    }
    toast.error("Unable to withdraw at the moment, please try again later");
  }

  };


  const renderModalTypes = () => {


    switch (selectedModal) {
      case "addBankAccount":
        return (
          <AddBankAccountModal
            history={history}
            triggerModal={triggerModal}
            closeModal={closeModal}
          />
        );
      case "confirmation":
        return (
          <Confirmation
            accountNumber={userBankAccounts[0].data.account_number}
            bank={userBankAccounts[0].data.bank_name}
            name={userBankAccounts[0].data.account_name}
            triggerModal={triggerModal}
            closeModal={closeModal}
          />
        );
      case "congratulations":
        return (
          <Congratulations history={history} closeModal={closeModal} />
        );
      default:
        return true;
    }
  };

  const closeModal = () =>  setOpenModal(false);

  const triggerModal = modal => {

    setOpenModal(true);
    setSelectedModal(modal)
   
  };

  
    const { amountGenerated, paymentMethod } =  formValues;

    return (
      <div className="withdraw-todo">
        <div className="withdraw-todo-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="withdraw-todo-bottombar">
          <Bottombar path={history} />
        </div>
        <div className="withdraw-todo-body">
          <AuthNavBar />
          <div className="withdraw-todo-body-content">
            <div className="row">
              <div className="col-md-1">
                <div className="withdraw-todo-body-content-back">
                  <Link to="/dashboard/tudo">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-11">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <h2>Withdraw</h2>
                  </div>
                  <div className="col-md-12 col-lg-8">
                    <div className="withdraw-todo-body-content-form">
                      <p>Withdraw funds from your “Wedding Plan” goal</p>
                      <form action="">
                        <div className="withdraw-todo-body-content-form-input-container  withdraw-todo-align-baseline">
                          <label htmlFor="tudo-withdraw-amount">
                            <p>Amount</p>
                          </label>
                          <div className="withdraw-todo-body-content-form-input-source">
                            <div
                              className="withdraw-todo-body-content-form-input-amount"
                              disabled={true}
                              id="amount"
                            >
                              {amountGenerated}
                            </div>
                          </div>
                        </div>
                        <div className="withdraw-todo-body-content-form-input-container">
                          <label htmlFor="tudo-withdraw-source">
                            <p>Withdraw To</p>
                          </label>
                          <div className="withdraw-todo-body-content-form-input-source">
                            <div
                              className="withdraw-todo-body-content-form-input-paymentMethod"
                              onClick={() => {
                                handleToggleDropDown();
                              }}
                            >
                              {paymentMethod}
                            </div>
                            <img
                              className="withdraw-todo-body-content-form-input-drop-down"
                              src={downArrow}
                              alt="drop down icon"
                              onClick={() => {
                                handleToggleDropDown();
                              }}
                            />
                            <p className="withdraw-todo-grey-text">
                              Select bank account
                            </p>
                            <div
                              className={
                                toggleDropDown
                                  ? "withdraw-todo-body-content-form-input-results"
                                  : "withdraw-todo-body-content-form-input-results-hidden"
                              }
                            >
                              {
                              bankAccounts.map(eachAccount => displayAccount(eachAccount)
                              )}
                              <p
                                onClick={() =>
                                  triggerModal("addBankAccount")
                                }
                              >
                                Add Bank Account
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="withdraw-todo-body-content-form-input-checkbox">
                          <input type="checkbox" />
                          <span>
                            Kindly tick the box if you want this card saved for
                            next time
                          </span>
                        </div>
                        <div className="withdraw-todo-body-content-form-save">
                          <button
                            className={
                              noEmptyFields && !isWithdrawing
                                ? ""
                                : "withdraw-todo-body-content-form-submit-disabled"
                            }
                            disabled={!noEmptyFields}
                            onClick={handleWithdraw}
                          >
                            Withdraw
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {openModal && renderModalTypes()}
      </div>
    );
  
}

export default WithdrawSavings;
