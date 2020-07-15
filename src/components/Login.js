import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Card, Container, Image } from "semantic-ui-react";

import { setAuthedUser } from "../actions/authedUser";

export class Login extends Component {
  state = {
    username: "",
    toHome: false,
  };

  handleChange = (id) => {
    this.setState((prevState) => ({
      username: id,
    }));
  };

  handleLogin = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username } = this.state;

    dispatch(setAuthedUser(username));

    this.setState(() => ({
      toHome: true,
    }));
  };

  render() {
    const { users } = this.props;
    const { username, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <h1>Log in</h1>
        <Card.Group itemsPerRow={3}>
          {users.map((user) => (
            <Card
              key={user.id}
              id={user.id}
              onClick={() => this.handleChange(user.id)}
            >
              <Image src={user.avatarURL} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user.id}</Card.Header>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <h2>Logging in as: {username}</h2>
        <Button color="blue" fluid onClick={this.handleLogin}>
          Login
        </Button>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: Object.values(users),
  };
}
export default connect(mapStateToProps)(Login);
