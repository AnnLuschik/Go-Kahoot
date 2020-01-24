import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';

import UpdateAnswer from './EditAnswer';

import { UPDATE_QUESTIONS_BY_UUID } from './graphql';

import {
  Checkbox, TextField, Container, ContainerQuestions, ContainerAnswers,
} from './styles';
import { CustomTypography } from "../styles";
import {toast} from "react-toastify";

const UpdateQuestion = ({ question, UUID, setUpdatingQuestions }) => {
  const [ rightAnswer, changeRightAnswer ] = useState(question.rightAnswer);
  const [ text, changeText ] = useState(question.text);
  const [ answers, changeAnswers ] = useState(question.answers);
  const [ isDisabledField, changeDisable ] = useState(true);
  const [ updateQuestionByUUIDs, { loading: updating, error: updateError } ] = useMutation(UPDATE_QUESTIONS_BY_UUID);

  const handleChangeInput = ({ target: { value } }) => {
    changeText(value);
  };

  const handleEditQuestion = () => {
    changeDisable(false);
  };

  const handleEditAnswers = (ID) => ({ target: { value: text } }) => {
    const index = answers.findIndex(({ ID: answerID }) => answerID === ID);

    changeAnswers([
      ...answers.slice(0, index),
      {
        ...answers[index],
        text,
      },
      ...answers.slice(index + 1),
    ]);
  };

  const saveQuestion = () => {
    const resultAnswers = answers.map(({ sequential, text, ID, imgURL }) => {
      return {
        ID,
        text,
        sequential,
        imgURL,
      }
    });

    updateQuestionByUUIDs({ variables: {
        testUUID: UUID,
        input: [{
          UUID: question.UUID,
          text,
          rightAnswer: rightAnswer,
          answers: [...resultAnswers]
        }],
      }
    }).then(() => {
      changeDisable(true);
      toast('All questions data saved');
    });
  };

  const handleChangeCheckbox = (index) => () => {
    changeRightAnswer(index);
    saveQuestion();
  };

  if (updating) {
    setUpdatingQuestions(true);
  } else {
    setUpdatingQuestions(false);
  }

  return (
    <Container>
      {updateError && <p>Error :(</p>}
      <div>
        <ContainerQuestions>
          <TextField
            label="Question Text"
            variant="outlined"
            disabled={isDisabledField}
            value={text}
            onChange={handleChangeInput}
          />
          {isDisabledField ? (
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={handleEditQuestion}
            >
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              aria-label="save"
              onClick={saveQuestion}
            >
              <SaveIcon />
            </IconButton>
          )}
        </ContainerQuestions>
        <CustomTypography variant="h6">
          Content of Answers
        </CustomTypography>
        {!answers.length && (
          <CustomTypography  variant="h5" gutterBottom >
            Sorry, Sorry, there are no answers to this question..
          </CustomTypography>
        )}
        {answers.map(({ID, text}, index) => (
          <ContainerAnswers key={ID + index}>
            <UpdateAnswer
              id={ID}
              text={text}
              handleEditAnswers={handleEditAnswers}
              saveQuestion={saveQuestion}
            />
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={index === rightAnswer}
              onChange={handleChangeCheckbox(index)}
            />
          </ContainerAnswers>
        ))}
      </div>
    </Container>
  );
};

export default UpdateQuestion;