import React, { useState } from "react";
import { Form, Spinner, InputGroup, FormControl } from "react-bootstrap";
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

  const { amount, contributor_email, contributor_name } = formData;

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleAmountChange = e => {
    const {
      target: { name, value }
    } = e;

    // attaches ","
    const formatNumber = parseInt(value.replace(/,/g, "")).toLocaleString();
    // validates against other inputs apart from  numbers
    setFormData({ ...formData, [name]:  value ? formatNumber.replace(/[^0-9 \,]/, '') : value });
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    let newData;
    e.preventDefault();
    setisLoading(true);

    
    if (formData.contributor_email === "" && formData.contributor_name === "") {
      newData = { amount: parseInt(amount.replace( /,/g, "" )) * 100, tudo_code: todoID };
    }
    
    if (formData.contributor_email !== "" && formData.contributor_name !== "") {
        newData = {
        ...formData,
        amount: parseInt(amount.replace( /,/g, "" )) * 100,
        tudo_code: todoID
      }; 
    } 

    if (formData.contributor_email !== "" && formData.contributor_name === "") {
      newData = {
      contributor_email,
      amount: parseInt(amount.replace( /,/g, "" )) * 100,
      tudo_code: todoID
    }; 
  } 

  if (formData.contributor_email === "" && formData.contributor_name !== "") {
    newData = {
    contributor_name,
    amount: parseInt(amount.replace( /,/g, "" )) * 100,
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
        window.location = res.data.data.authorization_url;
      }
    } catch (err) {
       setisLoading(false);


      if(err.response.data.error.tudo_code){
        return toast.error(err.response.data.error.tudo_code[0])
       }

     if(err.response.status === 400 && 
      err.response.data.error.amount){
      return toast.error(err.response.data.error.amount[0])
     }

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
          <Form.Label>
            <small>How much do you want to contribute?</small>
          </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">₦</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              placeholder="0.00"
                 onChange={handleAmountChange}
              aria-label="Username"
              name="amount"
              value={amount}
              aria-describedby="basic-addon1"
              onKeyDown={e =>
                e.keyCode > 32 &&
                (e.keyCode < 48 || e.keyCode > 57) &&
                e.preventDefault()
              }
            />
          </InputGroup>

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
                width="100%"
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
    </div>
  );
};

export default withRouter(PayModal);
