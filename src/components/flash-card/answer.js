import React, { useCallback, useState } from "react";
import styled from "styled-components";

export const Answer = ({ answer }) => {
  const { shouldShowAnswer, showAnswer, hideAnswer } = useDisplayAnswer(false);

  return (
    <>
      <h2>Answer</h2>
      <Container onClick={showAnswer} shouldShowAnswer={shouldShowAnswer}>
        {!shouldShowAnswer && (
          <ShowContentsText>Click to show answer</ShowContentsText>
        )}
        <Contents
          shouldShowAnswer={shouldShowAnswer}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
        {shouldShowAnswer && (
          <HideContentsButton onClick={hideAnswer}>
            Click to hide answer
          </HideContentsButton>
        )}
      </Container>
    </>
  );
};

const useDisplayAnswer = () => {
  const [shouldShowAnswer, setShouldShowAnswer] = useState(false);

  const showAnswer = useCallback(() => {
    !shouldShowAnswer && setShouldShowAnswer(true);
  }, [shouldShowAnswer]);

  const hideAnswer = useCallback(() => {
    shouldShowAnswer && setShouldShowAnswer(false);
  }, [shouldShowAnswer]);

  return { shouldShowAnswer, showAnswer, hideAnswer };
};

const Container = styled.section`
  ${({ shouldShowAnswer }) => {
    if (!shouldShowAnswer)
      return `
      opacity: 0.5;
      background: #d0d0d0;
      color: #c8c8c8;
      box-shadow: 1px 1px 20px 10px #c8c8c8;
  `;
  }}
`;

const Contents = styled.div`
  ${({ shouldShowAnswer }) => !shouldShowAnswer && `opacity: 0;`}
`;

const ShowContentsText = styled.p`
  opacity: 1;
  color: black;
  font-weight: bold;
  text-align: center;
`;

const HideContentsButton = styled.button`
  width: 100%;
`;
