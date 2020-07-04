import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../../utils/_DATA.js";

class Question extends Component {
  render() {
    console.log(this.props);
    const { question } = this.props;

    const { id, author, timestamp, optionOne, optionTwo } = question;

    return <div>{id}</div>;
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    authedUser,
    question: formatQuestion(
      question.optionOne.text,
      question.optionTwo.text,
      users[question.author]
    ),
  };
}

// ^ FORMAT: function formatQuestion({ optionOneText, optionTwoText, author })

export default connect(mapStateToProps)(Question);
