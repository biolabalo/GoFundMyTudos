import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Modal from "./index";

import downArrow from "../../images/drop-down-30.png";

import { ADD_BANK_ACCOUNT } from "../../redux/bankAccounts/bankTypes";
import axios from "../../axios-instance";
import "./addBankAccountModal.scss";

export class AddBankAccountModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfBanks: [],
      noEmptyFields: false,
      isCreating: false,
      cardAdded: false,
      formValues: {
        bank_code: "",
        bank: "",
        accountNumber: undefined
      },
      toggleDropDown: false,
      openModal: false
    };
  }

  componentDidMount() {
    fetch("https://api.paystack.co/bank")
      .then(results => results.json())
      .then(response => {
        this.setState({
          ...this.state,
          listOfBanks: response.data
        });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(__err => __err);
  }

  handleToggleDropDown = () => {
    this.setState({
      ...this.state,
      toggleDropDown: !this.state.toggleDropDown
    });
  };

  handleChange = e => {
    const {
      formValues: { bank, accountNumber }
    } = this.state;

    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        [e.target.id]: e.target.value
      },
      noEmptyFields: bank && accountNumber
    });
  };

  handleSelect = e => {
    const {
      formValues: { bank, accountNumber }
    } = this.state;

    return this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        bank_code: e.target.id,
        bank: e.target.textContent
      },
      toggleDropDown: !this.state.toggleDropDown,
      noEmptyFields: bank || accountNumber
    });
  };

  handleSubmit = async () => {
    this.setState(
      {
        ...this.state,
        isCreating: true
      },
      async () => {
        const {
          formValues: { bank_code, accountNumber }
        } = this.state;
        const { addBankAccount, triggerModal } = this.props;

        try {
          const res = await axios.post("/bank-details", {
            bank_code,
            account_number: accountNumber
          });

          const {
            data: { message, status }
          } = res;

          if (message === "Bank detail successfully added" && status === 201) {
            addBankAccount(res.data);
            triggerModal("confirmation");
            this.setState({
              ...this.state,
              isCreating: false,
              cardAdded: true,
              openModal: true
            });
          }
        } catch (err) {
          if (
            err.response &&
            err.response.data.error.account_detail &&
            err.response.data.error.account_detail[0] ===
              "Already added this bank account"
          ) {
            return toast.error("Already added this bank account");
          }

          return toast.error("Failed Try Again!");
        }
      }
    );
  };

  render() {
    const {
      listOfBanks,
      formValues: { bank, accountNumber },
      toggleDropDown,
      isCreating
    } = this.state;

    const { closeModal } = this.props;

    return (
      <>
        <Modal
          title="Add Your Bank Account"
          subtitle="Please provide your banking details. This is the account your funds will be deposited in."
          submitButtonValue="Add"
          closeModal={closeModal}
          handleSubmit={this.handleSubmit}
          isCreating={isCreating}
        >
          <form action="">
            <div className="addBankAccountModal-container">
              <div className="addBankAccountModal-container-paymentMethod">
                <input
                  className="addBankAccountModal-container-paymentMethod-input"
                  onClick={() => {
                    this.handleToggleDropDown();
                  }}
                  placeholder="Select Bank"
                  value={bank}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                <img
                  className="addBankAccountModal-container-paymentMethod-input-dropDown"
                  src={downArrow}
                  alt="drop down icon"
                  onClick={() => {
                    this.handleToggleDropDown();
                  }}
                />
                <div
                  className={
                    toggleDropDown
                      ? "addBankAccountModal-container-paymentMethod-input-results"
                      : "addBankAccountModal-container-paymentMethod-input-results-hidden"
                  }
                >
                  {listOfBanks.map(eachBank => {
                    return (
                      <p
                        key={eachBank.code}
                        id={eachBank.code}
                        onClick={e => this.handleSelect(e)}
                      >
                        {eachBank.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="addBankAccountModal-container">
              <div className="addBankAccountModal-container-account">
                <input
                  id="accountNumber"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  defaultValue="Account Number"
                  placeholder="Account Number"
                  value={accountNumber}
                  type="number"
                />
              </div>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  state,
  data: state.bankAccounts
});

const mapDispatchToProps = dispatch => {
  return {
    addBankAccount: data => {
      dispatch({ type: ADD_BANK_ACCOUNT, payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBankAccountModal);
