import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledLi = styled.li`
  display: inline;
  margin-left: 15px;
`;

class Nav extends Component {
  render() {
    const { authedUser } = this.props;

    return (
      <div className="navbar">
        <nav>
          <ul>
            <StyledLi>User: {authedUser}</StyledLi>
            <StyledLi>
              <NavLink to="/new" exact>
                Ask
              </NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/" exact>
                WYR?
              </NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/leaderboard" exact>
                Leaderboard
              </NavLink>
            </StyledLi>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
