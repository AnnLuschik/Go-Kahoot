import gql from "graphql-tag";

export const UPDATE_QUESTIONS_BY_UUID = gql`
  mutation updateQuestionsByUUIDs (
    $testUUID: String!,
    $input: [UpdateQuestion!]!,
  ) {
    updateQuestionsByUUIDs(
      testUUID: $testUUID
      input: $input
    ) {
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
