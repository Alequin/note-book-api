import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Loading = () => {
  const [loadingDotsCount, setLoadingDotsCount] = useState(0);

  useEffect(() => loadingDotAnimationFrames(setLoadingDotsCount), []);

  return (
    <LoadingContainer>
      <p>Loading{".".repeat(loadingDotsCount)}</p>
    </LoadingContainer>
  );
};

const loadingDotAnimationFrames = (frameCallback) => {
  let dotsCount = 0;
  const interval = setInterval(() => {
    dotsCount++;
    if (dotsCount > 3) dotsCount = 0;
    frameCallback(dotsCount);
  }, 250);

  return () => clearInterval(interval);
};

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;
