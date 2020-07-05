import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { formatQuestion } from "../../utils/_DATA.js";
import { formatDate } from "../../utils/helpers.js";

class Question extends Component {
  render() {
    const { question, author, authedUser, questionVotes } = this.props;

    const { id, timestamp, optionOne, optionTwo } = question;

    return (
      <Link to={`/question/${id}`}>
        <div>
          {/* TODO:Remove questions ASKED by current user */}
          <img src={author.avatarURL} alt="" />
          <span>Question by {question.author}</span>
          <span> -- {formatDate(timestamp)}</span>
          <p>Would you rather...</p>
          <p>
            <span>{optionOne.text}</span> OR <span>{optionTwo.text}</span>
          </p>
          <p>Op1 votes: {optionOne.votes}</p>
          <p>Op2 votes: {optionTwo.votes}</p>
          {questionVotes.includes(authedUser) ? (
            <p>You've voted for this</p>
          ) : null}
          <hr />
        </div>
      </Link>
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
