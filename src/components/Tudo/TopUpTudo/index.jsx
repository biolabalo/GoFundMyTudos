import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios-instance";
import { connect } from "react-redux";

import Sidebar from "../../Sidebar";
import AuthNavBar from "../../commons/AuthNavBar";
import Bottombar from "../../Bottombar";

import { topUp } from "../../../redux/tudo/tudoAction";

import downArrow from "../../../images/drop-down-30.png";

import "./topupTudo.scss";

class TopUpTudo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      noEmptyFields: false,
      paymentMethod: "",
      amount: 0,
      tudoId: "",
      cardId: ""
    };
  }

  componentDidMount() {
    this.getTudo();
    const {
      match: { params: id }
    } = this.props;

    this.setState({
      tudoId: id.id
    });
  }

  getTudo = async () => {
    const token = localStorage.getItem("TUDU_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const retrievedCard = await axios.get(`card-details`, config);

      this.setState({
        ...this.state,
        cards: retrievedCard.data.data
      });
    } catch (e) {
      return e.response;
    }
  };

  displayCard = card => {
    const firstFour = parseInt(card.first_six.toString().slice(0, 4), 10);
    return (
      <div key={card.id}>
        <p onClick={e => this.handleSelect(e, card)}>
          {firstFour} **** **** {card.last_four}
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

  handleChange = e => {
    const { paymentMethod, amount } = this.state;
    this.setState({
      ...this.state,
      amount: e.target.value,
      noEmptyFields: paymentMethod.length > 0 && amount.length > 0
    });
  };

  handleSelect = (e, card) => {
    const { paymentMethod, amount } = this.state;

    return this.setState({
      ...this.state,
      paymentMethod: e.target.textContent,
      toggleDropDown: !this.state.toggleDropDown,
      cardId: card ? card.id : "",
      noEmptyFields: paymentMethod.length > 0 || amount.length > 0
    });
  };

  handleTopUp = async e => {
    e.preventDefault();

    const { history, topUpTodos } = this.props;
    const { cardId, tudoId, amount } = this.state;
    const compiledAmount = parseInt(amount.slice(0, amount.length), 10) * 100;
    await topUpTodos(
      { compiledAmount, cardId: cardId ? cardId : undefined, tudoId },
      history
    );
  };

  render() {
    const history = window;
    const { isTopingUp } = this.props;
    const { toggleDropDown } = this.state;

    return (
      <div className="topup-todo">
        <div className="topup-todo-sidebar">
          <Sidebar path={history} />
        </div>
        <div className="topup-todo-bottombar">
          <Bottombar path={history} />
        </div>
        <div className="topup-todo-body">
          <AuthNavBar />
          <div className="topup-todo-body-content">
            <div className="row">
              <div className="col-md-1">
                <div className="topup-todo-body-content-back">
                  <Link to="/dashboard/tudo">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-11">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <h2>Top Up</h2>
                  </div>
                  <div className="col-md-12 col-lg-8">
                    <div className="topup-todo-body-content-form">
                      <p>Add funds to your “Wedding Plan” goal</p>
                      <form action="">
                        <div className="topup-todo-body-content-form-input-container">
                          <label htmlFor="tudo-topup-amount">
                            <p>Amount</p>
                          </label>
                          <div className="topup-todo-body-content-form-input-source">
                            <input
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              value={this.state.amount}
                              type="number"
                              placeholder="100000"
                            />
                            <p className="topup-todo-grey-text">
                              Enter amount you want to save e.g 100000
                            </p>
                          </div>
                        </div>
                        <div className="topup-todo-body-content-form-input-container">
                          <label htmlFor="tudo-topup-source">
                            <p>Top-Up From</p>
                          </label>
                          <div className="topup-todo-body-content-form-input-source">
                            <input
                              type="text"
                              value={this.state.paymentMethod}
                            />
                            <img
                              onClick={() => {
                                this.handleToggleDropDown();
                              }}
                              className="topup-todo-body-content-form-input-drop-down"
                              src={downArrow}
                              alt="drop down icon"
                            />
                            <p className="topup-todo-grey-text">
                              Select source of withdrawal
                            </p>
                            <div
                              className={
                                toggleDropDown
                                  ? "topup-todo-body-content-form-input-results"
                                  : "topup-todo-body-content-form-input-results-hidden"
                              }
                            >
                              {this.state.cards.map(eachCard => {
                                return this.displayCard(eachCard);
                              })}
                              <p onClick={e => this.handleSelect(e)}>
                                Add Debit Card
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="topup-todo-body-content-form-input-checkbox">
                          <input type="checkbox" />
                          <span>
                            Kindly tick the box if you want this card saved for
                            next time
                          </span>
                        </div>
                        {/* <div className="topup-todo-body-content-form-save">
                          <button
                            className={
                              this.state.noEmptyFields
                                ? ""
                                : "topup-todo-body-content-form-submit-disabled"
                            }
                            disabled={!this.state.noEmptyFields}
                            onClick={this.handleTopUp}
                          >
                            Top Up
                          </button>
                        </div> */}
                        <div className="topup-todo-body-content-form-save">
                          <button
                            className={
                              this.state.noEmptyFields && !isTopingUp
                                ? ""
                                : "topup-todo-body-content-form-submit-disabled"
                            }
                            disabled={!this.state.noEmptyFields}
                            onClick={this.handleTopUp}
                          >
                            Top Up
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state,
  isTopingUp: state.tudo.isTopingUp
});

const mapDispatchToProps = dispatch => ({
  topUpTodos: (compiledData, history) => {
    dispatch(topUp(compiledData, history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopUpTudo);
