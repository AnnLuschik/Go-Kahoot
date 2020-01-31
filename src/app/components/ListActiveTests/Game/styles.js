import styled from 'styled-components';
import {
  Button as MUIButton,
  Typography as MUITypography,
} from '@material-ui/core';

export const CustomTypography = styled(MUITypography)`
  margin: 45px 0;
  font-weight: bold;
  padding: 40px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 0px 5px 0px rgba(128,128,128,.5);
  font-family: 'Comfortaa', cursive !important;
`;

export const Button = styled(MUIButton)`
  display: block;
  margin: 0 auto 20px;
`;

export const ButtonAnswer = styled(MUIButton)`
  font-size: 20px;
  margin-bottom: 10px;
  width: 49%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 1px rgba(128,128,128,.3);
  text-transform: none;
  border: 1px solid #c2c2c2;
  justify-content: flex-start;
  font-family: 'Comfortaa', cursive !important;

  &:hover {
    background: #d1d1d1;
  }

  ${({ isred, isgreen }) =>
    isgreen && 'background: #f2ffeb;'
    || isred && 'background: #fff0eb;'
    || 'background: #f0f0f0;'
  }
`;

export const ContainerAnswers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0;
`;

export const ContainerTimer = styled.div`
  position: absolute;
  margin: 10px 10px 10px 30px;
`;

export const WrapperComponent = styled.div`
  max-width: 1200px;
  margin: 0 50px 0 160px;
  padding: 0 10px;
  width: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  min-height: 80vh;
`;
