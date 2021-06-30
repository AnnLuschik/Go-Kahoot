import styled from "styled-components";
import {
  Button as MUIButton,
  IconButton as MUIIconButton,
  Typography as MUITypography,
  ListItemText as MUIListItemText
} from "@material-ui/core";

export const Container = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 15px 0 30px;
  text-align: center;
  font-family: "Libre Baskerville", serif;
`;

export const Button = styled(MUIButton)`
  margin: 0 10px !important;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonIcon = styled(MUIIconButton)`
  margin-right: 13px;
`;

export const ListItemText = styled(MUIListItemText)`
  padding-right: 120px;
`;

export const SearchForm = styled.form`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  margin-bottom: 30px;
  padding: 0;
  box-sizing: border-box;
`;

export const StyledInput = styled.input`
  width: 70%;
  margin-right: 10px;
  padding: 10px;
  font-family: "Libre Baskerville", serif;
  font-size: 14px;
  border: 1px solid #000000;
  border-radius: 5px;
`;

export const SearchButton = styled.button`
  margin: 0;
  padding: 5px 10px;
  box-sizing: border-box;
  font-family: "Libre Baskerville", serif;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #000000;
  border-radius: 5px;
`;
