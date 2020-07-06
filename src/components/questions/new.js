import React, { Component } from "react";
import { Button, Form, Input } from 'semantic-ui-react'

//  GET authedUser so User can create Poll
// SET options of new Poll

export class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const st = this.state;

    console.log("New question: ", st)
  }

  render() {
    const { optionOneText, optionTwoText } = this.state
    return (
    <div>
      <h1>New Question</h1>
      <Form>
        <p>"Would you rather..."</p>
        <Form.Field>
          <Input label="First option" name="optionOneText" placeholder='Option One' onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Input label="Second option" name="optionTwoText" placeholder='Option Two' onChange={this.handleChange} />
        </Form.Field>
        <Button onClick={this.handleSubmit} disabled={(optionOneText && optionTwoText) === ""}>Submit</Button>
      </Form>
    </div>
    )
  }
}

export default NewQuestion;
