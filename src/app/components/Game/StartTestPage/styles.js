import styled, { keyframes } from "styled-components";
import {
  Button as MUIButton,
  ListItem as MUIListItem,
  Typography as MUITypography,
  ListItemText as MUIListItemText
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

const scale = keyframes`
  form {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  } 
`;

export const ListItem = styled(MUIListItem)`
  border-radius: 10px;
  padding: 0 0 0 10px;
  margin-bottom: 7px;
  width: 250px;
  animation: ${scale} 0.3s ease-in-out;
  animation-play-state: running;
  ${({ islastadded }) => islastadded !== 0 && `animation-play-state: paused;`}
`;

export const ContainerListItem = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContainerJoiningPeople = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 15px auto;
  padding: 5px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 50%;
  border: 4px solid orange;
  color: orange;
`;
