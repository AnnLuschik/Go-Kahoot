import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { IconButton, LinearProgress, Tooltip } from "@material-ui/core";

import { CREATE_NEW_QUESTION } from "./graphql";

import {
  Button,
  TextField,
  Checkbox,
  TextFieldAnswers,
  ContainerAnswer,
  ContainerAnswers,
  Container,
  Typography,
  ButtonAnswer
} from "./styles";

const QuestionStep = ({ testUUID, handleNext }) => {
  const [question, changeQuestion] = useState({
    text: "",
    testUUID,
    rightAnswer: 0
  });
  const [answers, changeAnswers] = useState([
    {
      text: "",
      sequential: 0,
      errorAnswer: true
    },
    {
      text: "",
      sequential: 0,
      errorAnswer: true
    }
  ]);
  const [errorQuestion, setErrorQuestion] = useState(false);
  const [isShowErrorAnswer, setIsShowErrorAnswer] = useState(false);
  const [createNewQuestion, { loading, error }] = useMutation(
    CREATE_NEW_QUESTION
  );

  const handleChangeQuestion = ({ target: { value: text } }) => {
    setErrorQuestion(false);
    changeQuestion({ ...question, text });
  };

  const handleChangeCheckbox = index => () => {
    changeQuestion({ ...question, rightAnswer: index });
  };

  const handleChangeAnswer = index => ({ target: { value: text } }) => {
    setIsShowErrorAnswer(false);
    changeAnswers([
      ...answers.slice(0, index),
      {
        text,
        sequential: answers[index].sequential,
        errorAnswer: text.length < 4
      },
      ...answers.slice(index + 1)
    ]);
  };

  const handleAddAnswer = () => {
    changeAnswers([
      ...answers,
      {
        text: "",
        sequential: 0,
        errorAnswer: true
      }
    ]);
  };

  const handleDeleteAnswer = index => () => {
    changeAnswers([...answers.slice(0, index), ...answers.slice(index + 1)]);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    const sendAnswers = answers.map(({ errorAnswer, ...answer }) => ({
      ...answer
    }));
    const isErrorQuestion = question.text.length < 4;
    const isErrorAnswer = Boolean(
      answers.filter(elem => elem.errorAnswer).length
    );

    if (isErrorQuestion) setErrorQuestion(true);

    if (isErrorAnswer) setIsShowErrorAnswer(true);

    if (isErrorQuestion || isErrorAnswer) return;

    createNewQuestion({
      variables: { ...question, answers: [...sendAnswers] }
    }).then(() => {
      toast("Create Question Successful");
      handleNext();
    });
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <LinearProgress variant={loading ? "indeterminate" : "determinate"} />
        <Typography variant="h4" gutterBottom>
          Create Question
        </Typography>
        <Container>
          <TextField
            type="text"
            variant="outlined"
            label="Enter Question name"
            value={question.text}
            onChange={handleChangeQuestion}
            error={errorQuestion}
            helperText={
              errorQuestion && "Sorry text is too short, at least 4 characters"
            }
          />
          <Button type="submit" color="primary" variant="contained">
            Next
          </Button>
        </Container>
        <ButtonAnswer
          type="button"
          color="primary"
          variant="contained"
          onClick={handleAddAnswer}
        >
          Add Answer
        </ButtonAnswer>
        <ContainerAnswers>
          {answers.map(({ text, errorAnswer }, index) => {
            const shouldShowAnswer = errorAnswer && isShowErrorAnswer;
            const errorHelperText =
              shouldShowAnswer &&
              "Sorry text is too short, at least 4 characters";
            const isChecked = index === question.rightAnswer;

            return (
              <ContainerAnswer key={index}>
                <TextFieldAnswers
                  type="text"
                  label="Answer"
                  variant="outlined"
                  value={text}
                  onChange={handleChangeAnswer(index)}
                  error={shouldShowAnswer}
                  helperText={errorHelperText}
                />
                <Tooltip title="Choose the correct answer">
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    checked={isChecked}
                    onChange={handleChangeCheckbox(index)}
                  />
                </Tooltip>
                <Tooltip title="Delete answer">
                  <IconButton
                    aria-label="delete"
                    onClick={handleDeleteAnswer(index)}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </ContainerAnswer>
            );
          })}
        </ContainerAnswers>
      </form>
      {error && <p>Something went wrong :(</p>}
    </>
  );
};

export default QuestionStep;
