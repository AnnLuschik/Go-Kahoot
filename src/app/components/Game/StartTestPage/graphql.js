import { gql } from "@apollo/client";

export const DELETE_PLAYER_FROM_GAME = gql`
  mutation deletePlayerFromGame($gameCode: String!, $playerUUID: String!) {
    deletePlayerFromGame(gameCode: $gameCode, playerUUID: $playerUUID) {
      success
    }
  }
`;

export const START_GAME_BY_CODE = gql`
  mutation startGameByCode($code: String!) {
    startGameByCode(code: $code) {
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
      CODE
      players {
        name
        UUID
      }
    }
  }
`;

export const ON_DELETE_PLAYER_FROM_GAME = gql`
  subscription onDeletePlayerFromGame(
    $gameCode: String!
    $playerUUID: String!
  ) {
    onDeletePlayerFromGame(gameCode: $gameCode, playerUUID: $playerUUID) {
      UUID
      gameCode
      name
    }
  }
`;

export const ON_WAIT_FOR_STARTING_GAME = gql`
  subscription onWaitForStartingGame($gameCode: String!, $playerUUID: String!) {
    onWaitForStartingGame(gameCode: $gameCode, playerUUID: $playerUUID) {
      gameCode
    }
  }
`;
