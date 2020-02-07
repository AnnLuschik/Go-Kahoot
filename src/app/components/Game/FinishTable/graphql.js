import { gql } from "apollo-boost";

export const REPORT_GAME_BY_CODE = CODE => gql`
  query reportGameByCode {
    reportGameByCode(code: "${CODE}"){
      code
      players {
        player {
          UUID
          name
        }
        answers {
          answer {
            ID
            text
            sequential
            imgURL
          }
          right
        }
      }
    }
  }
`;
