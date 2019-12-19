import React, { useState, useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "../../../axios-instance";
import { withRouter } from "react-router-dom";
import { logout } from "../../../redux/auth/authAction";
import Modal from "react-responsive-modal";
import useForm from "react-hook-form";
import Button from "../../commons/styledComponents/SubmitButton";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import { ADD_BANK_ACCOUNT } from "../../../redux/bankAccounts/bankTypes";
import checkTokenValidityAndLogout from "../../../checkTokenValidityAndLogout";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(0)
    }
  }
}));

const BankModal = ({ openModal, closeModal, history }) => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm({ mode: "onBlur" });
  const [isLoading, setisLoading] = useState(false);
  const [isAccountNumberError, setIsAccountNumberError] = useState(false);
  const [isAccountRegistered, setIsAccountRegistered] = useState(false);
  const [banks, updateBanks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.paystack.co/bank")
      .then(results => results.json())
      .then(response => {
        const banksArray = response.data;
        updateBanks(banksArray);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(__err => updateBanks([]));
  }, []);

  const clearErrorsAndCloseModal = () => {
    setIsAccountNumberError(false);
    setIsAccountRegistered(false);
    closeModal();
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setisLoading(true);
    setIsAccountNumberError(false);
    setIsAccountRegistered(false);
    try {
      const res = await axios.post("/bank-details", data);
      const {
        data: { message, status }
      } = res;
      if (message === "Bank detail successfully added" && status === 201) {
        setisLoading(false);
        dispatch({ type: ADD_BANK_ACCOUNT, payload: res.data.data });
        closeModal();
        return toast.success("Account created");
      }

      throw new Error("Failed Try Again!");
    } catch (err) {
      setisLoading(false);
      setIsAccountNumberError(false);
      setIsAccountRegistered(false);

      if (
        err.response.status === 403 &&
        err.response.data.error === "Authentication Failed"
      ) {
        checkTokenValidityAndLogout(logout, history, dispatch);
      }

      if (
        err.response &&
        err.response.data.error.invalid_bank_details &&
        err.response.data.error.invalid_bank_details[0] ===
          "cannot resolve account number"
      ) {
        return setIsAccountNumberError(true);
      }
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
  };

  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      className="add-bank-modal"
      onOverlayClick={clearErrorsAndCloseModal}
    >
      {isLoading ? (
        <div className={classes.root}>
          <LinearProgress variant="query" />
        </div>
      ) : (
        ""
      )}

      <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="swal-add-card-title">Add Your Bank Account</h4>
        <hr />
        <small className="mt-2 mb-4 d-block">
          Please provide your banking details. This is the account your funds
          will be deposited in.
        </small>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>
            <small>Select Bank</small>
          </Form.Label>
          <Form.Control as="select" name="bank_code" ref={register}>
            {banks.map((eachBankFromPayStack, index) => (
              <option value={eachBankFromPayStack.code} key={index}>
                {eachBankFromPayStack.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="" className="mt-5 mb-5">
          <Form.Label>
            <small>Account Number</small>
          </Form.Label>
          <Form.Control
            type="number"
            required
            name="account_number"
            onKeyDown={e =>
              e.keyCode > 32 &&
              (e.keyCode < 48 || e.keyCode > 57) &&
              e.preventDefault()
            }
            className={`form-control ${errors.account_number && "is-invalid"} ${
              isAccountNumberError ? "is-invalid" : ""
            }  ${isAccountRegistered ? "is-invalid" : ""}`}
            ref={register({
              required: true,
              minLength: 10,
              maxLength: 10
            })}
          />
          {errors.account_number && (
            <small className="text-danger mt-1">
              Account Number Should be ten digits
            </small>
          )}
          {isAccountNumberError && (
            <small className="text-danger mt-1">
              cannot resolve account number
            </small>
          )}
          {isAccountRegistered && (
            <small className="text-danger mt-1">
              Account Number has already been registered
            </small>
          )}
        </Form.Group>
        <div className="row">
          <div className="col-6"></div>
          <div className="col-2 pr-0  pl-2 ml-3 pt-2">
            <p
              onClick={clearErrorsAndCloseModal}
              className=" d-block"
              aria-label=""
              style={{ color: "#7792fb", cursor: "pointer" }}
            >
              Cancel
            </p>
          </div>
          <div className="col-3">
            {isLoading ? (
              <Button
                className="mt-7"
                backgroundColor="#7594fb"
                borderColor="#7594fb"
                boxShadow="none"
                width="150px"
                borderRadius="5px"
                Height="45px"
                disabled
              >
                <Spinner animation="border" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="mt-7"
                backgroundColor="#7594fb"
                borderColor="transparent"
                boxShadow="none"
                width="150px"
                borderRadius="5px"
                Height="45px"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default withRouter(BankModal);
