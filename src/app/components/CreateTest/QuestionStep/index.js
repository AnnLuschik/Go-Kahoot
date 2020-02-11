import React, { useState } from "react";
import toast from "toastr";
import { Prompt } from "react-router";
import { useMutation } from "@apollo/react-hooks";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { IconButton, LinearProgress, Tooltip } from "@material-ui/core";

import MarkDown from "../../MarkDown";

import { CREATE_NEW_QUESTION } from "./graphql";

import {
  Button,
  Checkbox,
  ContainerAnswer,
  ContainerAnswers,
  Container,
  Typography,
  ButtonAnswer,
  ContainerMarkDown,
  ContainerMarkDownAnswers
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
      sequential: 1,
      errorAnswer: true
    }
  ]);
  const [createNewQuestion, { loading, error }] = useMutation(
    CREATE_NEW_QUESTION
  );

  const handleChangeQuestion = text => {
    changeQuestion({ ...question, text });
  };

  const handleChangeCheckbox = sequential => () => {
    changeQuestion({ ...question, rightAnswer: sequential });
  };

  const handleChangeAnswer = index => text => {
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
        sequential: answers[answers.length - 1].sequential + 1,
        errorAnswer: true
      }
    ]);
  };

  const handleDeleteAnswer = index => () => {
    const isCheckedAnswer = answers[index].sequential === question.rightAnswer;

    if (isCheckedAnswer) {
      if (index === 0) {
        changeQuestion({ ...question, rightAnswer: answers[1].sequential });
      } else {
        changeQuestion({ ...question, rightAnswer: answers[0].sequential });
      }
    }
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

    if (isErrorQuestion || isErrorAnswer) {
      toast.warning(
        "You must use at least 4 characters in each field, please make sure that you fill in everything."
      );

      return;
    }

    createNewQuestion({
      variables: { ...question, answers: [...sendAnswers] }
    }).then(() => {
      toast.success("Create Question Successful");
      handleNext();
    });
  };

  return (
    <>
      <Prompt message="You haven’t finished creating the test, do you want to go anyway?" />
      <form onSubmit={handleSubmitForm}>
        <LinearProgress
          variant={loading ? "indeterminate" : "determinate"}
          value={100}
        />
        <Typography variant="h4" gutterBottom>
          Create Question
        </Typography>
        <Container>
          <ContainerMarkDown>
            <MarkDown
              text={question.text}
              handleChange={handleChangeQuestion}
              height={100}
              commandNumber={0}
            />
          </ContainerMarkDown>
          <Button type="submit" color="primary" variant="contained">
            Next
          </Button>
        </Container>
        <ButtonAnswer
          type="button"
          color="primary"
          variant="contained"
          onClick={handleAddAnswer}
          disabled={answers.length > 7}
        >
          Add Answer
        </ButtonAnswer>
        <ContainerAnswers>
          {answers.map(({ text, errorAnswer, sequential }, index) => {
            const isChecked = sequential === question.rightAnswer;

            return (
              <ContainerAnswer key={index}>
                <ContainerMarkDownAnswers>
                  <MarkDown
                    text={text}
                    handleChange={handleChangeAnswer(index)}
                    height={60}
                    commandNumber={1}
                  />
                </ContainerMarkDownAnswers>
                <Tooltip title="Choose the correct answer">
                  <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    checked={isChecked}
                    onChange={handleChangeCheckbox(sequential)}
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
