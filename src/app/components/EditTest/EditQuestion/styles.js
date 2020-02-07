import styled from "styled-components";
import { Checkbox as MUICheckbox } from "@material-ui/core";

export const Checkbox = styled(MUICheckbox)``;

export const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 0 0 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const ContainerMarkDown = styled.div`
  width: 700px;
`;

export const ContainerQuestions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
  align-items: center;
  margin: 5px 50px 5px 0;
`;

export const ContainerAnswers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 15px;
  width: 85%;
`;
