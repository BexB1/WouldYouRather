import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

// GET authedUser, so User can answer a poll.

class showQuestion extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        <Question id={id} />
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  return {
    id,
  };
}

export default connect(mapStateToProps)(showQuestion);
