import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const ImageAdd = ({ editorState, onChange, modifier }) => {
  const [url, setUrl] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [preventNextClose, setPreventNextClose] = useState(false);

  const onPopoverClick = useCallback(() => {
      setPreventNextClose(true);
  }, []);
  
  const openPopover = useCallback(() => {
    if (!isOpened) {
      setPreventNextClose(true);
      setIsOpened(true);
    }
  }, [isOpened]);
  
  const closePopover = useCallback(() => {
    if (!preventNextClose && isOpened) {
      setIsOpened(false);
    }
    setPreventNextClose(false);
  }, [isOpened, preventNextClose]);
  
  const addImage = useCallback(() => {
    onChange(modifier(editorState, url));
  }, [editorState, url, modifier, onChange]);
  
  const changeUrl = useCallback((e) => setUrl(e.target.value), []);

  useEffect(() => {
    document.addEventListener('click', closePopover);

    return () => document.removeEventListener('click', closePopover);
  }, [closePopover]);
  
  return (
    <Wrapper>
      <AddImageButton
        onMouseUp={openPopover}
        type="button"
        open={isOpened}
      >
        +
      </AddImageButton>
      <Popover onClick={onPopoverClick} open={isOpened}>
        <StyledInput
          type="text"
          placeholder="Paste the image url …"
          onChange={changeUrl}
          value={url}
        />
        <ConfirmButton
          type="button"
          onClick={addImage}
        >
          Add
        </ConfirmButton>
      </Popover>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-block;
  background: #FFF;
`;

const Popover = styled.div`
  position: absolute;
  display: ${(props) => props.open ? 'block' : 'none'};
  width: 300px;
  height: 54px;
  padding: 10px;
  margin-top: 10px;
  background: #FFF;
  border-radius: 2px;
  box-shadow: 0px 4px 30px 0px rgba(220,220,220,1);
  z-index: 1000;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 4px;
  width: 78%;
  border-radius: 2px;
  margin-bottom: 1em;
  box-shadow: inset 0px 1px 8px -3px #ABABAB;
  background: #fefefe;
`;

const AddImageButton = styled.button`
  width: 2.5em;
  height: 1.5em;
  padding: 0;
  margin: 0;
  font-size: 1.5em;
  color: #888888;
  line-height: 1.2em;
  box-sizing: border-box;
  background: ${(props) => props.open ? '#ededed' : '#ffffff'};
  border: 1px solid #ddd;
  border-radius: 1.5em;
  cursor: pointer;
  &:hover {
    background: #f3f3f3;
  }

  &:focus {
    outline: 0;
  }

  &:active {
    background: #e6e6e6;
  }
`;

const ConfirmButton = styled.button`
  width: 18%;
  height: 2.1em;
  padding: 0;
  margin: 0;
  margin-left: 4%;
  font-size: 1em;
  color: #888;
  line-height: 2.1em;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 2.1em;
  cursor: pointer;
  &:hover {
    background: #f3f3f3;
  }

  &:focus {
    outline: 0;
  }

  &:active {
    background: #e6e6e6;
  } 
`;

export default ImageAdd;
