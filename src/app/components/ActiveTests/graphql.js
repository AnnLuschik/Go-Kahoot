import {gql} from "@apollo/client";

export const ACTIVATED_GAMES = gql`
  query {
    activatedGames {
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

export const DEACTIVATE_TEST = gql`
  mutation deactivateGameByCODEs($codes: [String!]!) {
    deactivateGameByCODEs(codes: $codes) {
      success
    }
  }
`;
