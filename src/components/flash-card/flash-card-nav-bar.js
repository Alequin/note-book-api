import React from "react";
import styled from "styled-components";

export const FlashCardNavBar = ({ onClickNextCard, isCachedCardAvailable }) => {
  return (
    <FlexBox>
      <Button disabled={!isCachedCardAvailable} onClick={onClickNextCard}>
        {isCachedCardAvailable
          ? "Next Flash Card"
          : "...preparing next flash card"}
      </Button>
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
