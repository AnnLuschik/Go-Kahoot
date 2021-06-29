import {gql} from "@apollo/client";

export const CREATE_NEW_TEST = gql`
  mutation createNewTest($name: String!) {
    createNewTest(input: { name: $name }) {
      ID
      UUID
      name
    }
  }
`;
