import styled from 'styled-components';
import {
  Button as MUIButton,
  IconButton as MUIIconButton,
  Typography as MUITypography,
  ListItemText as MUIListItemText,
} from '@material-ui/core';

export const Container = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 15px 0;
  text-align: center;
  font-family: 'Comfortaa', cursive;
`;

export const Button = styled(MUIButton)`
  margin: 0 10px;
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
