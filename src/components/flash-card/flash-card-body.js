import React from "react";
import styled from "styled-components";
import { Question } from "./question";
import { Answer } from "./answer";

export const FlashCardBody = ({ flashCard }) => {
  return (
    <Container>
      <Card>
        <Question question={flashCard.question_html} />
        <hr />
        <Answer answer={flashCard.answer_html} />
      </Card>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  min-height: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

const Card = styled.section`
  padding: 20px;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  box-shadow: 3px 3px 5px 6px #ccc;
  img {
    max-width: 100%;
  }
`;

const MainHeader = styled.h1`
  margin-top: 0;
  font-size: 1.5rem;
`;
