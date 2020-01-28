import gql from 'graphql-tag';

export const GET_TEST_BY_UUID = (urlUUID) => gql`
  query testByUUID {
    testByUUID(id: "${urlUUID}"){
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
        }
      }
    }
  }
`;

export const UPDATE_TEST_BY_UUID = gql`
  mutation updateTestByUUIDs (
    $UUID: String!,
    $name: String!,
  ) {
    updateTestByUUIDs(input: {
      UUID: $UUID
      name: $name
    }) {
      ID
      UUID
    }
  }
`;
