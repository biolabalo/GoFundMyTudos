import React from "react";

import "./modal.scss";

export class Modal extends React.Component {
  render() {
    const {
      title,
      subtitle,
      submitButtonValue,
      children,
      closeModal,
      handleSubmit,
      isCreating,
      disableButtons
    } = this.props;
    return (
      <>
        <div className="modalPopUp">
          <div className="modalPopUp-container">
            <div
              className={
                disableButtons
                  ? "modalPopUp-container-title-disabled-buttons"
                  : "modalPopUp-container-title"
              }
            >
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
            <div>{children}</div>
            {disableButtons ? null : (
              <div className="modalPopUp-container-buttons">
                <button
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Cancel
                </button>
                <input
                  disabled={isCreating}
                  className={
                    isCreating ? "modalPopUp-container-submit_loading" : null
                  }
                  type="submit"
                  value={submitButtonValue ? submitButtonValue : "Continue"}
                  onClick={e => handleSubmit(e)}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
