import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";

import { TextField } from "./styles";

const UpdateAnswer = ({ onEditAnswers, text, onSaveQuestion, id }) => {
  const [isErrorAnswer, setIsErrorAnswer] = useState(false);
  const [isDisabledField, changeDisable] = useState(true);

  const handleEditAnswer = () => {
    changeDisable(false);
    setIsErrorAnswer(false);
  };

  const handleSave = () => {
    if (text.length < 4) {
      setIsErrorAnswer(true);

      return;
    }

    onSaveQuestion();
    changeDisable(true);
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label="Answer Text"
        value={text}
        onChange={onEditAnswers(id)}
        disabled={isDisabledField}
        error={isErrorAnswer}
        helperText={
          isErrorAnswer && "Sorry text is too short, at least 4 characters"
        }
      />
      {isDisabledField ? (
        <Tooltip title="Edit answer text">
          <IconButton edge="end" aria-label="edit" onClick={handleEditAnswer}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Save answer text">
          <IconButton edge="end" aria-label="save" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default UpdateAnswer;
