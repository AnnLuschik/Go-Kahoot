import { gql } from "@apollo/client";

export const GET_ALL_TESTS = gql`
  query {
    tests {
      ID
      UUID
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
    deleteTestByID(id: $id) {
      success
    }
  }
`;

export const ACTIVATE_GAME = gql`
  mutation activateGame($testUUID: String!) {
    activateGame(testUUID: $testUUID) {
      CODE
      players {
        UUID
        name
      }
      test {
        ID
        UUID
        name
        questions {
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
            imgURL
          }
        }
      }
    }
  }
`;
