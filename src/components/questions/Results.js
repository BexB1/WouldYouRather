import React, { Component } from "react";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";

class Results extends Component {
  render() {
    const { authedUser, questionVotes, resultsByOption } = this.props;

    const results = Object.values(resultsByOption);

    return (
      <div>
        {results.map((option) => (
          <div>
            <h3>"{option.optionText}"</h3>
            <p>
              {option.optionVotes.length > 0 ? option.optionVotes.length : 0}
              users voted for this option.
            </p>
            <Progress
              percent={
                option.optionVotes.length > 0
                  ? Math.round(
                      (option.optionVotes.length / questionVotes.length) * 100
                    )
                  : 0
              }
              value={
                option.optionVotes.length > 0 ? option.optionVotes.length : 0
              }
              total={questionVotes.length}
              color={option.optionVotes.includes(authedUser) ? "green" : "grey"}
              label={option.optionVotes.includes(authedUser) ? "You" : null}
              progress
            />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;
  const questionVotes = optionOneVotes.concat(optionTwoVotes);
  const usersAnsweredQuestions = questionVotes.includes(authedUser);

  return {
    authedUser,
    question,
    users,
    questionVotes,
    optionOneVotes,
    optionTwoVotes,
    resultsByOption: {
      optionOne: {
        optionText: question.optionOne.text,
        optionVotes: optionOneVotes,
      },
      optionTwo: {
        optionText: question.optionTwo.text,
        optionVotes: optionTwoVotes,
      },
    },
    usersAnsweredQuestions,
  };
}

export default connect(mapStateToProps)(Results);
