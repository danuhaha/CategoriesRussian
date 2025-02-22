'use client';

import { useCallback, useState, useEffect } from 'react';
import ControlButton from './_components/button/control-button';
import Grid from './_components/game/grid';
import GameLostModal from './_components/modal/game-lost-modal';
import GameWonModal from './_components/modal/game-won-modal';
import GameRulesModal from './_components/modal/game-rules-modal';
import Popup from './_components/popup';
import useAnimation from './_hooks/use-animation';
import useGameLogic, { GAME_STATE_STORAGE_ID } from './_hooks/use-game-logic';
import usePopup from './_hooks/use-popup';
import { SubmitResult, Word } from './_types';
import { getPerfection } from './_utils';

export default function Home() {
  const [popupState, showPopup] = usePopup();
  const {
    gameWords,
    selectedWords,
    clearedCategories,
    mistakesRemaining,
    isWon,
    isLost,
    guessHistoryRef,
    selectWord,
    shuffleWords,
    deselectAllWords,
    getSubmitResult,
    handleWin,
    handleLoss,
    setIsWon,
    setIsLost,
    setMistakesRemaining,
    setClearedCategories,
  } = useGameLogic();

  const [showGameWonModal, setShowGameWonModal] = useState(false);
  const [showGameLostModal, setShowGameLostModal] = useState(false);
  const [showGameRulesModal, setShowGameRulesModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    guessAnimationState,
    wrongGuessAnimationState,
    animateGuess,
    animateWrongGuess,
  } = useAnimation();

  useEffect(() => {
    console.log('Component mounted, checking local storages...');
    const savedState = localStorage?.getItem(GAME_STATE_STORAGE_ID);
    if (savedState) {
      try {
        const { isWon, isLost, mistakesRemaining, clearedCategories, guessHistory } = JSON.parse(savedState);
        console.log('Restoring game state from local storage:', { isWon, isLost, mistakesRemaining, clearedCategories, guessHistory });
        setIsWon(isWon);
        setIsLost(isLost);
        setMistakesRemaining(mistakesRemaining);
        setClearedCategories(clearedCategories);
        if (guessHistory) {
          guessHistoryRef.current = guessHistory;
        }
      } catch (error) {
        console.error('Failed to parse game state from local storage:', error);
      }
    }

    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const timeToMidnight = midnight.getTime() - now.getTime();
    console.log("Time to midnight:", timeToMidnight);

    const timer = setTimeout(() => {
      console.log('Deleting local storages at midnight...');
      localStorage?.removeItem(GAME_STATE_STORAGE_ID);
    }, timeToMidnight);

    return () => {
      console.log("Clearing timeout...");
      clearTimeout(timer);
    };
  }, [guessHistoryRef, setClearedCategories, setIsLost, setIsWon, setMistakesRemaining]);

  useEffect(() => {
    const gameState = {
      isWon,
      isLost,
      mistakesRemaining,
      clearedCategories,
      guessHistory: guessHistoryRef.current,
    };
    console.log('Saving game state to local storage:', gameState);
    localStorage?.setItem(GAME_STATE_STORAGE_ID, JSON.stringify(gameState));
  }, [clearedCategories, mistakesRemaining, isWon, isLost, guessHistoryRef]);

  const handleSubmit = async () => {
    setSubmitted(true);
    await animateGuess(selectedWords);

    const result: SubmitResult = getSubmitResult();

    switch (result.result) {
      case "same":
        showPopup("Уже было!");
        break;
      case "one-away":
        animateWrongGuess();
        showPopup("Один лишний...");
        break;
      case "loss":
        showPopup("Повезет в другой раз!");
        await handleLoss();
        setShowGameLostModal(true);
        break;
      case "win":
        showPopup(getPerfection(mistakesRemaining));
        await handleWin();
        setShowGameWonModal(true);
        break;
      case "incorrect":
        animateWrongGuess();
        break;
    }
    setSubmitted(false);
  };

  const onClickCell = useCallback(
    (word: Word) => {
      selectWord(word);
    },
    [selectWord]
  );

  const renderControlButtons = () => {
    const showResultsWonButton = (
      <ControlButton
        text="Показать результаты"
        onClick={() => {
          setShowGameWonModal(true);
        }}
      />
    );

    const showResultsLostButton = (
      <ControlButton
        text="Показать результаты"
        onClick={() => {
          setShowGameLostModal(true);
        }}
      />
    );

    const inProgressButtons = (
      <div className="flex gap-2 mb-12">
        <ControlButton
          text="Перемешать"
          onClick={shuffleWords}
          unclickable={submitted}
        />
        <ControlButton
          text="Сбросить"
          onClick={deselectAllWords}
          unclickable={selectedWords.length === 0 || submitted}
        />
        <ControlButton
          text="Проверить"
          unclickable={selectedWords.length !== 4 || submitted}
          onClick={handleSubmit}
        />
      </div>
    );

    if (isWon) {
      return showResultsWonButton;
    } else if (isLost) {
      return showResultsLostButton;
    } else {
      return inProgressButtons;
    }
  };

  return (
    <>
      <div className='flex flex-col items-center w-11/12 md:w-3/4 lg:w-7/12 mx-auto mt-14 relative'>
        <div className='flex items-center my-4 ml-4'>
          <h1 className='text-black text-4xl font-semibold'>Категории</h1>
          <button
              className="relative top-0 right-0 mt-1 ml-2 w-6 h-6 border-2 border-black rounded-full bg-transparent flex justify-center items-center"
              onClick={() => setShowGameRulesModal(true)}
          >
            <span className="text-lg font-bold text-black">?</span>
          </button>
        </div>
        <hr className="mb-4 md:mb-4 w-full" />
        <Popup show={popupState.show} message={popupState.message} />
        <h1 className="text-black mb-4">Составь 4 группы по 4 слова!</h1>
        <div className="relative w-full">
          <Grid
              words={gameWords.filter(word => !clearedCategories.some(category => category.items.includes(word.word)))}
              selectedWords={selectedWords}
              onClick={onClickCell}
              clearedCategories={clearedCategories}
              guessAnimationState={guessAnimationState}
              wrongGuessAnimationState={wrongGuessAnimationState}
          />
        </div>
        <h2 className="text-black my-4 md:my-8 mx-8">
          Попыток осталось:{" "}
          {mistakesRemaining > 0 ? Array(mistakesRemaining).fill("✦") : ""}
        </h2>
        {renderControlButtons()}
      </div>
      <GameWonModal
        isOpen={showGameWonModal}
        onClose={() => setShowGameWonModal(false)}
        guessHistory={guessHistoryRef.current}
        perfection={getPerfection(mistakesRemaining)}
      />
      <GameLostModal
        isOpen={showGameLostModal}
        onClose={() => setShowGameLostModal(false)}
        guessHistory={guessHistoryRef.current}
      />
      {showGameRulesModal && (
          <GameRulesModal
              isOpen={showGameRulesModal}
              onClose={() => setShowGameRulesModal(false)}
          />
      )}
    </>
  );
}
