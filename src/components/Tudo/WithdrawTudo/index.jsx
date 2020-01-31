import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "../../../axios-instance";
import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";
import Bottombar from "../../Bottombar";
import AddBankAccountModal from "../../Modal/addBankAccountModal";
import Confirmation from "../../Modal/confirmation";
import Congratulations from "../../Modal/congratulations";

import downArrow from "../../../images/drop-down-30.png";

import { withdrawTudo } from "../../../redux/tudo/tudoAction";
import { FETCH_BANK_ACCOUNTS } from "../../../redux/bankAccounts/bankTypes";

import "./WithdrawTudo.scss";

class WithdrawTudo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noEmptyFields: false,
      tudoId: "",
      bankAccountId: "",
      formValues: {
        paymentMethod: "",
        amountGenerated: ""
      },
      toggleDropDown: false,
      openModal: false,
      modalType: "",
      selectedModal: "",
      bankAccounts: []
    };
  }

  componentDidMount() {
    this.getBanks();
    const {
      match: { params: id },
      tudos
    } = this.props;

    this.setState({
      tudoId: id.id,
      formValues: {
        amountGenerated: tudos ? tudos.amount_generated / 100 : ""
      }
    });
  }

  getBanks = async () => {
    try {
      const { fetchAccounts } = this.props;
      const response = await axios.get("/bank-details");
      const {
        data: { data }
      } = response;

      this.setState({
        bankAccounts: data
      });

      fetchAccounts(data);
    } catch (err) {
      return err;
    }
  };

  displayAccount = account => {
    return (
      <div key={account.id}>
        <p onClick={e => this.handleSelect(e, account)}>
          {account.account_number}
        </p>
      </div>
    );
  };

  handleToggleDropDown = () => {
    this.setState({
      ...this.state,
      toggleDropDown: !this.state.toggleDropDown
    });
  };

  handleSelect = (e, account) => {
    return this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        paymentMethod: e.target.textContent
      },
      noEmptyFields: true,
      toggleDropDown: !this.state.toggleDropDown,
      bankAccountId: account ? account.id : ""
    });
  };

  handleWithdraw = async e => {
    e.preventDefault();

    const { tudoId, bankAccountId } = this.state;
    const { withdrawTudos } = this.props;

    await withdrawTudos({ bankAccountId, tudoId }, this.callBack);
  };

  callBack = () => {
    const { history } = this.props;
    this.setState({
      ...this.state,
      selectedModal: "congratulations",
      openModal: true
    });

    setTimeout(() => {
      return history.push("/dashboard");
    }, 6000);
  };

  renderModalTypes = () => {
    const {
      history,
      bankAccounts: { userBankAccounts }
    } = this.props;

    const { selectedModal } = this.state;

    switch (selectedModal) {
      case "addBankAccount":
        return (
          <AddBankAccountModal
            history={history}
            triggerModal={this.triggerModal}
            closeModal={this.closeModal}
          />
        );
      case "confirmation":
        return (
          <Confirmation
            accountNumber={userBankAccounts[0].data.account_number}
            bank={userBankAccounts[0].data.bank_name}
            name={userBankAccounts[0].data.account_name}
            triggerModal={this.triggerModal}
            closeModal={this.closeModal}
          />
        );
      case "congratulations":
        return (
          <Congratulations history={history} closeModal={this.closeModal} />
        );
      default:
        return true;
    }
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      openModal: false
    });
  };

  triggerModal = modal => {
    this.setState({
      ...this.state,
      openModal: true,
      selectedModal: modal
    });
  };

  render() {
    const history = window;
    const {
      bankAccounts,
      noEmptyFields,
      toggleDropDown,
      formValues: { amountGenerated, paymentMethod },
      openModal
    } = this.state;

    const { isWithdrawing } = this.props;

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
                                this.handleToggleDropDown();
                              }}
                            >
                              {paymentMethod}
                            </div>
                            <img
                              className="withdraw-todo-body-content-form-input-drop-down"
                              src={downArrow}
                              alt="drop down icon"
                              onClick={() => {
                                this.handleToggleDropDown();
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
                              {bankAccounts.map(eachAccount => {
                                return this.displayAccount(eachAccount);
                              })}
                              <p
                                onClick={() =>
                                  this.triggerModal("addBankAccount")
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
                            onClick={this.handleWithdraw}
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

        {openModal && this.renderModalTypes()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bankAccounts: state.bankAccounts,
    isWithdrawing: state.tudo.isWithdrawing,
    withdrawnData: state.tudo.data,
    tudos: state.tudo.tudos[0],
    state
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAccounts: data => {
    dispatch({ type: FETCH_BANK_ACCOUNTS, payload: [...data] });
  },
  withdrawTudos: (data, callBack) => {
    dispatch(withdrawTudo(data, callBack));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawTudo);
