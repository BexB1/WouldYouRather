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
          <div key={option.id}>
            <h3>"{option.optionText}"</h3>
            <p>
              {option.optionVotes.length > 0 ? option.optionVotes.length : 0}{" "}
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

  return {
    authedUser,
    question,
    users,
    questionVotes,
    resultsByOption: {
      optionOne: {
        id: 1,
        optionText: question.optionOne.text,
        optionVotes: optionOneVotes,
      },
      optionTwo: {
        id: 2,
        optionText: question.optionTwo.text,
        optionVotes: optionTwoVotes,
      },
    },
  };
}

export default connect(mapStateToProps)(Results);
