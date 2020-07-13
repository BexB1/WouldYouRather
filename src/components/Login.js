import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "semantic-ui-react";

import { setAuthedUser } from "../actions/authedUser";

export class Login extends Component {
  state = {
    username: "",
  };

  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username } = this.state;

    dispatch(setAuthedUser(username));

    this.setState(() => ({
      username: "",
    }));
  };

  render() {
    return (
      <div>
        <Input placeholder="Username" onChange={this.handleChange} />
        <Button color="blue" onClick={this.handleLogin}>
          Log in
        </Button>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}
export default connect(mapStateToProps)(Login);
