import React from "react";

import Modal from "./index";

import "./congratulations.scss";

export class Congratulations extends React.Component {
  handleSubmit = () => {
    const { closeModal, history } = this.props;
    closeModal();
    history.push("/dashboard");
  };

  render() {
    const { closeModal } = this.props;
    return (
      <>
        <div className="congratulations_modal">
          <img
            src="https://res.cloudinary.com/xerdetech/image/upload/v1577959742/qtge7fe1o7kivscc7c8q.png"
            alt=""
          />
          <Modal
            title="Congratulations!"
            subtitle="Your withdrawal was successful"
            disableButtons={true}
            handleSubmit={this.handleSubmit}
            closeModal={closeModal}
          ></Modal>
        </div>
      </>
    );
  }
}

export default Congratulations;
