import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import styled from "styled-components";

import { deleteAuthedUser } from "../actions/authedUser";

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
  state = {
    toLogin: false,
  };

  logOut = () => {
    const { dispatch } = this.props;

    dispatch(deleteAuthedUser());
  };

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
          <StyledLi>
            <Button onClick={this.logOut}>Log out</Button>
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
