import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./questions/Question";

// GETS polls
export class Home extends Component {
  render() {
    return (
      <div>
        {this.props.questionIds.map((id) => (
          <div key={id}>
            <Question id={id} />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Home);
