import React, { useState } from "react";
import { toast } from "react-toastify";
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
  const [isShowErrorAnswer, setIsShowErrorAnswer] = useState(false);
  const [createNewQuestion, { loading, error }] = useMutation(
    CREATE_NEW_QUESTION
  );

  const handleChangeQuestion = text => {
    changeQuestion({ ...question, text });
  };

  const handleChangeCheckbox = index => () => {
    changeQuestion({ ...question, rightAnswer: index });
  };

  const handleChangeAnswer = index => text => {
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

    if (isErrorQuestion || isErrorAnswer) {
      toast.warn(
        "You must use at least 4 characters in each field, please make sure that you fill in everything."
      );

      return;
    }

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
        <LinearProgress
          variant={loading ? "indeterminate" : "determinate"}
          value={100}
        />
        <Typography variant="h4" gutterBottom>
          Create Question
        </Typography>
        <Container>
          <div style={{ width: 700 }}>
            <MarkDown
              text={question.text}
              handleChange={handleChangeQuestion}
              height={100}
              commandNumber={0}
            />
          </div>
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
          {answers.map(({ text, errorAnswer }, index) => {
            const isChecked = index === question.rightAnswer;

            return (
              <ContainerAnswer key={index}>
                <div style={{ width: 500 }}>
                  <MarkDown
                    text={text}
                    handleChange={handleChangeAnswer(index)}
                    height={60}
                    commandNumber={1}
                  />
                </div>
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
