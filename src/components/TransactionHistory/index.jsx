import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Tab, Nav, NavItem } from "react-bootstrap";
import classNames from "classnames";

import RecordList from "./RecordList";
import axios from "../../axios-instance";
import "./transactionHistory.scss";

const useQuery = () => new URLSearchParams(useLocation().search);

const TransactionHistory = () => {
  const history = useHistory();
  const query = useQuery().get("type");

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const validQueries = ["savings", "tudo", "all"];
    if (!validQueries.includes(query)) {
      // redirect to type=all if query is not valid or no query at all
      history.push(`${history.location.pathname}?type=all`);
    }
  }, [query, history]);

  useEffect(() => {
    setLoading(true);

    const _allEndpointQueryParams = {
      credit: ["tudo-top-ups", "tudo-contributions", "savings-credited"], // creditBased
      debit: ["tudo-withdrawal", "savings-withdrawal"] // debitBased
    };

    const makeRequest = (param, cb) =>
      new Promise(resolve => {
        axios
          .get(`/transaction-history?type=${param}`)
          .then(({ data }) => resolve(cb(data.data)));
      });

    const requests = [];
    for (let category in _allEndpointQueryParams) {
      const requestsByCategory = _allEndpointQueryParams[category].map(
        param => {
          return makeRequest(param, function(data) {
            const type = param.split("-")[0];
            return data.map(record => ({ ...record, category, type }));
          });
        }
      );
      requests.push(...requestsByCategory);
    }

    Promise.all(requests).then(responses => {
      setLoading(false);
      setRecords(responses.flatMap(response => response));
    });
  }, []);

  return (
    <Tab.Container>
      <Nav as="nav" variant="tabs">
        <NavItem>
          <Link
            to="/dashboard/history?type=all"
            className={classNames("nav-link", { active: query === "all" })}
          >
            All
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/dashboard/history?type=tudo"
            className={classNames("nav-link", { active: query === "tudo" })}
          >
            Tudo
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/dashboard/history?type=savings"
            className={classNames("nav-link", {
              active: query === "savings"
            })}
          >
            savings
          </Link>
        </NavItem>
      </Nav>

      <Tab.Content>
        <RecordList
          loading={loading}
          records={
            query === "all"
              ? records
              : records.filter(record => record.type === query)
          }
          key={query}
        />
      </Tab.Content>
    </Tab.Container>
  );
};

export default TransactionHistory;
