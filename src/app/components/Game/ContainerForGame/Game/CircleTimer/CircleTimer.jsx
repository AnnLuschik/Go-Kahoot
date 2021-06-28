import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import { Container } from "./styles";
import "react-circular-progressbar/dist/styles.css";

export const CircleTimer = ({ startTimeSec, currentTimeSec }) => {
  const percentLoading = startTimeSec / currentTimeSec;

  return (
    <Container>
      <Skeleton animation="pulse" variant="circle" width="100%" height="100%">
        <CircularProgressbar
          value={(currentTimeSec * 100) / startTimeSec}
          text={`${currentTimeSec}s`}
          styles={buildStyles({
            textColor: percentLoading > 3 && "red",
            pathColor: percentLoading > 3 && "red"
          })}
        />
      </Skeleton>
    </Container>
  );
};
