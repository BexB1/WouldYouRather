import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./questions/Question";

// GETS polls
export class Home extends Component {
  render() {
    const {
      authedUser,
      questions,
      answeredQuestions,
      unansweredQuestions,
    } = this.props;

    return (
      <div>
        <div>
          <h1>Unanswered Questions</h1>
          {unansweredQuestions.map((q) => (
            <div key={q.id}>
              <Question id={q.id} />
            </div>
          ))}
        </div>
        <div>
          <h1>Answered Questions</h1>
          {answeredQuestions.map((q) => (
            <div key={q.id}>
              <Question id={q.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// questions is the array of questions from the store
// questionIds is an array of question.Ids, sorted by question.timestamp,

function mapStateToProps({ questions, users, authedUser }) {
  let questionValues = Object.values(questions);
  const user = users[authedUser];
  const authedUserAnswers = user ? Object.keys(user.answers) : [];

  const answeredQuestions = questionValues
    .filter((q) => authedUserAnswers.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredQuestions = questionValues
    .filter((q) => !authedUserAnswers.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredQuestions: answeredQuestions,
    unansweredQuestions: unansweredQuestions,
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Home);
