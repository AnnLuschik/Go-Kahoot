import React from "react";
import { LinearProgress } from "@material-ui/core";

import { Container, Button, Typography, ContainerButton } from "./styles";

const ValidateQuestionStep = ({ handleBack, handleNext }) => (
  <Container>
    <LinearProgress variant="determinate" value={100} />
    <Typography variant="h4" gutterBottom>
      You want to create new question for this test?
    </Typography>
    <ContainerButton>
      <Button color="primary" variant="contained" onClick={handleBack}>
        Yes
      </Button>
      <Button color="secondary" variant="contained" onClick={handleNext}>
        No
      </Button>
    </ContainerButton>
  </Container>
);

export default ValidateQuestionStep;
