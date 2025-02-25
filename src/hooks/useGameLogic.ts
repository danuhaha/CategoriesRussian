'use client';

import { useCallback, useEffect, useState } from 'react';
import logger from 'loglevel';

import { type Category, GameStatus, SubmitResult, type Word } from 'types';
import { isSameGuess, shuffleArray } from 'utils/utils';
import { fetchGameInfo } from 'utils/fetchGameInfo';
import { getOrCleanGameLocalSavedState, saveGameStateToLocalStorage } from 'utils/localStorage';

const flatCategoriesToWords = (categories: Category[]): Word[] =>
  categories
    .map((category) =>
      category.words.map((word: string) => ({
        word: word,
        level: category.level,
      })),
    )
    .flat();

export const useGameLogic = () => {
  const [status, setStatus] = useState(GameStatus.Loading);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);

  const [guessHistory, setGuessHistory] = useState<Word[][]>([]);
  const [unopenedGameWords, setUnopenedGameWords] = useState<Word[]>([]);
  const [openedCategories, setOpenedCategories] = useState<Category[]>([]);
  const [unopenedCategories, setUnopenedCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchGameInfo()
      .then((gameInfo) => {
        logger.debug('Fetched game info: ', gameInfo);

        // get saved state for current date
        const localSavedState = getOrCleanGameLocalSavedState(gameInfo);
        if (localSavedState) {
          // restore saved state, if any
          logger.debug('Restoring local saved state: ', localSavedState);

          setStatus(localSavedState.status);
          setMistakesRemaining(localSavedState.mistakesRemaining);
          setOpenedCategories(localSavedState.openedCategories);
          setUnopenedCategories(localSavedState.unopenedCategories);

          const unopenedWords = shuffleArray(flatCategoriesToWords(localSavedState.unopenedCategories));
          setUnopenedGameWords(unopenedWords);
          setGuessHistory(localSavedState.guessHistory);
        } else {
          // starting new game
          const unopenedWords = shuffleArray(flatCategoriesToWords(gameInfo.categories));
          setUnopenedGameWords(unopenedWords);
          setUnopenedCategories(gameInfo.categories);
          setStatus(GameStatus.Default);
        }
      })
      .catch(() => {
        setStatus(GameStatus.Error);
      });
  }, []);

  const openCategory = useCallback((category: Category) => {
    setUnopenedCategories((prevState) => prevState.filter((item) => item.level !== category.level));
    setUnopenedGameWords((prevState) => prevState.filter(({ level }) => level !== category.level));
    setOpenedCategories((prevState) => [...prevState, category]);
  }, []);

  const checkSubmit = useCallback(
    (selectedWords: Word[]): SubmitResult => {
      if (selectedWords.length !== 4) {
        throw new Error('Selected words must be 4.');
      }

      if (isSameGuess(guessHistory, selectedWords)) return SubmitResult.Same;

      setGuessHistory((prevGuessHistory) => [...prevGuessHistory, selectedWords]);

      const categoriesParsed = unopenedCategories.map((category) => {
        const commonWordsCount = category.words.filter((word: string) =>
          selectedWords.some(({ word: selectedWord }) => word.toLowerCase() === selectedWord.toLowerCase()),
        ).length;

        return {
          category,
          commonWordsCount,
        };
      });

      const maxLikeness = Math.max(...categoriesParsed.map(({ commonWordsCount }) => commonWordsCount));
      const maxLikenessCategory = categoriesParsed.find(({ commonWordsCount }) => commonWordsCount === maxLikeness);

      // correct move
      if (maxLikeness === 4 && maxLikenessCategory) {
        openCategory(maxLikenessCategory.category);

        // check if user won
        if (unopenedCategories.length === 1) {
          setStatus(GameStatus.Won);
          return SubmitResult.Win;
        }
        return SubmitResult.Correct;
      }

      // incorrect move
      setMistakesRemaining((prevMistakesRemain) => prevMistakesRemain - 1);
      // check if user lost
      if (mistakesRemaining === 1) {
        setStatus(GameStatus.Lost);
        return SubmitResult.Loss;
      }

      if (maxLikeness === 3) {
        return SubmitResult.OneAway;
      }

      return SubmitResult.Incorrect;
    },
    [guessHistory, mistakesRemaining, openCategory, unopenedCategories],
  );

  const shuffleUnopenedWords = useCallback(() => {
    setUnopenedGameWords(shuffleArray(unopenedGameWords));
  }, [unopenedGameWords]);

  useEffect(() => {
    if (status === GameStatus.Loading || status === GameStatus.Error) return;

    saveGameStateToLocalStorage({
      status,
      mistakesRemaining,
      openedCategories,
      unopenedCategories,
      guessHistory,
    });
  }, [status, mistakesRemaining, openedCategories, unopenedCategories, guessHistory]);

  return {
    status,
    unopenedGameWords,
    openedCategories,
    unopenedCategories,
    mistakesRemaining,
    guessHistory,
    checkSubmit,
    shuffleUnopenedWords,
  };
};
