import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Edit as EditIcon, Save as SaveIcon } from '@material-ui/icons';
import { IconButton, LinearProgress } from '@material-ui/core';

import UpdateQuestion from './EditQuestion';

import { GET_TEST_BY_UUID, UPDATE_TEST_BY_UUID } from './graphql';

import {
  CustomTypography, TestTextField, Container, ContainerQuestions,
} from './styles';

const UpdateTest = () => {
  const { location: { pathname } } = useHistory();
  const urlArray = pathname.split('/');
  const urlUUID = urlArray[urlArray.length - 1];

  const [ updatingQuestions, setUpdatingQuestions ] = useState(false);
  const [ text, changeText ] = useState('');
  const [ isDisabledField, changeDisable ] = useState(true);
  const { loading, error, data } = useQuery(GET_TEST_BY_UUID(urlUUID));
  const [ updateTestByUUIDs, { loading: updating, error: updateError } ] = useMutation(UPDATE_TEST_BY_UUID);

  const handleChangeInput = ({ target: { value } }) => {
    if (value) {
      changeText(value);
    }
  };

  const handleUpdatingQuestions = (isUpdating) => {
    setUpdatingQuestions(isUpdating);
  };

  const handleEditTest = () => {
    const { testByUUID: { name } } = data;

    changeText(name);
    changeDisable(false);
  };

  const saveTest = () => {
    updateTestByUUIDs({ variables: {
      UUID: urlUUID,
      name: text,
    }}).then(() => {
      changeDisable(true);
      toast('Updating Name of Test Successful');
    });
  };

  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <LinearProgress variant={(updating || updatingQuestions) ? "indeterminate" : "determinate"} />
      {updateError && <p>Error :(</p>}
      <CustomTypography variant="h4">
        Content of Test
      </CustomTypography>
      <Container>
        <TestTextField
          label="Test Name"
          variant="outlined"
          disabled={isDisabledField}
          value={text || data.testByUUID.name}
          onChange={handleChangeInput}
        />
        {isDisabledField ? (
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={handleEditTest}
          >
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="save"
            onClick={saveTest}
          >
            <SaveIcon />
          </IconButton>
        )}
      </Container>
      <CustomTypography variant="h5">
        Content of Questions
      </CustomTypography>
      <ContainerQuestions>
        {data
        && data.testByUUID
        && !data.testByUUID.questions
        && (
          <CustomTypography  variant="h5" gutterBottom >
            Sorry, there are no answers to this question..
          </CustomTypography>
        )}
        {data
          && data.testByUUID
          && data.testByUUID.questions
          && data.testByUUID.questions.map((question, index) => (
          <UpdateQuestion
            key={question.text + index}
            question={question}
            UUID={urlUUID}
            setUpdatingQuestions={handleUpdatingQuestions}
          />
        ))}
      </ContainerQuestions>
    </div>
  );
};

export default UpdateTest;
