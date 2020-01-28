import styled from 'styled-components';
import {
  Button as MUIButton,
  Typography as MUITypography,
} from '@material-ui/core';

export const Container = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 40px 0;
  text-align: center;
`;

export const Button = styled(MUIButton)`
  display: block;
  height: 54px;
  width: 100px;
  margin: 0 auto 20px;
`;

export const TextTypography = styled.div`
  margin-bottom: 25px;
`;
