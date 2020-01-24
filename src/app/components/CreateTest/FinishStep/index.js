import React from 'react';
import { LinearProgress } from "@material-ui/core";

import {
  Container, Button, Typography, ContainerButton,
} from './styles';
import { Link } from "../../Home/styles";

const FinishStep = ({ handleReset }) => (
  <Container>
    <LinearProgress variant="determinate" />
    <Typography  variant="h4" gutterBottom>
      Congratulations, your test has been successfully created!
    </Typography>
    <ContainerButton>
      <Button
        color="primary"
        variant="contained"
        onClick={handleReset}
      >
        Create New Test
      </Button>
      <Link to='/tests' >
        <Button
          color="primary"
          variant="contained"
        >
          Show All Tests
        </Button>
      </Link>
    </ContainerButton>
  </Container>
);

export default FinishStep;