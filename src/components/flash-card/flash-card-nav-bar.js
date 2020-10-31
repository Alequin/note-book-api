import React from "react";
import styled from "styled-components";

export const FlashCardNavBar = ({ onClickNextCard }) => {
  return (
    <FlexBox>
      <Button onClick={onClickNextCard}>Next Flash Card</Button>
    </FlexBox>
  );
};

const FlexBox = styled.section`
  height: 100%;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  justify-content: space-around;
`;

const Button = styled.button`
  flex: 1;
  font-weight: bold;
  border: 1px solid black;
  display: block;
  background: none;
`;
