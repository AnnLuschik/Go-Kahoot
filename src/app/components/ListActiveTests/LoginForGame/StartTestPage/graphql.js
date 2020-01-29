import { gql } from 'apollo-boost';

export const DELETE_PLAYER_FROM_GAME = gql`
  mutation deletePlayerFromGame(
    $gameCode: String!
    $playerUUID: String!
  ) {
    deletePlayerFromGame(
      gameCode: $gameCode
      playerUUID: $playerUUID
    ) {
      success
    }
  }
`;

export const ONDELETE_PLAYER_FROM_GAME = gql`
  subscription onDeletePlayerFromGame(
    $gameCode: String!
    $playerUUID: String!
  ) {
    onDeletePlayerFromGame(
      gameCode: $gameCode
      playerUUID: $playerUUID
    ) {
      UUID
      gameCode
      name
    }
  }
`;
