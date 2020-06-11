export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
