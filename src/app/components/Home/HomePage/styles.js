import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button as MUIButton,
  Typography as MUITypography,
} from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px;
`;

export const Button = styled(MUIButton)`
  width: 100px;
  height: 54px;
  margin: 0 10px;
`;

export const CustomTypography = styled(MUITypography)`
  margin: 40px 0;
  text-align: center;
`;

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default useStyles;
