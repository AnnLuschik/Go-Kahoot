import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button as MUIButton,
  Typography as MUITypography
} from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

export const Button = styled(MUIButton)`
  margin: 0 10px !important;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 15px 0;
  text-align: center;
  font-family: "Libre Baskerville", serif;
`;

export const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
  margin: 0 10px;
`;

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: "0 10px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default useStyles;
