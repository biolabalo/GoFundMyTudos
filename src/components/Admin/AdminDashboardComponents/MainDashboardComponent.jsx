import React from "react";
import graph from "../../../images/Screenshot 2020-01-23 at 7.43.14 PM.png";

export class MainDashboardComponent extends React.Component {
  state = {
    newUsers: ""
  };

  render() {
    const { newUsers } = this.state;

    return (
      <div>
        <div>
          <h2>User Growth</h2>
          <p>Showing number of new users from Dec 1, 2019 - Dec 30, 2019</p>
        </div>
        <div>{newUsers} new users</div>
        <div>
          <img src={graph} alt="" />
        </div>
      </div>
    );
  }
}

export default MainDashboardComponent;
