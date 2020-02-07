import styled from "styled-components";

export const ShadowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ readonly }) => (readonly ? "100%;" : "0;")}
  z-index: 10000;
  background: rgba(194, 194, 194, 0.3);
`;

export const Container = styled.div`
  position: relative;
`;
