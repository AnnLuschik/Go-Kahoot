import React, { useState } from "react";
import toast from "toastr";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";
import { IconButton, LinearProgress, Tooltip } from "@material-ui/core";

import { EditQuestion } from "./EditQuestion";
import { CreateQuestion } from '../CreateQuestion';

import { GET_TEST_BY_UUID, UPDATE_TEST_BY_UUID } from "./graphql";

import {
  CustomTypography,
  TestTextField,
  Container,
  ContainerQuestions,
  AddQuestionButton
} from "./styles";

export const EditTest = () => {
  const {
    location: { pathname }
  } = useHistory();
  const urlArray = pathname.split("/");
  const urlUUID = urlArray[urlArray.length - 1];

  const [text, changeText] = useState("");
  const [isDisabledField, changeDisable] = useState(true);
  const [isErrorQuestion, setIsErrorQuestion] = useState(false);
  const [updatingQuestions, setUpdatingQuestions] = useState(false);

  const [addQuestion, setAddQuestion] = useState(false);
  const [addingQuestion, setAddingQuestion] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_TEST_BY_UUID(urlUUID));
  const [
    updateTestByUUIDs,
    { loading: updating, error: updateError }
  ] = useMutation(UPDATE_TEST_BY_UUID);

  const handleChangeInput = ({ target: { value } }) => {
    changeText(value);
    setIsErrorQuestion(false);
  };

  const handleEditTest = () => {
    const {
      testByUUID: { name }
    } = data;

    changeText(name);
    changeDisable(false);
  };

  const saveTest = () => {
    if (text.length < 4) {
      setIsErrorQuestion(true);

      return;
    }

    updateTestByUUIDs({ variables: { UUID: urlUUID, name: text } }).then(() => {
      changeDisable(true);
      toast.success("Updating Name of Test Successful");
      refetch();
    });
  };

  const saveNewQuestion = () => {
    setAddQuestion(false);
    refetch();
  }

  if (loading) return <LinearProgress value={100} />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <LinearProgress
        variant={
          updating || updatingQuestions ? "indeterminate" : "determinate"
        }
        value={100}
      />
      {updateError && <p>Error :(</p>}
      <CustomTypography variant="h4">Content of Test</CustomTypography>
      <Container>
        <TestTextField
          label="Test Name"
          variant="outlined"
          value={text || data.testByUUID.name}
          onChange={handleChangeInput}
          disabled={isDisabledField}
          error={isErrorQuestion}
          helperText={
            isErrorQuestion && "Sorry text is too short, at least 4 characters"
          }
        />
        {isDisabledField ? (
          <div>
            <Tooltip title="Edit test name">
              <IconButton edge="end" aria-label="edit" onClick={handleEditTest}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip title="Save test name">
              <IconButton edge="end" aria-label="save" onClick={saveTest}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </Container>
      <CustomTypography variant="h5">Content of Questions</CustomTypography>
      <ContainerQuestions>
        {data && data.testByUUID && !data.testByUUID.questions && (
          <CustomTypography variant="h5" gutterBottom>
            Sorry, there are no answers to this question..
          </CustomTypography>
        )}
        {data &&
          data.testByUUID &&
          data.testByUUID.questions &&
          data.testByUUID.questions.map((question, index) => (
            <EditQuestion
              key={question.text + index}
              question={question}
              UUID={urlUUID}
              onUpdatingQuestions={(v) => setUpdatingQuestions(v)}
            />
          ))}
          {addingQuestion 
            ? <LinearProgress
                variant="indeterminate"
                value={100}
              />
            : null
          }
          {addQuestion 
            ? <CreateQuestion 
              testUUID={urlUUID} 
              buttonHandler={saveNewQuestion}
              onLoad={(v) => setAddingQuestion(v)} 
              buttonText="Save" 
              />
            : null
        }
        <AddQuestionButton onClick={() => setAddQuestion(true)}>Add question</AddQuestionButton> 
      </ContainerQuestions>
    </div>
  );
};
