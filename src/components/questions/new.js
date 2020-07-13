import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { handleAddQuestion } from "../../actions/shared";
import { Button, Container, Form, Grid, Input } from "semantic-ui-react";

export class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(id, optionOneText, optionTwoText));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: id ? false : true,
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Grid columns="one" centered>
          <Grid.Row>
            <Grid.Column>
              <h1>New Question</h1>
              <Form>
                <p>"Would you rather..."</p>
                <Form.Field>
                  <Input
                    label="First option"
                    name="optionOneText"
                    placeholder="Option One"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    label="Second option"
                    name="optionTwoText"
                    placeholder="Option Two"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button
                  onClick={this.handleSubmit}
                  disabled={(optionOneText && optionTwoText) === ""}
                >
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default connect()(NewQuestion);
