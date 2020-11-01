import React from "react";
import styled from "styled-components";

export const Layout = ({ body, navbar }) => (
  <Container>
    <Body>{body}</Body>
    <Navbar>{navbar}</Navbar>
  </Container>
);

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const Body = styled.section`
  flex: 9;
  overflow: auto;
`;

const Navbar = styled.section`
  flex: 1;
  border-top: 1px solid black;
`;
