import styled from "styled-components";
import {
  Button as MUIButton,
  Typography as MUITypography
} from "@material-ui/core";

export const Button = styled(MUIButton)`
  padding: 0 20px;
  margin-left: 20px;
  height: 55.98px;
`;

export const ContainerMarkDown = styled.div`
  width: 700px;
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

export const ContainerAnswers = styled.div`
  margin-bottom: 60px;
`;
