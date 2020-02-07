import styled from "styled-components";
import {
  Button as MUIButton,
  TextField as MUITextField
} from "@material-ui/core";

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: auto;
`;

export const Button = styled(MUIButton)`
  display: block;
  margin: 0 auto 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 230px;
`;

export const TextField = styled(MUITextField)`
  width: 400px;
`;
