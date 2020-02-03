import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&display=swap&subset=latin-ext');
`;

export const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
`;
