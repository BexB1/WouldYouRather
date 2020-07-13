import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid, Item } from "semantic-ui-react";

import LeaderboardCard from "./LeaderboardCard";

export class Leaderboard extends Component {
  render() {
    const { usersSorted } = this.props;

    return (
      <Container>
        <h1>Leaderboard</h1>
        <Grid columns="one" centered>
          <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column>
              {usersSorted.map((user) => (
                <Item.Group key={user.id}>
                  <LeaderboardCard id={user.id} />
                </Item.Group>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  const usersSorted = Object.values(users)
    .map((u) => ({
      ...u,
      pointsTotal: Object.values(u.answers).length + u.questions.length,
    }))
    .sort((a, b) => b.pointsTotal - a.pointsTotal);

  return {
    usersSorted,
  };
}

export default connect(mapStateToProps)(Leaderboard);
