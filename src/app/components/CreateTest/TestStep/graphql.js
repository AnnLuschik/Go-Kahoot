import gql from "graphql-tag";

export const CREATE_NEW_TEST = gql`
  mutation createNewTest($name: String!) {
    createNewTest(input: { name: $name }) {
      ID
      UUID
      code
      name
    }
  }
`;