import { gql } from "@apollo/client";

export const ON_PLAYING_GAME = gql`
  subscription onPlayingGame($gameCode: String!, $playerUUID: String!) {
    onPlayingGame(gameCode: $gameCode, playerUUID: $playerUUID) {
      startTimeSec
      currentTimeSec
      gameCode
      currentQuestionUUID
      gameStatusEnum
      answers {
        answerID
        players {
          player {
            UUID
            gameCode
            name
          }
          wasRight
        }
      }
    }
  }
`;

export const QUESTION_BY_UUID = urlUUID => gql`
  query questionByUUID {
    questionByUUID(id: "${urlUUID}"){
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
`;

export const ANSWER_QUESTION_DY_UUID = gql`
  mutation answerQuestionByUUID(
    $playerUUID: String!
    $questionUUID: String!
    $answerID: Int!
  ) {
    answerQuestionByUUID(
      playerUUID: $playerUUID
      questionUUID: $questionUUID
      answerID: $answerID
    )
  }
`;
