import styled from 'styled-components';
import {
  Button as MUIButton,
  TextField as MUITextField,
  Typography as MUITypography,
} from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled(MUIButton)`
  padding: 0 20px;
  margin-left: 20px;
`;

export const TextField = styled(MUITextField)`
  width: 600px;
`;

export const Typography = styled(MUITypography)`
  margin: 15px 0;
  text-align: center;
  font-family: 'Comfortaa', cursive;
`;
