import React, {useState} from 'react';
import { CreateQuestion } from '../../CreateQuestion';
import { LinearProgress } from "@material-ui/core";
import styled from "styled-components";

export const QuestionStep = ({ UUID, handleNext }) => {
  const [loading, setLoading] = useState(false);

  return (
  <Container>
    <LinearProgress
      variant={loading ? "indeterminate" : "determinate"}
      value={100}
    />
    <CreateQuestion 
      testUUID={UUID} 
      buttonHandler={handleNext}
      onLoad={(v) => setLoading(v)}
      buttonText="Next" 
    />
  </Container>
)};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;