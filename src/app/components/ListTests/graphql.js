import gql from "graphql-tag";

export const GET_ALL_TESTS = gql`
  query {
    tests {
      ID
      UUID
      code
      name
      questions {
        ID
        UUID
        testID
        text
        imgURL
        rightAnswer
        answers {
          text
          imgURL
        }
      }
    }
  }
`;

export const DELETE_TEST = gql`
  mutation deleteTestByID($id: [Int!]!) {
    deleteTestByID(id: $id)
  }
`;
