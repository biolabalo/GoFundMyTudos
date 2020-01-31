import React from "react";
import { toast } from "react-toastify";

import Modal from "./index";

import "./confirmation.scss";

export class Confirmation extends React.Component {
  handleSubmit = () => {
    const { closeModal } = this.props;
    window.location.reload();
    toast.success("Account created");
    closeModal();
  };

  handleRedirect = () => {
    const { triggerModal } = this.props;
    triggerModal("addBankAccount");
  };

  render() {
    const { triggerModal, accountNumber, name, bank } = this.props;
    return (
      <>
        <Modal
          title="Please Confirm"
          subtitle="Confirm if the details below match your bank account details"
          submitButtonValue="Confirm"
          triggerModal={triggerModal}
          handleSubmit={this.handleSubmit}
          closeModal={this.handleRedirect}
        >
          <form action="">
            <div className="confirmation-container">
              <div className="confirmation-container-sub">
                <div>{bank}</div>
              </div>
            </div>
            <div className="confirmation-container">
              <div className="confirmation-container-sub">
                <div>{accountNumber}</div>
              </div>
            </div>
            <div className="confirmation-container">
              <div className="confirmation-container-sub">
                <div>{name}</div>
              </div>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}

export default Confirmation;
