import React from "react";
import styled from "styled-components";

export const Question = ({ question }) => {
  return (
    <>
      <MainHeader>Question</MainHeader>
      <div dangerouslySetInnerHTML={{ __html: question }}></div>
    </>
  );
};

const MainHeader = styled.h1`
  margin-top: 0;
  font-size: 1.5rem;
`;
