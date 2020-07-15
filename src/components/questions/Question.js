import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Container, Grid, Image } from "semantic-ui-react";

import Results from "./Results";
import { formatDate } from "../../utils/helpers.js";
import { handleAddAnswer } from "../../actions/shared";

class Question extends Component {
  handleAnswer = (e) => {
    e.preventDefault();

    const { dispatch, question, authedUser } = this.props;

    dispatch(
      handleAddAnswer({
        authedUser,
        qid: question.id,
        answer: e.target.name,
      })
    );
  };

  render() {
    const { question, author, usersAnsweredQuestions } = this.props;

    const { timestamp, optionOne, optionTwo } = question;

    return (
      <Container>
        <Grid columns="two" centered>
          <Grid.Row>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Image floated="left" size="mini" src={author.avatarURL} />
                  <Card.Header>{question.author} asks...</Card.Header>
                  <Card.Meta>{formatDate(timestamp)}</Card.Meta>
                  <Card.Description>Would you rather...</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {usersAnsweredQuestions ? (
                    <Results id={question.id} />
                  ) : (
                    <div className="ui two buttons">
                      <Button
                        color="green"
                        name="optionOne"
                        onClick={this.handleAnswer}
                      >
                        {optionOne.text}
                      </Button>
                      <Button
                        color="blue"
                        name="optionTwo"
                        onClick={this.handleAnswer}
                      >
                        {optionTwo.text}
                      </Button>
                    </div>
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;
  const questionVotes = optionOneVotes.concat(optionTwoVotes);
  const usersAnsweredQuestions = questionVotes.includes(authedUser);

  return {
    authedUser,
    question,
    author,
    users,
    questionVotes,
    optionOneVotes,
    optionTwoVotes,
    usersAnsweredQuestions,
  };
}

export default connect(mapStateToProps)(Question);
