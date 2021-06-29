import { gql } from "@apollo/client";

export const CREATE_NEW_QUESTION = gql`
  mutation createNewQuestion(
    $testUUID: String!
    $text: String!
    $rightAnswer: Int!
    $answers: [InputAnswer!]!
  ) {
    createNewQuestion(
      input: {
        testUUID: $testUUID
        text: $text
        rightAnswer: $rightAnswer
        answers: $answers
      }
    ) {
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
