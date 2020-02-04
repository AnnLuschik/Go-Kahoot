import gql from "graphql-tag";

export const CHAT_MESSAGES_OF_GAME_BY_CODE = gql`
  query chatMessagesOfGameByCode(
    $code: String!
    $offset: Int!
    $limit: Int!
    $order: ChatTimeOrder!
  ) {
    chatMessagesOfGameByCode(
      code: $code
      offset: $offset
      limit: $limit
      order: $order
    ) {
      UUID
      message
      player {
        UUID
        name
      }
      time
    }
  }
`;

export const SEND_MESSAGE_TO_CHAT = gql`
  mutation sendMessageToChat($playerUUID: String!, $message: String!) {
    sendMessageToChat(playerUUID: $playerUUID, message: $message) {
      UUID
      message
      player {
        UUID
        name
      }
      time
    }
  }
`;

export const ON_CHAT_GAME = gql`
  subscription onChatGame($gameCode: String!, $playerUUID: String!) {
    onChatGame(gameCode: $gameCode, playerUUID: $playerUUID) {
      UUID
      message
      player {
        UUID
        name
      }
      time
    }
  }
`;
