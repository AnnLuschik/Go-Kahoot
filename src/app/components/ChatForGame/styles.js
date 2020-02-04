import styled from "styled-components";
import {
  Button as MUIButton,
  TextField as MUITextField,
  IconButton as MUIIconButton
} from "@material-ui/core";

export const IconButton = styled(MUIIconButton)`
  width: 30px;
  height: 30px;
  &.MuiIconButton-root {
    padding: 0 !important;
    margin: 0 5px !important;
  }
`;

export const WrapperScrollElements = styled.div`
  ${props => (props.isopened ? "display: block;" : "display: none;")}
`;

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  width: 400px;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0.97 !important;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
`;

export const TextField = styled(MUITextField)`
  width: 100%;
`;

export const Button = styled(MUIButton)``;

export const ContainerScroll = styled.div`
  padding: 5px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: blue;
  }
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  position: relative;
`;

export const Message = styled.div`
  background-color: ${({ isyou }) =>
    isyou ? "rgb(0, 132, 255);" : "#DADADA;"};
  position: relative;
  border-radius: ${({ isyou }) =>
    isyou ? "7px 0px 7px 7px" : "0px 7px 7px 7px"};
  margin: ${({ isyou }) => (isyou ? "5px 0px 5px auto;" : "5px auto 5px 0px;")};
  max-width: 70%;
  padding: 2px 8px 4px;
`;

export const Name = styled.div`
  color: ${({ isyou }) => (isyou ? "#D6D6D5;" : "#40403F;")};
  font-size: 14px;
  font-weight: bold;
  margin: 0px 5px 0px 0px;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const Text = styled.div`
  color: ${({ isyou }) => (isyou ? "rgb(255, 255, 255);" : "#010101;")};
  font-size: 12px;
  font-weight: 300;
  margin: 0px 5px 0px 0px;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const Time = styled.div`
  position: absolute;
  right: 14px;
  bottom: 2px;
  font-size: 9px;
  color: ${({ isyou }) => (isyou ? "rgba(255, 255, 255, 0.75);" : "#FFFFFE;")};
`;
