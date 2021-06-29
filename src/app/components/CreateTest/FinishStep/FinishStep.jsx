import React from "react";
import { AnimatedList } from "react-animated-list";
import { LinearProgress } from "@material-ui/core";

import { Link } from "../../Home/styles";
import { Container, Button, Typography, ContainerButton } from "./styles";

export const FinishStep = ({ handleReset }) => (
  <Container>
    <LinearProgress variant="determinate" value={100} />
    <AnimatedList animation={"grow"}>
      <Typography variant="h4" gutterBottom>
        Congratulations, your test has been successfully created!
      </Typography>
      <ContainerButton>
        <Button color="primary" variant="contained" onClick={handleReset}>
          Create New Test
        </Button>
        <Link to="/tests">
          <Button color="primary" variant="contained">
            Show All Tests
          </Button>
        </Link>
      </ContainerButton>
    </AnimatedList>
  </Container>
);
