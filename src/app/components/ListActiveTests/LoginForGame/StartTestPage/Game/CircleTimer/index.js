import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Timer, Text, Value } from './styles';

const renderTime = value => {
  if (value === 0) {
    return <Timer>Too late...</Timer>;
  }

  return (
    <Timer>
      <Text>Remaining</Text>
      <Value>{value}</Value>
      <Text>seconds</Text>
    </Timer>
  );
};

const CircleTimer = ({ time }) => (
  <CountdownCircleTimer
    isPlaying
    durationSeconds={time}
    size={140}
    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
    renderTime={renderTime}
    onComplete={() => [true, 0]}
  />
);

export default CircleTimer;