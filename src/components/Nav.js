import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const StyledLi = styled.li`
  display: inline;
  margin-left: 15px;
`;

class Nav extends Component {
  render() {
    const { authedUser } = this.props;

    return (
      <StyledNav className="navbar">
        <NavLink to="/" exact>
          WYR..?
        </NavLink>
        <ul>
          <StyledLi>User: {authedUser}</StyledLi>
          <StyledLi>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </StyledLi>
          <StyledLi>
            <NavLink to="/add" exact>
              Ask
            </NavLink>
          </StyledLi>
          <StyledLi>
            <NavLink to="/leaderboard" exact>
              Leaderboard
            </NavLink>
          </StyledLi>
        </ul>
      </StyledNav>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
