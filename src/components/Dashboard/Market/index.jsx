import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";
import Bottombar from "../../Bottombar";

import "./market.scss";

const Market = props => {
  const [open, setOpen] = useState(false);
  const [marketIdea, setMarketIdea] = useState("");

  const openModal = e => {
    e.preventDefault();
    return setOpen(true);
  };

  const handleChange = e => {
    setMarketIdea(e.target.value);
  };

  const { history } = props;

  return (
    <div className="market">
      <div className="market-sidebar">
        <Sidebar path={history} />
      </div>
      <div className="market-bottombar">
        <Bottombar path={history} />
      </div>
      <div className="market-body">
        <AuthNavBar />
        <Modal show={open} onHide={() => setOpen(false)} size="lg" centered>
          <div className="market-modal">
            <div className="market-modal-icon">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1581352657/cahltk2pmx3fkqgo373h.svg"
                alt="modal icon"
              />
            </div>
            <h3>Thank You!</h3>
            <p>
              Your feedback will help us build a better market place for you.
            </p>
            <button onClick={() => history.push("/dashboard")}>
              Dashboard
            </button>
          </div>
        </Modal>
        <div className="market-body-content">
          <div className="market-body-content-container">
            <h3>Tudo Market Place</h3>
            <p>Get everything you need in one place</p>
            <p className="market-body-content-soon">Coming Soon</p>
            <div className="market-body-content-coming">
              <img
                src="https://res.cloudinary.com/xerdetech/image/upload/v1581347195/wc5adyc9ac9iotgxohpr.png"
                alt="market"
              />
            </div>
            <div className="market-body-content-form">
              <p>Share your market place ideas or need</p>
              <Form>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  value={marketIdea}
                  placeholder="Type a response..."
                />
                <Button
                  disabled={marketIdea ? false : true}
                  onClick={openModal}
                >
                  Send
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
