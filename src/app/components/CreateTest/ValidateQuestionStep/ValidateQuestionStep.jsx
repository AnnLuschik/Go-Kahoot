import React from "react";
import { Prompt } from "react-router";
import { AnimatedList } from "react-animated-list";
import { LinearProgress } from "@material-ui/core";

import { Container, Button, Typography, ContainerButton } from "./styles";
import { themeStyles } from '../../../CustomThemeProvider';

export const ValidateQuestionStep = ({ handleBack, handleNext }) => (
  <Container>
    <Prompt message="You haven’t finished creating the test, do you want to go anyway?" />
    <LinearProgress variant="determinate" value={100} />
    <AnimatedList animation={"grow"}>
      <Typography variant="h4" gutterBottom color={themeStyles.textPrimary}>
        You want to create new question for this test?
      </Typography>
      <ContainerButton>
        <Button color={themeStyles.primary} variant="contained" onClick={handleBack}>
          Yes
        </Button>
        <Button color={themeStyles.secondary} variant="contained" onClick={handleNext}>
          No
        </Button>
      </ContainerButton>
    </AnimatedList>
  </Container>
);
