import styled from 'styled-components';
import {
  Button as MUIButton,
} from '@material-ui/core';

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: auto;
`;

export const Button = styled(MUIButton)`
  display: block;
  margin: 0 auto 20px;
`;
