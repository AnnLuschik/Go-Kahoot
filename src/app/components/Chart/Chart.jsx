import React from "react";
import { Bar } from "react-chartjs-2";

import { Typography } from '@material-ui/core'

import {
  OPTIONS,
  BACKGROUND_COLORS,
  BORDER_COLORS,
  HOVER_BACKGROUND_COLORS
} from "./constants";

const changeData = data => ({
  labels: data && data.map(({ name }) => name),
  datasets: [
    {
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
      hoverBackgroundColor: HOVER_BACKGROUND_COLORS,
      data: data && data.map(({ rightAnswers }) => rightAnswers),
      fill: true
    }
  ]
});

export const Chart = ({ data }) => {
  return (
    <div style={{ width: 300, height: 200 }}>
      <Typography variant="h5" color="textPrimary" style={{marginBottom: '20px'}}>
        Answer Table
      </Typography>
      <Bar data={changeData(data)} width={100} height={50} options={OPTIONS} />
    </div>
  );
};
