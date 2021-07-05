import React, { useState, useEffect } from "react";
import toast from "toastr";
import { IconButton, Tooltip } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";

import { EditAnswer } from "../EditAnswer";
import { MarkDown } from "../../MarkDown";

import { UPDATE_QUESTIONS_BY_UUID } from "./graphql";

import { CustomTypography } from "../styles";
import {
  Checkbox,
  Container,
  ContainerQuestions,
  ContainerAnswers,
  ContainerMarkDown
} from "./styles";

export const EditQuestion = ({ question, UUID, onUpdatingQuestions }) => {
  const [isDisabledField, changeDisable] = useState(true);
  const [text, changeText] = useState(question.text);
  const [answers, changeAnswers] = useState(question.answers);
  const [rightAnswer, changeRightAnswer] = useState(question.rightAnswer);

  const [
    updateQuestionByUUIDs,
    { loading: updating, error: updateError }
  ] = useMutation(UPDATE_QUESTIONS_BY_UUID);

  const handleChangeInput = value => {
    changeText(value);
  };

  const handleEditQuestion = () => {
    changeDisable(false);
  };

  const handleEditAnswers = ID => text => {
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
      toast.warning("Sorry text is too short, at least 4 characters");

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
      toast.success("All questions data saved");
    });
  };

  const handleChangeCheckbox = index => () => {
    changeRightAnswer(index);
    saveQuestion(index, index);
  };

  useEffect(() => {
    if (updating) {
      onUpdatingQuestions(true);
    } else {
      onUpdatingQuestions(false);
    }
  }, [updating, onUpdatingQuestions]);

  return (
    <Container>
      {updateError && <p>Error :(</p>}
      <div>
        <ContainerQuestions>
          <ContainerMarkDown>
            <MarkDown
              text={text}
              handleChange={handleChangeInput}
              height={100}
              commandNumber={0}
              readOnly={isDisabledField}
            />
          </ContainerMarkDown>
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
        <CustomTypography variant="h6" color="textPrimary">Content of Answers</CustomTypography>
        {answers && !answers.length && (
          <CustomTypography variant="h5" gutterBottom>
            Sorry, there are no answers to this question..
          </CustomTypography>
        )}
        {answers &&
          answers.map(({ ID, text, sequential }, index) => (
            <ContainerAnswers key={ID + index}>
              <EditAnswer
                id={ID}
                text={text}
                onSaveQuestion={saveQuestion}
                onEditAnswers={handleEditAnswers}
              />
              <Tooltip title="Choose the correct answer">
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  checked={sequential === rightAnswer}
                  onChange={handleChangeCheckbox(sequential)}
                />
              </Tooltip>
            </ContainerAnswers>
          ))}
      </div>
    </Container>
  );
};
