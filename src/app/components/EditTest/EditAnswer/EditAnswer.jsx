import React, { useState } from "react";
import toast from "toastr";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";

import { MarkDown } from "../../MarkDown";

export const EditAnswer = ({ onEditAnswers, text, onSaveQuestion, id }) => {
  const [isDisabledField, changeDisable] = useState(true);

  const handleEditAnswer = () => {
    changeDisable(false);
  };

  const handleSave = () => {
    if (text.length < 4) {
      toast.warning("Sorry text is too short, at least 4 characters");

      return;
    }

    onSaveQuestion();
    changeDisable(true);
  };

  return (
    <>
      <div style={{ width: 500 }}>
        <MarkDown
          text={text}
          handleChange={onEditAnswers(id)}
          height={60}
          commandNumber={1}
          readOnly={isDisabledField}
        />
      </div>
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
    </>
  );
};
