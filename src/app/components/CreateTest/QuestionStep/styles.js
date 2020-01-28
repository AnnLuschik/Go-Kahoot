import styled from 'styled-components';
import {
  Button as MUIButton,
  Checkbox as MUICheckbox,
  TextField as MUITextField,
  Typography as MUITypography,
} from '@material-ui/core';

export const Button = styled(MUIButton)`
  width: 100px;
  height: 54px;
  margin-left: 20px;
`;

export const ButtonAnswer = styled(MUIButton)`
  display: block;
  width: 160px;
  height: 54px;
  margin: 0 auto 20px;
`;

export const TextField = styled(MUITextField)`
  width: 600px;
`;

export const TextFieldAnswers = styled(MUITextField)`
  width: 300px;
`;

export const Checkbox = styled(MUICheckbox)`
  width: 58.98px;
`;

export const ContainerAnswer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: 10px auto;
`;

export const ContainerAnswers = styled.div`
  margin-bottom: 100px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Typography = styled(MUITypography)`
  margin: 40px 0;
  text-align: center;
`;
