import React, { useCallback } from "react";
import styled from "styled-components";

import { IconButton, Tooltip, Checkbox as MUICheckbox } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { themeStyles } from '../../../../CustomThemeProvider';

import { MarkDown } from "../../../MarkDown";

export const Answer = ({
  id,
  sequential,
  text, 
  changeAnswer,
  changeCheckbox,
  deleteAnswer,
  isChecked
}) => {
  const handleChangeAnswer = useCallback((e) => {
    changeAnswer(e);
  }, [changeAnswer]);

  const handleChangeCheckbox = useCallback(() => {
    changeCheckbox(sequential);
  }, [changeCheckbox, sequential]);

  const handleDeleteAnswer = useCallback(() => {
    deleteAnswer(id);
  }, [deleteAnswer, id]);

  return (
    <Container>
      <ContainerMarkDownAnswers>
        <MarkDown
          text={text}
          handleChange={handleChangeAnswer}
          height={60}
          commandNumber={1}
        />
      </ContainerMarkDownAnswers>
      <Tooltip title="Choose the correct answer">
        <Checkbox
          color={themeStyles.primary}
          inputProps={{ "aria-label": "secondary checkbox" }}
          checked={isChecked}
          onChange={handleChangeCheckbox}
        />
      </Tooltip>
      <Tooltip title="Delete answer">
        <IconButton
          aria-label="delete"
          onClick={handleDeleteAnswer}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 10px auto;
`;

export const ContainerMarkDownAnswers = styled.div`
  width: 500px;
`;

export const Checkbox = styled(MUICheckbox)``;  