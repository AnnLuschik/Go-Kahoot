import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";

import { TextField } from './styles';

const UpdateAnswer = ({ handleEditAnswers, text, saveQuestion, id }) => {
  const [ isDisabledField, changeDisable ] = useState(true);

  const handleEditQuestion = () => {
    changeDisable(false);
  };

  const handleSave = () => {
    saveQuestion();
    changeDisable(true);
  };

  return (
    <div>
      <TextField
        label="Answer Text"
        variant="outlined"
        disabled={isDisabledField}
        value={text}
        onChange={handleEditAnswers(id)}
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
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      )}
    </div>
  );
};

export default UpdateAnswer;