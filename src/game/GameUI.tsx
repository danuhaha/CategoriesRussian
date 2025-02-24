'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useAnimation from 'hooks/useAnimation';
import { delay, getPerfection, isSameGuess } from 'utils/utils';
import ControlButton from 'components/button/control-button';
import Grid from 'components/game/grid';
import GameLostModal from 'contents/GameLostModal';
import GameWonModal from 'contents/GameWonModal';
import { useGameLogic } from 'hooks/useGameLogic';
import { type Category, GameStatus, SubmitResult, type Word } from 'types';
import { ANIMATION_WAIT_CATEGORY_OPEN } from 'config';

interface GameProps {
  readonly showPopupAction: (message: string) => void;
  readonly showModalAction: (content: React.ReactNode) => void;
}

export const GameUI = ({ showModalAction, showPopupAction }: GameProps) => {
  const { status, unopenedGameWords, openedCategories, unopenedCategories, mistakesRemaining, checkSubmit, shuffleUnopenedWords, guessHistory } =
    useGameLogic();
  const { guessAnimationState, wrongGuessAnimationState, animateGuess, animateWrongGuess } = useAnimation();

  const [submitted, setSubmitted] = useState(false);
  const [finishedGameAnimationPlaying, setFinishedGameAnimationPlaying] = useState(false);

  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [disclosedCategories, setDisclosedCategories] = useState<Category[]>([]);

  const isGameEnded = status === GameStatus.Lost || status === GameStatus.Won;

  const shownCategories = useMemo(() => {
    if (!finishedGameAnimationPlaying && isGameEnded) {
      return [...openedCategories, ...unopenedCategories];
    }
    return [...openedCategories, ...disclosedCategories];
  }, [disclosedCategories, isGameEnded, finishedGameAnimationPlaying, openedCategories, unopenedCategories]);

  const shownWords = useMemo(() => {
    return unopenedGameWords.filter(({ word }) => !shownCategories.some((category) => category.words.includes(word)));
  }, [unopenedGameWords, shownCategories]);

  const onCellClick = useCallback((word: Word) => {
    setSelectedWords((prevSelectedWords) => {
      if (prevSelectedWords.includes(word)) {
        return prevSelectedWords.filter((item) => item !== word);
      }
      if (prevSelectedWords.length < 4) {
        return [...prevSelectedWords, word];
      }
      return prevSelectedWords;
    });
  }, []);

  const handleLoss = useCallback(async () => {
    setSelectedWords([]);

    for (const category of unopenedCategories) {
      await delay(ANIMATION_WAIT_CATEGORY_OPEN);
      setDisclosedCategories((prevDisclosedCategories) => [...prevDisclosedCategories, category]);
    }

    await delay(ANIMATION_WAIT_CATEGORY_OPEN);
  }, [unopenedCategories]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);

    if (isSameGuess(guessHistory, selectedWords)) {
      showPopupAction('Уже было!');
      setSubmitted(false);
      return;
    }

    animateGuess().then(() => {
      setSubmitted(false);
      const result = checkSubmit(selectedWords);

      switch (result) {
        case SubmitResult.OneAway:
          animateWrongGuess().then(() => showPopupAction('Один лишний...'));
          break;

        case SubmitResult.Loss:
          setFinishedGameAnimationPlaying(true);
          showPopupAction('Повезет в другой раз!');
          void handleLoss().then(() => setFinishedGameAnimationPlaying(false));
          break;

        case SubmitResult.Win:
          setFinishedGameAnimationPlaying(true);
          showPopupAction(getPerfection(mistakesRemaining));
          delay(ANIMATION_WAIT_CATEGORY_OPEN).then(() => setFinishedGameAnimationPlaying(false));
          break;

        case SubmitResult.Incorrect:
          void animateWrongGuess();
          break;
      }
    });
  }, [animateGuess, animateWrongGuess, checkSubmit, guessHistory, handleLoss, mistakesRemaining, selectedWords, showPopupAction]);

  useEffect(() => {
    if (isGameEnded && !finishedGameAnimationPlaying) {
      const content =
        status === GameStatus.Lost ? (
          <GameLostModal guessHistory={guessHistory} />
        ) : (
          <GameWonModal
            guessHistory={guessHistory}
            perfection={getPerfection(mistakesRemaining)}
          />
        );

      showModalAction(content);
    }
  }, [finishedGameAnimationPlaying, guessHistory, isGameEnded, mistakesRemaining, showModalAction, status]);

  const controlButtons = useMemo(() => {
    const resultsPopupContent =
      status === GameStatus.Won ? (
        <GameWonModal
          guessHistory={guessHistory}
          perfection={getPerfection(mistakesRemaining)}
        />
      ) : (
        <GameLostModal guessHistory={guessHistory} />
      );

    if (isGameEnded) {
      return (
        <ControlButton
          text='Показать результаты'
          onClick={() => {
            showModalAction(resultsPopupContent);
          }}
        />
      );
    }

    return (
      <div className='flex gap-2 mb-12'>
        <ControlButton
          text='Перемешать'
          onClick={shuffleUnopenedWords}
          unclickable={submitted}
        />
        <ControlButton
          text='Сбросить'
          onClick={() => setSelectedWords([])}
          unclickable={selectedWords.length === 0 || submitted}
        />
        <ControlButton
          text='Проверить'
          unclickable={selectedWords.length !== 4 || submitted}
          onClick={handleSubmit}
        />
      </div>
    );
  }, [guessHistory, handleSubmit, isGameEnded, mistakesRemaining, selectedWords.length, showModalAction, shuffleUnopenedWords, status, submitted]);

  return (
    <>
      <div className='relative w-full'>
        <Grid
          status={status}
          words={shownWords}
          shownCategories={shownCategories}
          selectedWords={selectedWords}
          onCellClick={onCellClick}
          guessAnimationState={guessAnimationState}
          wrongGuessAnimationState={wrongGuessAnimationState}
        />
      </div>
      <h2 className='text-black my-4 md:my-8 mx-8'>
        Попыток осталось: {mistakesRemaining > 0 && status === GameStatus.Default ? Array(mistakesRemaining).fill('✦') : ''}
      </h2>

      {controlButtons}
    </>
  );
};
