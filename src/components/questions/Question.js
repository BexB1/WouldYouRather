import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

import { formatQuestion } from "../../utils/_DATA.js";
import { formatDate } from "../../utils/helpers.js";

class Question extends Component {
  render() {
    const { question, author, authedUser, questionVotes } = this.props;

    const { id, timestamp, optionOne, optionTwo } = question;

    return (
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={author.avatarURL} />
          <Card.Header>{question.author} asks...</Card.Header>
          <Card.Meta>{formatDate(timestamp)}</Card.Meta>
          <Card.Description>Would you rather...</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              {optionOne.text}
            </Button>
            <Button basic color="red">
              {optionTwo.text}
            </Button>
          </div>
          {questionVotes.includes(authedUser) ? (
            <p>You've voted for this</p>
          ) : null}
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;
  const questionVotes = optionOneVotes.concat(optionTwoVotes);

  return {
    authedUser,
    question,
    author,
    users,
    questionVotes,
  };
}

export default connect(mapStateToProps)(Question);
