import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "../../axios-instance";
import { withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";
import Button from "../commons/styledComponents/SubmitButton";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import checkTokenValidityAndLogout from "../../checkTokenValidityAndLogout";
import { logout } from "../../redux/auth/authAction";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(0)
    }
  }
}));

const PayModal = ({ showPaymentModal, setPaymentModal, todoID, history }) => {
  const [formData, setFormData] = useState({
    amount: "",
    contributor_email: "",
    contributor_name: ""
  });

  const [isLoading, setisLoading] = useState(false);

  const [isShowPaystackModal, setIsShowPaystackModal] = useState({
    showPaystackModal: false,
    payStackUrl: ""
  });

  const { showPaystackModal, payStackUrl } = isShowPaystackModal;

  const { amount, contributor_email, contributor_name } = formData;

  const classes = useStyles();

  const dispatch = useDispatch();

  const changeKoboToNaira = () => {
    setFormData({
      ...formData,
      amount: parseFloat(formData.amount).toFixed(2)
    });
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    let newData;
    e.preventDefault();
    setisLoading(true);

    if (formData.contributor_email === "" || formData.contributor_name === "") {
      newData = { amount: formData.amount * 100, tudo_code: todoID };
    } else {
      newData = {
        ...formData,
        amount: formData.amount * 100,
        tudo_code: todoID
      };
    }

    try {
      const res = await axios.post("/tudo/contribute", newData);
      const {
        data: { message, status }
      } = res;

      if (message === "Authorization URL generated" && status === 201) {
        setisLoading(false);
        setPaymentModal(false);
        setIsShowPaystackModal({
          showPaystackModal: true,
          payStackUrl: res.data.data.authorization_url
        });
      }
    } catch (err) {
      setisLoading(false);
      err.response.status === 403 &&
      err.response.data.error === "Authentication Failed"
        ? checkTokenValidityAndLogout(logout, history, dispatch)
        : toast.error("Failed Try Again!");
    }
  };

  return (
    <div className="contribute-payment-modal">
      <Modal
        open={showPaymentModal}
        onClose={() => setPaymentModal(false)}
        onOverlayClick={() => setPaymentModal(false)}
      >
        {isLoading ? (
          <div className={classes.root}>
            <LinearProgress variant="query" />
          </div>
        ) : (
          ""
        )}

        <Form className="m-3" onSubmit={handleSubmit}>
          <h4 className="swal-add-card-title">Contribute To This Goal</h4>

          <Form.Group controlId="" className="mt-3 mb-3">
            <Form.Label>
              <small>How much do you want to contribute?</small>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="0.00"
              required
              name="amount"
              value={amount}
              onChange={e => onChange(e)}
              onBlur={changeKoboToNaira}
              onKeyDown={e =>
                e.keyCode > 32 &&
                (e.keyCode < 48 || e.keyCode > 57) &&
                e.preventDefault()
              }
            />
          </Form.Group>

          <Form.Group controlId="" className="mt-4 mb-4">
            <Form.Label>
              <small>Full name (optional)</small>
            </Form.Label>
            <Form.Control
              name="contributor_name"
              type="text"
              value={contributor_name}
              onChange={e => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="" className="mt-3 mb-5">
            <Form.Label>
              <small>Email (optional)</small>
            </Form.Label>
            <Form.Control
              type="email"
              name="contributor_email"
              value={contributor_email}
              onChange={e => onChange(e)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-12">
              <Button
                className="mb-2 gfvElr-btn"
                backgroundColor="#7594fb"
                borderColor="transparent"
                boxShadow="none"
                width="550px"
                borderRadius="5px"
                Height="45px"
                disabled={isLoading ? true : false}
              >
                {isLoading ? <Spinner animation="border" /> : "Pay"}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      {showPaystackModal ? (
        <div
          className="paystack-contribute-modal"
          style={showPaystackModal ? { display: "block" } : { display: "none" }}
          open={showPaystackModal}
          onClose={() => setPaymentModal(false)}
          onOverlayClick={() => setPaymentModal(false)}
        >
          <div className="paystack-contribute-modal-content">
            <iframe src={payStackUrl} height="500" width="500"></iframe>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default withRouter(PayModal);
