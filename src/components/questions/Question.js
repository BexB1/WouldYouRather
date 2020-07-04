import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../../utils/_DATA.js";
import { formatDate } from "../../utils/helpers.js";

class Question extends Component {
  render() {
    const { question, authedUser } = this.props;

    const { id, timestamp, optionOne, optionTwo } = question;

    return (
      <div>
        <span>Question by {question.author}</span>
        <span> -- {formatDate(timestamp)}</span>
        <p>Would you rather...</p>
        <p>
          <span>{optionOne.text}</span> OR <span>{optionTwo.text}</span>
        </p>
        <hr />
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    authedUser,
    question: question,
    author: users[question.author],
    users,
  };
}

export default connect(mapStateToProps)(Question);
