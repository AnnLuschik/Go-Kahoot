import React from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { LinearProgress } from '@material-ui/core';

import { CREATE_NEW_TEST } from './graphql';

import {
  Button, TextField, Typography, Container,
} from './styles';

const TestStep = ({ setID, handleNext }) => {
  const [ createNewTest, { loading, error } ] = useMutation(CREATE_NEW_TEST);

  const showToast = ({ data : { createNewTest: { name, ID } } }) => {
    toast(`Create ${name} Successful`);
    setID(ID);
    handleNext();
  };

  if (error) return <p>Error :(</p>;

  let name;

  return (
    <form onSubmit={e => {
      e.preventDefault();
      createNewTest({ variables: {
        name: name.value,
      }}).then(
        (data) => showToast(data)
      );
    }}>
      <LinearProgress variant={loading ? 'indeterminate': 'determinate'} />
      <Typography variant="h4" gutterBottom>
        Create Test
      </Typography>
      <Container>
        <TextField
          type='text'
          variant="outlined"
          label="Enter Name of Test"
          inputRef={ node => name = node }
        />
        <Button
          type='submit'
          color="primary"
          variant="contained"
        >
          Next
        </Button>
      </Container>
    </form>
  );
};

export default TestStep;
