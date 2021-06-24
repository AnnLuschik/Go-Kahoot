import React, { useCallback } from "react";
import styled from 'styled-components';

import HeadlinesPicker from "./HeadlinesPicker";

const HeadlinesButton = ({ onOverrideContent }) => {
  // A button can call `onOverrideContent` to replace the content
  // of the toolbar. This can be useful for displaying sub
  // menus or requesting additional information from the user.
  const onClick = useCallback(() => {
    onOverrideContent(HeadlinesPicker);
  }, [onOverrideContent]);

  return (
    <Wrapper>
      <StyledButton onClick={onClick}>
        H
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
`;

const StyledButton = styled.button`
  background: #fbfbfb;
  color: #888;
  font-size: 1.2rem;
  border: 0;
  vertical-align: bottom;
  height: 34px;
  width: 36px;
  
  &:hover, 
  &:focus {
    background: #f3f3f3;
  }
`;

export default HeadlinesButton;