import React from "react";
import styled from "styled-components";
import { Button as MUIButton } from "@material-ui/core";
import { themeStyles } from '../../../../CustomThemeProvider';

export const AddAnswer = ({ isDisabled, onClick }) => {
	return (
		<ButtonAnswer
    type="button"
    color={themeStyles.primary}
    variant="contained"
    onClick={onClick}
    disabled={isDisabled}
  >
    Add Answer
	</ButtonAnswer>
)};

const ButtonAnswer = styled(MUIButton)`
  display: block;
  margin: 20px auto 20px;
`;
