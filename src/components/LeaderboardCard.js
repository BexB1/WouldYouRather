import React, { Component } from "react";
import { connect } from "react-redux";

import { Item } from "semantic-ui-react";

class LeaderboardCard extends Component {
  render() {
    const {
      pointsTotal,
      user,
      userQuestionsCount,
      userQuestionsAnsweredCount,
    } = this.props;

    return (
      <Item>
        <Item.Image size="tiny" src={user.avatarURL} />

        <Item.Content verticalAlign="middle">
          <Item.Header>{user.name}</Item.Header>
          <Item.Meta>
            <span className="price">Asked: {userQuestionsCount} | </span>
            <span className="stay">Answered: {userQuestionsAnsweredCount}</span>
          </Item.Meta>
          <p>Total: {pointsTotal} points</p>
        </Item.Content>
      </Item>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const user = users[id];
  const userQuestionsCount = user.questions.length;
  const userQuestionsAnsweredCount = Object.keys(user.answers).length;
  const pointsTotal = userQuestionsCount + userQuestionsAnsweredCount;

  return {
    user,
    pointsTotal,
    userQuestionsCount,
    userQuestionsAnsweredCount,
  };
}

export default connect(mapStateToProps)(LeaderboardCard);
