import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { Container } from './styles';
import "react-circular-progressbar/dist/styles.css";

const CircleTimer = ({startTimeSec, currentTimeSec}) => {
  const percentLoading = startTimeSec/currentTimeSec;

  return (
    <Container>
      <CircularProgressbar
        value={currentTimeSec * 100/startTimeSec}
        text={`${currentTimeSec}s`}
        styles={buildStyles({
          textColor: percentLoading > 3 && "red",
          pathColor: percentLoading > 3 && "red",
        })}
      />
    </Container>
  );
};

export default CircleTimer;
