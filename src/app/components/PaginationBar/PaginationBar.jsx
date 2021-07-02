import React from 'react';
import styled from 'styled-components';

const PageButton = ({ onClick, number, isActive }) => (
  <StyledButton onClick={onClick} isActive={isActive}>{number}</StyledButton>
);

export const PaginationBar = ({ total, buttons, activePage, onClick }) => (
  <Container>
    <FooterText>Total: {total}</FooterText>
    { buttons.length
      ?  (<PagesContainer>
            {
              buttons.map(page => 
                <PageButton 
                  key={page} 
                  number={page} 
                  isActive={page === activePage}
                  onClick={() => onClick(page)} 
                />
              )}
          </PagesContainer>)
      : null
    }
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  font-family: "Libre Baskerville", serif;
  background: #b6b5b3;
`;

const FooterText = styled.p`
  margin: 0;
  font-family: inherit;
  font-weight: 600;
  font-size: 18px;
  &:first-child:not(:only-child) {
    margin-right: 15px;
  }
`;

const PagesContainer = styled.div`
  display: flex;
  padding: 0 5px;
  justify-content: flex-start;
  font-family: inherit;
`;

const StyledButton = styled.button`
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  background: ${(props) => props.isActive ? '#FFFFFF' : '#E5E5E5'};
  border: 1px solid #000000;
  border-radius: 5px;
  &:not(:last-of-type) {
    margin-right: 5px;
  }
`;
