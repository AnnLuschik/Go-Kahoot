import {gql} from "@apollo/client";

export const UPDATE_QUESTIONS_BY_UUID = gql`
  mutation updateQuestionsByUUIDs(
    $testUUID: String!
    $input: [UpdateQuestion!]!
  ) {
    updateQuestionsByUUIDs(testUUID: $testUUID, input: $input) {
      UUID
      text
      rightAnswer
      answers {
        text
        sequential
      }
    }
  }
`;
