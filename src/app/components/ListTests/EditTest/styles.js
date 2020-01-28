import styled from 'styled-components';
import {
  Button as MUIButton,
  TextField as MUITextField,
  Typography as MUITypography,
} from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin: 10px auto;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 25px 0;
  text-align: center;
`;

export const Button = styled(MUIButton)`
  height: 54px;
  margin: 0 10px;
`;

export const TestTextField = styled(MUITextField)`
  width: 90%;
  min-width: 300px;
  margin-right: 20px;
`;

export const ContainerQuestions = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 10px auto;
`;
