import React, { useState, useEffect, useCallback } from "react";
import { Layout } from "../layout";
import { Loading } from "./loading";
import { FlashCardNavBar } from "./flash-card-nav-bar";
import { FlashCardBody } from "./flash-card-body";

export const FlashCard = () => {
  const {
    loading,
    flashCard,
    fetchNextFlashCard,
    isCachedCardAvailable,
  } = useFetchFlashCards();

  if (loading) return <Loading />;

  return (
    <Layout
      navbar={
        <FlashCardNavBar
          onClickNextCard={fetchNextFlashCard}
          isCachedCardAvailable={isCachedCardAvailable}
        />
      }
      body={<FlashCardBody flashCard={flashCard} />}
    />
  );
};

const useFetchFlashCards = () => {
  const [flashCard, setFlashCard] = useState(null);
  const [cachedFlashCard, setCachedFlashCard] = useState(null);

  const moveToNextFlashCard = useCallback(async () => {
    if (!cachedFlashCard) return;
    setFlashCard(cachedFlashCard);
    setCachedFlashCard(null);
    fetchFlashCard().then(setCachedFlashCard);
  }, [cachedFlashCard]);

  useEffect(() => {
    Promise.all([fetchFlashCard(), fetchFlashCard()]).then(
      ([firstCard, secondCard]) => {
        setFlashCard(firstCard);
        setCachedFlashCard(secondCard);
      },
    );
  }, []);

  return {
    loading: !flashCard,
    isCachedCardAvailable: !!cachedFlashCard,
    flashCard: flashCard,
    fetchNextFlashCard: moveToNextFlashCard,
  };
};

const fetchFlashCard = async () => {
  const response = await fetch("/flash-card");
  return await response.json();
};

const fetchTwoFlashCards = () => Promise.all([]);
