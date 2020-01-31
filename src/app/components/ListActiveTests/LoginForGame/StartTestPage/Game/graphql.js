import { gql } from 'apollo-boost';

export const ONPLAYING_GAME = gql`
  subscription onPlayingGame(
    $gameCode: String!
    $playerUUID: String!
  ) {
    onPlayingGame(
      gameCode: $gameCode
      playerUUID: $playerUUID
    ) {
      timer
      gameCode
      currentQuestionUUID
      gameStatusEnum
    }
  }
`;

export const QUESTION_BY_UUID = (urlUUID) => gql`
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
    $rightAnswer: Int!
  ) {
    answerQuestionByUUID(
      playerUUID: $playerUUID
      questionUUID: $questionUUID
      rightAnswer: $rightAnswer
    )
  }
`;
