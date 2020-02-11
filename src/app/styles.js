import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { LinearProgress as MUILinearProgress } from "@material-ui/core";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&display=swap&subset=latin-ext');
`;

export const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
`;

export const LinearProgress = styled(MUILinearProgress)`
  margin: -4px 0 0;
  padding: 0;
`;
