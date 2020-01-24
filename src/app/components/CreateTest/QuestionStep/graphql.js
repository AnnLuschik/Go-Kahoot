import gql from "graphql-tag";

export const CREATE_NEW_QUESTION = gql`
  mutation createNewQuestion(
    $testID: Int!
    $text: String!
    $rightAnswer: Int!
    $answers: [InputAnswer!]!
  ) {
    createNewQuestion(input: {
      testID: $testID
      text: $text
      rightAnswer: $rightAnswer
      answers: $answers
    }) {
      ID
      UUID
      testID
      text
      imgURL
      rightAnswer
      answers {
        ID
        text
        sequential
      }
    }
  }
`;
