import styled from "styled-components";
import {
  Button as MUIButton,
  Checkbox as MUICheckbox,
  TextField as MUITextField,
  Typography as MUITypography
} from "@material-ui/core";

export const Button = styled(MUIButton)`
  padding: 0 20px;
  margin-left: 20px;
  height: 55.98px;
`;

export const ButtonAnswer = styled(MUIButton)`
  display: block;
  margin: 20px auto 20px;
`;

export const Checkbox = styled(MUICheckbox)``;

export const ContainerAnswer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 10px auto;
`;

export const ContainerMarkDown = styled.div`
  width: 700px;
`;

export const ContainerMarkDownAnswers = styled.div`
  width: 500px;
`;

export const ContainerAnswers = styled.div`
  margin-bottom: 60px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Typography = styled(MUITypography)`
  margin: 15px 0;
  text-align: center;
  font-family: "Libre Baskerville", serif;
`;
