import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Question from "./Question";
import { Button, Container, Grid } from "semantic-ui-react";

// GET authedUser, so User can answer a poll.

class showQuestion extends Component {
  state = {
    toHome: false,
  };

  handleClick = () => {
    this.setState(() => ({
      toHome: true,
    }));
  };
  render() {
    const { id } = this.props;
    const { toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="margin-top-md">
        <Grid columns="one" centered>
          <Grid.Row>
            <Grid.Column>
              <Question id={id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button onClick={this.handleClick} className="margin-top-md">
          Back
        </Button>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  return {
    id,
  };
}

export default connect(mapStateToProps)(showQuestion);
