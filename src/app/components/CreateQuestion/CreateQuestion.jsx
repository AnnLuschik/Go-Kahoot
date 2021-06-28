import React, { useState, useEffect } from "react";
import toast from "toastr";
import { Prompt } from "react-router";
import { useMutation } from "@apollo/client";
import { AnimatedList } from "react-animated-list";

import { MarkDown } from "../MarkDown/index";
import { Answer, AddAnswer } from './components';

import { CREATE_NEW_QUESTION } from "./graphql";

import {
  Button,
  Container,
  ContainerAnswers,
  Typography,
  ContainerMarkDown,
} from "./styles";

export const CreateQuestion = ({ testUUID, buttonText, buttonHandler, onLoad }) => {
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
    if (answers.length < 3)
      return toast.warning(
        "Sorry, you cannot delete the answer. There should be at least 2."
      );

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
      buttonHandler();
    });
  };

  useEffect(() => {
    onLoad(loading);
  }, [loading, onLoad])

  return (
    <>
      <Prompt message="You haven’t finished creating the test, do you want to go anyway?" />
      <form onSubmit={handleSubmitForm}>
        <AnimatedList animation={"grow"}>
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
              {buttonText}
            </Button>
          </Container>
          <AddAnswer onClick={handleAddAnswer} isDisabled={answers.length > 7} />
          <ContainerAnswers>
            <AnimatedList animation={"grow"}>
              {answers.map(({ text, errorAnswer, sequential }, index) => {
                const isChecked = sequential === question.rightAnswer;

                return <Answer key={index} 
                  id={index}
                  sequential={sequential}
                  text={text}
                  changeAnswer={handleChangeAnswer(index)}
                  changeCheckbox={handleChangeCheckbox}
                  deleteAnswer={handleDeleteAnswer}
                  isChecked={isChecked}
                />
              })}
            </AnimatedList>
          </ContainerAnswers>
        </AnimatedList>
      </form>
      {error && <p>Something went wrong :(</p>}
    </>
  );
};
