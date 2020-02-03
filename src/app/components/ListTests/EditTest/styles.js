import styled from "styled-components";
import {
  Button as MUIButton,
  TextField as MUITextField,
  Typography as MUITypography
} from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: 5px auto;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 15px 0;
  text-align: center;
  font-family: "Libre Baskerville", serif;
`;

export const Button = styled(MUIButton)`
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
  max-width: 900px;
  width: 100%;
  margin: 5px auto;
`;
