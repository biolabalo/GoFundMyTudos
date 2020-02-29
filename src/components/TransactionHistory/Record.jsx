import React from "react";
import Moment from "moment";

const toNaira = amount => amount / 100;

// represent a single transaction record
const Record = props => {
  const timestamp = props.created_at || props.contributed_at;
  const amount = props.amount || props.saved_amount;
  return (
    <div className={`record ${props.category}`} style={props.style}>
      <div className="record-icon">
        {props.category === "credit" ? (
          <i className="fas fa-arrow-down" />
        ) : (
          <i className="fas fa-arrow-up" />
        )}
      </div>
      <div className="record-details">
        <h6 className="record-category">{props.category}</h6>
        <time className="record-timestamp" datatime={timestamp}>
          {Moment(timestamp).format("dddd Do, MMMM YYYY [at] hh:mm a")}
        </time>
      </div>
      <div className="record-amount">₦{toNaira(amount).toLocaleString()}</div>
    </div>
  );
};

export default Record;
