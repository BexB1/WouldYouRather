import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Question from "./questions/Question";
import { Container, Grid, Tab } from 'semantic-ui-react'

export class Home extends Component {
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;

    const panes = [
      {
        menuItem: 'Unanswered',
        render: () =>
          <Tab.Pane attached={false}>
            <div>
              {unansweredQuestions.map((q) => (
                <Link to={`/question/${q.id}`} key={q.id}>
                  <Question id={q.id} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
      },
      {
        menuItem: 'Answered',
        render: () => 
          <Tab.Pane attached={false}>
            <div>
              {answeredQuestions.map((q) => (
                <Link to={`/question/${q.id}`} key={q.id}>
                  <Question id={q.id} />
                </Link>
              ))}
            </div>
          </Tab.Pane>,
      },
    ]

    return (
      <Container>
      <h1>Would you rather...</h1>
      <Grid columns='one' centered>
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
              
            </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
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
