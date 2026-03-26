"use client";

import { useState, useCallback } from "react";

interface FlashcardState<T> {
  cards: T[];
  currentIndex: number;
  isFlipped: boolean;
  isComplete: boolean;
}

export function useFlashcard<T>(cards: T[]) {
  const [state, setState] = useState<FlashcardState<T>>({
    cards,
    currentIndex: 0,
    isFlipped: false,
    isComplete: false,
  });

  const flip = useCallback(() => {
    setState((prev) => ({ ...prev, isFlipped: !prev.isFlipped }));
  }, []);

  const next = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.cards.length) {
        return { ...prev, isComplete: true, isFlipped: false };
      }
      return { ...prev, currentIndex: nextIndex, isFlipped: false };
    });
  }, []);

  const previous = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1),
      isFlipped: false,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({ cards, currentIndex: 0, isFlipped: false, isComplete: false });
  }, [cards]);

  return {
    currentCard: state.cards[state.currentIndex],
    currentIndex: state.currentIndex,
    totalCards: state.cards.length,
    isFlipped: state.isFlipped,
    isComplete: state.isComplete,
    flip,
    next,
    previous,
    reset,
  };
}
