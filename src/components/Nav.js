import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <NavLink to="/new" exact>
                Ask
              </NavLink>
            </li>
            <li>
              <NavLink to="/" exact>
                WYR?
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard" exact>
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
