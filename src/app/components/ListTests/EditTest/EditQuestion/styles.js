import styled from 'styled-components';
import { Checkbox as MUICheckbox, TextField as MUITextField } from '@material-ui/core';

export const Checkbox = styled(MUICheckbox)`
  width: 58.98px;
`;

export const TextField = styled(MUITextField)`
  width: 80%;
  min-width: 250px;
  margin-right: 20px;
`;

export const Container = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding: 15px 0 0 20px;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const ContainerQuestions = styled.div`
  margin: 10px 0 30px;
`;

export const ContainerAnswers = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px;
  width: 85%;
`;
