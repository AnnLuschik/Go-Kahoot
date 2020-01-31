import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { IconButton, LinearProgress, Tooltip } from '@material-ui/core';

import { CREATE_NEW_QUESTION } from './graphql';

import {
  Button, TextField, Checkbox, TextFieldAnswers, ContainerAnswer,
  ContainerAnswers, Container, Typography, ButtonAnswer,
} from './styles';

const QuestionStep = ({ testUUID, handleNext }) => {
  const [ question, changeQuestion ] = useState({
    text: '',
    testUUID: testUUID,
    rightAnswer: 0,
  });
  const [ answers, changeAnswers ] = useState([]);
  const [ createNewQuestion, { loading, error } ] = useMutation(CREATE_NEW_QUESTION);

  const handleChangeQuestionInput = ({ target: { value: text } }) => {
    changeQuestion({
      ...question,
      text,
    });
  };

  const handleChangeCheckbox = (index) => () => {
    changeQuestion({
      ...question,
      rightAnswer: index,
    });
  };

  const handleChangeAnswerInput = (index) => ({ target: { value: text } }) => {
    changeAnswers([
      ...answers.slice(0, index),
      {
        text,
        sequential: answers[index].sequential,
      },
      ...answers.slice(index + 1),
    ]);
  };

  const handleAddAnswer = () => {
    changeAnswers([
      ...answers,
      {
        text: '',
        sequential: 0,
      },
    ]);
  };

  const handleDeleteAnswer = (index) => () => {
    changeAnswers([
      ...answers.slice(0, index),
      ...answers.slice(index + 1),
    ]);
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          createNewQuestion({
            variables: {
              ...question,
              answers: [ ...answers ],
            },
          }).then(() => {
            handleNext();
            toast('Create Question Successful');
          });
        }}
      >
        <LinearProgress variant={loading ? 'indeterminate': 'determinate'} />
        <Typography variant="h4" gutterBottom>
          Create Question
        </Typography>
        <Container>
          <TextField
            type="text"
            label="Enter Question name"
            variant="outlined"
            value={question.text}
            onChange={handleChangeQuestionInput}
          />
          <Button
            type='submit'
            color="primary"
            variant="contained"
          >
            Next
          </Button>
        </Container>
        <ButtonAnswer
          variant="contained"
          color="primary"
          type="button"
          onClick={handleAddAnswer}
        >
          Add Answer
        </ButtonAnswer>
        <ContainerAnswers>
          {answers.map(({ text }, index) => (
              <ContainerAnswer key={index} >
                <TextFieldAnswers
                  type='text'
                  label="Answer"
                  variant="outlined"
                  value={text}
                  onChange={handleChangeAnswerInput(index)}
                />
                <Tooltip title="Choose the correct answer">
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    checked={index === question.rightAnswer}
                    onChange={handleChangeCheckbox(index)}
                  />
                </Tooltip>
                <Tooltip title="Delete answer">
                  <IconButton
                    aria-label="delete"
                    onClick={handleDeleteAnswer(index)}
                  >
                    <DeleteIcon
                      fontSize="large"
                    />
                  </IconButton>
                </Tooltip>
              </ContainerAnswer>
            )
          )}
        </ContainerAnswers>
      </form>
      {error && <p>Something went wrong :(</p>}
    </>
  );
};

export default QuestionStep;
