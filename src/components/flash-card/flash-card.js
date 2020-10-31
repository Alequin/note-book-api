import React, { useState, useEffect, useCallback } from "react";
import { Layout } from "../layout";
import { FlashCardNavBar } from "./flash-card-nav-bar";
import { FlashCardBody } from "./flash-card-body";

export const FlashCard = () => {
  const { loading, flashCard, fetchNextFlashCard } = useFetchFlashCards();

  if (loading) return <div>Loading!</div>;

  return (
    <Layout
      navbar={<FlashCardNavBar onClickNextCard={fetchNextFlashCard} />}
      body={<FlashCardBody flashCard={flashCard} />}
    />
  );
};

const useFetchFlashCards = () => {
  const [flashCard, setFlashCard] = useState(null);

  const fetchNextFlashCard = useCallback(async () => {
    const response = await fetch("/flash-card");
    const flashCard = await response.json();
    setFlashCard(flashCard);
  }, []);

  useEffect(() => {
    fetchNextFlashCard();
  }, []);

  return { loading: !flashCard, flashCard: flashCard, fetchNextFlashCard };
};
