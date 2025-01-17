import { gql } from "@apollo/client";

export const ACTIVATED_GAME_BY_CODE = CODE => gql`
  query {
    activatedGameByCode(code: "${CODE}") {
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

export const JOIN_PLAYER_TO_GAME = gql`
  mutation joinPlayerToGame($gameCode: String!, $name: String!) {
    joinPlayerToGame(input: { gameCode: $gameCode, name: $name }) {
      UUID
      name
      game {
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
          UUID
          name
        }
      }
    }
  }
`;

export const ON_WAIT_FOR_JOINING_PLAYER_TO_GAME = gql`
  subscription onWaitForJoiningPlayerToGame(
    $gameCode: String!
    $playerUUID: String!
  ) {
    onWaitForJoiningPlayerToGame(gameCode: $gameCode, playerUUID: $playerUUID) {
      UUID
      gameCode
      name
    }
  }
`;
