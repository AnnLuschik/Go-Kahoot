import styled from 'styled-components';
import { Button as MUIButton, Typography as MUITypography } from '@material-ui/core';

export const Container = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 40px 0;
  text-align: center;
`;

export const Button = styled(MUIButton)`
  height: 54px;
  margin: 0 10px;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;
