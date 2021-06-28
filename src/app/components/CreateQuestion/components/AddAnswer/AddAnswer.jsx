import React from "react";
import styled from "styled-components";
import { Button as MUIButton } from "@material-ui/core";

export const AddAnswer = ({ isDisabled, onClick }) => {
	return (
		<ButtonAnswer
    type="button"
    color="primary"
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
