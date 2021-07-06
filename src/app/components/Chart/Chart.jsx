import React from "react";
import styled from 'styled-components';
import { Bar } from "react-chartjs-2";

import { Typography } from '@material-ui/core';
import { themeStyles } from '../../CustomThemeProvider';

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
    <Container>
      <StyledTypography variant="h5" color={themeStyles.textPrimary}>
        Answer Table
      </StyledTypography>
      <Bar data={changeData(data)} width={100} height={50} options={OPTIONS} />
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  height: 200px;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px;
`;
