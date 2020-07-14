import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Container, Image } from "semantic-ui-react";

import { setAuthedUser } from "../actions/authedUser";

export class Login extends Component {
  state = {
    username: "",
  };

  handleChange = (id) => {
    this.setState((prevState) => ({
      username: id,
    }));

    console.log(this.state.username);
  };

  handleLogin = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username } = this.state;

    dispatch(setAuthedUser(username));
  };

  render() {
    const { users } = this.props;

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
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{user.id}</Card.Header>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
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
