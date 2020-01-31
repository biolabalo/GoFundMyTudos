import React, { useEffect, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../../Sidebar/";
import Bottombar from "../../Bottombar";
import AuthNavBar from "../../commons/AuthNavBar";
import { Link } from "react-router-dom";
import TuduFeedCard2 from "../TuduFeedCard/tuduFeedCard";

const TuduFeeds = ({ history }) => {
  const { userFeed } = useSelector(state => state.auth);

  const [stateFromRedux, setStateFromRedux] = useState(userFeed);

  useEffect(() => {
    if (!userFeed.length) {
      return history.push("/dashboard");
    }
  }, [history, userFeed.length]);

  const filterTudo = e => {

    if(e.target.value === "") return setStateFromRedux(userFeed);
    const newData = [...userFeed];
    const filteredData = newData.filter(
      each => each.goal_name.toLowerCase().includes(e.target.value.toLowerCase())
       ||  each.user.first_name.toLowerCase().includes(e.target.value) ||  each.user.last_name.toLowerCase().includes(e.target.value)
    );
    setStateFromRedux(filteredData);
  };

  return (
    <div className="tudu">
      <div className="tudu-sidebar">
        <Sidebar path={window} />
      </div>
      <div className="tudu-bottombar">
        <Bottombar path={window} />
      </div>
      <div className="tudu-body">
        <AuthNavBar />
        <div className="history-body-content">
          <div className="tudu-body-content-image">
            <img
              src="https://res.cloudinary.com/xerdetech/image/upload/v1574816688/Layer_2_eresxf.png"
              alt=""
            />
          </div>

          <div className="row">
            <div className="col-md-1">
              <div className="share-tudo-body-content-back">
                <Link to="/dashboard">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
            </div>
            {stateFromRedux ? (
              <div className="col-md-9">
                <div style={{ display: "flex" }} className="tlf">
                  <div style={{ flex: "50%" }}>
                    <h2
                      style={{ color: "rgb(74,83,113)" }}
                      className="Todu-List-Feed"
                    >
                      Todu List Feed
                    </h2>
                  </div>
                  <div style={{ flex: "50%" }}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          {" "}
                          <i className="fas fa-search"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={e => filterTudo(e)}
                        aria-label="Text input with radio button"
                        placeholder="Search"
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="dashboard-body-content-sect2-tudufeed">
                  {stateFromRedux.map((eachFeed, index) => (
                    <TuduFeedCard2 key={index} eachFeed={eachFeed} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-md-9">
                <h2
                  style={{ color: "rgb(74,83,113)" }}
                  className="Todu-List-Feed"
                >
                  Todu List Feed
                </h2>
                <div className="col-md-12 linear-background"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuduFeeds;
