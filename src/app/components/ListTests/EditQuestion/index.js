import React, { useState } from "react";
import { toast } from "react-toastify";
import { IconButton, Tooltip } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";

import UpdateAnswer from "../EditAnswer";

import { UPDATE_QUESTIONS_BY_UUID } from "./graphql";

import { CustomTypography } from "../EditTest/styles";
import {
  Checkbox,
  TextField,
  Container,
  ContainerQuestions,
  ContainerAnswers
} from "./styles";

const UpdateQuestion = ({ question, UUID, onUpdatingQuestions }) => {
  const [isDisabledField, changeDisable] = useState(true);
  const [isErrorQuestion, setIsErrorQuestion] = useState(false);
  const [text, changeText] = useState(question.text);
  const [answers, changeAnswers] = useState(question.answers);
  const [rightAnswer, changeRightAnswer] = useState(question.rightAnswer);

  const [
    updateQuestionByUUIDs,
    { loading: updating, error: updateError }
  ] = useMutation(UPDATE_QUESTIONS_BY_UUID);

  const handleChangeInput = ({ target: { value } }) => {
    changeText(value);
    setIsErrorQuestion(false);
  };

  const handleEditQuestion = () => {
    changeDisable(false);
  };

  const handleEditAnswers = ID => ({ target: { value: text } }) => {
    const index = answers.findIndex(({ ID: answerID }) => answerID === ID);

    changeAnswers([
      ...answers.slice(0, index),
      {
        ...answers[index],
        text
      },
      ...answers.slice(index + 1)
    ]);
  };

  const saveQuestion = (e, index = undefined) => {
    if (text.length < 4) {
      setIsErrorQuestion(true);

      return;
    }

    const resultAnswers = answers.map(({ sequential, text, ID, imgURL }) => {
      return {
        ID,
        text,
        sequential,
        imgURL
      };
    });

    updateQuestionByUUIDs({
      variables: {
        testUUID: UUID,
        input: [
          {
            UUID: question.UUID,
            text,
            rightAnswer: typeof index === "number" ? index : rightAnswer,
            answers: [...resultAnswers]
          }
        ]
      }
    }).then(() => {
      changeDisable(true);
      toast("All questions data saved");
    });
  };

  const handleChangeCheckbox = index => () => {
    changeRightAnswer(index);
    saveQuestion(index, index);
  };

  if (updating) {
    onUpdatingQuestions(true);
  } else {
    onUpdatingQuestions(false);
  }

  return (
    <Container>
      {updateError && <p>Error :(</p>}
      <div>
        <ContainerQuestions>
          <TextField
            variant="outlined"
            label="Question Text"
            value={text}
            onChange={handleChangeInput}
            disabled={isDisabledField}
            error={isErrorQuestion}
            helperText={
              isErrorQuestion &&
              "Sorry text is too short, at least 4 characters"
            }
          />
          {isDisabledField ? (
            <Tooltip title="Edit question text">
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={handleEditQuestion}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Save question text">
              <IconButton edge="end" aria-label="save" onClick={saveQuestion}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          )}
        </ContainerQuestions>
        <CustomTypography variant="h6">Content of Answers</CustomTypography>
        {answers && !answers.length && (
          <CustomTypography variant="h5" gutterBottom>
            Sorry, there are no answers to this question..
          </CustomTypography>
        )}
        {answers &&
          answers.map(({ ID, text }, index) => (
            <ContainerAnswers key={ID + index}>
              <UpdateAnswer
                id={ID}
                text={text}
                onSaveQuestion={saveQuestion}
                onEditAnswers={handleEditAnswers}
              />
              <Tooltip title="Choose the correct answer">
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  checked={index === rightAnswer}
                  onChange={handleChangeCheckbox(index)}
                />
              </Tooltip>
            </ContainerAnswers>
          ))}
      </div>
    </Container>
  );
};

export default UpdateQuestion;
