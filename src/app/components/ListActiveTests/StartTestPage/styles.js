import styled from "styled-components";
import {
  Button as MUIButton,
  ListItem as MUIListItem,
  Typography as MUITypography
} from "@material-ui/core";

export const Container = styled.div`
  width: 90%;
  margin: auto;
`;

export const CustomTypography = styled(MUITypography)`
  display: block;
  max-width: 900px;
  margin: 15px auto;
  text-align: center;
  font-family: "Libre Baskerville", serif !important;
`;

export const Button = styled(MUIButton)`
  display: block;
  margin: 0 auto 15px;
`;

export const TextTypography = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-family: "Libre Baskerville", serif !important;
`;

export const ListItem = styled(MUIListItem)`
  border-radius: 10px;
  padding: 0 0 0 10px;
  margin-bottom: 7px;
  width: 250px;
`;

export const ContainerListItem = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;
