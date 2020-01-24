import styled from 'styled-components';
import {
  Button as MUIButton, Typography as MUITypography,
} from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled(MUIButton)`
  height: 54px;
  margin: 0 10px;
`;

export const Typography = styled(MUITypography)`
  margin: 40px 0;
  text-align: center;
`;
