import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  link: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    borderRadius: "5px",
    background: "lightgray"
  },
  image: {
    margin: "10px auto",
    width: "60%"
  },
  summary: {
    background: theme.palette.background,
  }
}));

export default useStyles;
