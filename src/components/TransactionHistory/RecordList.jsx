import React from "react";
import { Spinner } from "react-bootstrap";

import { ReactComponent as Logo } from "../../images/empty.svg";
import Record from "./Record";

const EmptyTransactionView = () => (
  <div className="empty-transaction">
    <Logo />
    <p>
      Nothing to see here. You haven’t carried out <br /> any transactions yet
    </p>
  </div>
);

const RecordList = props => {
  const animationDelay = 0.15;

  return (
    <>
      {props.loading ? (
        <div className="spinner">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : props.records.length > 0 ? (
        <div className="record-list">
          {props.records.map((record, index) => (
            <Record
              key={record.id}
              {...record}
              style={{ animationDelay: `${animationDelay * index}s` }}
            />
          ))}
        </div>
      ) : (
        <EmptyTransactionView />
      )}
    </>
  );
};

export default RecordList;
